import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleCreateOrder } from "../../services/order";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  onOrderSubmit,
  removeFromCart,
  updateCartItem,
} from "../../store/slice/cart";
import { updateUser } from "../../store/slice/user";
import Modal from "react-modal";
import isValidURL from "../../ValidateUrl";
import { handleGetDefaultSetting } from "../../services/default_setting";

export const CheckoutAll = () => {
  // From Redux
  const { userInfo, authToken } = useSelector((state) => state.user);
  const { cartItem } = useSelector((state) => state.cart);

  //--- START - Initial values for States
  const orderInitial = {
    chef_id: 1,
    chef_availability_id: 1,
    delivery_time: "", //date and Time
    // get userInfo from redux-store
    name: `${userInfo?.first_name} ${userInfo?.last_name}` || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    status: 1,
    payment_mode: 1,
    delivery_notes: "",
    sub_total: 0,
    delivery_percentage: 0,
    delivery_price: 0,
    service_fee: 0,
    discount_promo_id: 1,
    discount_price: 0,
    tip_price: 0,
    chef_earning_price: 0,
    total_price: 0,
  };
  const orderDeliveryAddressInitial = {
    address: "",
    line2: "",
    latitude: "",
    longitude: "",
    // get userInfo from redux-store
    name: `${userInfo?.first_name} ${userInfo?.last_name}` || "",
    phone: userInfo?.phone || "",
    postal_code: "",
    city: "",
    state: "",
    delivery_instruction: "",
    delivery_notes: "",
  };
  //--- END - Initial Value for State

  // --- States
  const [order, setOrder] = useState(orderInitial);
  // const [orderDetails, setOrderDetails] = useState(orderDetailInitial);
  const [orderDeliveryAddress, setOrderDeliveryAddress] = useState(
    orderDeliveryAddressInitial
  );
  // Summary price for UI
  const [orderSummaryForUser, setOrderSummaryForUser] = useState({
    chef_earning_price: 0,
    subTotal: 0,
    deliveryFee: 0,
    platformFee: 0,
    total: 0,
    shefTip: 0,
  });

  // ---- Address breakdonw in UI - streetAddress, buildingName, aptNumber, floor
  const [addressForUser, setAddressForUser] = useState({
    streetAddress: "",
    buildingName: "",
    floor: "",
    apartmentNumber: "",
  });

  // default setting
  const [defaultSetting, setDefaultSetting] = useState("");

  // to navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();

  // isFetching - is api is in pending state
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Modal for existing addresses
  // --- States end

  // Modal close request
  const onRequestClose = () => {
    setIsOpen(false);
  };
  // Select address from modal
  const onSelectExistingAddress = (address) => {
    console.log("exiting address", address);
    setOrderDeliveryAddress((prevAddress) => ({
      ...prevAddress,
      address: address?.address || "",
      line2: address?.line2 || "",
      city: address?.city || "",
      postal_code: address?.postal_code || "",
      state: address?.state || "",
    }));
    //modal close
    setIsOpen(false);
  };

  // Active Chef tip button to highligh chef-tip
  const [activeChefTip, setActiveChefTip] = useState(0);
  const handleChefTip = (tip_percent) => {
    setActiveChefTip(tip_percent);
    const chefSummaryTip =
      orderSummaryForUser.chef_earning_price * (tip_percent / 100);
    setOrderSummaryForUser((prev) => {
      return { ...prev, shefTip: chefSummaryTip };
    });
    // console.log("Tip percentage ", chefSummaryTip);

    // removed code
    //Calculate and update tip_price
    // calculateTip(percent);
  };

  //  =========================
  //    STATE UPDATER START
  //  =========================
  // Update address for user/UI - breakdown address
  const updateAddressForUser = (field) => {
    setAddressForUser((prev) => {
      return { ...prev, ...field };
    });
  };

  // State updater - Update Fields States - (Order, OrderDeliveryAddress)
  const updateOrder = (field) => {
    setOrder((prev) => {
      return { ...prev, ...field };
    });
  };
  const updateOrderDeliveryAddress = (field) => {
    setOrderDeliveryAddress((prev) => {
      return { ...prev, ...field };
    });
  };
  //  =========================
  //    STATE UPDATER END
  //  =========================

  // default setting api call
  useEffect(() => {
    const fetchDefaultSetting = async () => {
      try {
        const default_setting_response = await handleGetDefaultSetting(
          authToken
        );
        // console.log("default setting response", default_setting_response);
        setDefaultSetting(default_setting_response);
      } catch (error) {
        console.error("Error while fethcing default setting ");
      }
    };

    fetchDefaultSetting();
  }, [authToken]);

  // longitude & latitude
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          //   console.log("latitude ", latitude, " Longitude ", longitude)
          updateOrderDeliveryAddress({
            latitude: latitude,
            longitude: longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, []);

  // Set the initial delivery address from the last order address
  useEffect(() => {
    //--- Existing address after first order
    if (userInfo.last_order_address?.order_delivery_address) {
      const lastOrderAddress =
        userInfo.last_order_address.order_delivery_address;
      setOrderDeliveryAddress((prevAddress) => ({
        ...prevAddress,
        address: lastOrderAddress?.address || "",
        line2: lastOrderAddress?.line2 || "",
        city: lastOrderAddress?.city || "",
        postal_code: lastOrderAddress?.postal_code || "",
        state: lastOrderAddress?.state || "",
      }));

      // Address for UI - (street, bulding, floor, apt no )
      const addressArray = lastOrderAddress?.address
        ?.split(",")
        .map((part) => part.trim());
      setAddressForUser({
        streetAddress: addressArray[0] || "",
        buildingName: addressArray[1] || "",
        floor: addressArray[2] || "",
        apartmentNumber: addressArray[3] || "",
      });
    }

    // Fetch city from localStorage
    const city = JSON.parse(localStorage.getItem("region"));
    // Update city
    updateOrderDeliveryAddress({
      city: city?.name,
    });
    // eslint-disable-next-line
  }, []);

  // Summary of prices for User
  useEffect(() => {
    // chef earning = chef_earning * quantity
    const chef_earning_sum = cartItem.reduce((accChef, chef) => {
      const chefTotal = chef.menu.reduce((accMenu, menu) => {
        return accMenu + (menu.chef_earning_fee || 0) * menu.quantity;
      }, 0);
      return accChef + chefTotal;
    }, 0);

    // Sub total = chef-earning * quantity + platform_price * quantity
    // const sub_total = cartItem.reduce((accChef, chef) => {
    //   const chefTotal = chef.menu.reduce((accMenu, menu) => {
    //     const chef_earning_fee = menu.chef_earning_fee || 0;
    //     const platformPercentageFee = (defaultSetting.platform_charge_percentage / 100) * chef_earning_fee;
    //     const platform_price = platformPercentageFee > defaultSetting.platform_charge
    //       ? platformPercentageFee
    //       : defaultSetting.platform_charge;

    //     return (
    //       accMenu +
    //       chef_earning_fee * menu.quantity +
    //       platform_price * menu.quantity
    //     );
    //   }, 0);
    //   return accChef + chefTotal;
    // }, 0);  // NOt necessary for now

    // Delivery
    const deliverPriceSum = cartItem.reduce((accChef, chef) => {
      const chefTotal = chef.menu.reduce((accMenu, menu) => {
        const chef_earning_fee = menu.chef_earning_fee || 0;
        const deliveryPercentageFee =
          (defaultSetting.delivery_charge_percentage / 100) * chef_earning_fee;
        const delivery_price =
          deliveryPercentageFee > defaultSetting.delivery_charge
            ? deliveryPercentageFee
            : defaultSetting.delivery_charge;

        return accMenu + delivery_price * menu.quantity;
      }, 0);
      return accChef + chefTotal;
    }, 0);

    // Platform
    // *********** In case if we need it ***********
    const platformPriceSum = cartItem.reduce((accChef, chef) => {
      const chefTotal = chef.menu.reduce((accMenu, menu) => {
        const chef_earning_fee = menu.chef_earning_fee || 0;
        const platformPercentageFee =
          (defaultSetting.platform_charge_percentage / 100) * chef_earning_fee;
        const platform_price =
          platformPercentageFee > defaultSetting.platform_charge
            ? platformPercentageFee
            : defaultSetting.platform_charge;

        return accMenu + platform_price * menu.quantity;
      }, 0);
      return accChef + chefTotal;
    }, 0);

    // ---- OLDER
    // const sub_total = cartItem.reduce((accChef, chef) => {
    //   const chefTotal = chef.menu.reduce((accMenu, menu) => {
    //     return (
    //       accMenu +
    //       (menu.chef_earning_fee || 0) * menu.quantity +
    //       (menu.platform_price || 0) * menu.quantity
    //     );
    //   }, 0);
    //   return accChef + chefTotal;
    // }, 0);

    // ---- OLDER
    // const deliverPriceSum = cartItem.reduce((accChef, chef) => {
    //   const chefTotal = chef.menu.reduce((accMenu, menu) => {
    //     return accMenu + (menu.delivery_price || 0) * menu.quantity;
    //   }, 0);
    //   return accChef + chefTotal;
    // }, 0);

    // --- Older
    // const platformPriceSum = cartItem.reduce((accChef, chef) => {
    //   const chefTotal = chef.menu.reduce((accMenu, menu) => {
    //     return accMenu + (menu.platform_price || 0) * menu.quantity;
    //   }, 0);
    //   return accChef + chefTotal;
    // }, 0);

    // console.log("Summary amount is calculated for user");
    // user Summary
    setOrderSummaryForUser((prev) => ({
      ...prev,
      chef_earning_price: chef_earning_sum,
      // subTotal: sub_total,
      subTotal: chef_earning_sum, // -- changing to hold only chef earning
      deliveryFee: deliverPriceSum,
      platformFee: platformPriceSum || 0,
      total:
        chef_earning_sum +
        deliverPriceSum +
        (platformPriceSum || 0) +
        (orderSummaryForUser?.shefTip || 0),
      // total: sub_total + deliverPriceSum + (orderSummaryForUser?.shefTip || 0),
    }));
  }, [cartItem, orderSummaryForUser.shefTip, defaultSetting]);

  // increment/decrement Quantity - Update directly in redux-store
  const updateQuantityInStore = (chefIndex, menuIndex, quantity, operation) => {
    let updatedQuantity;
    if (operation === "increment") {
      updatedQuantity = quantity + 1;
    } else {
      updatedQuantity = quantity - 1 > 0 ? quantity - 1 : 1;
    }
    // console.log("Update quantity ", updatedQuantity)
    dispatch(
      updateCartItem({
        chefIndex,
        menuIndex,
        key: "quantity",
        value: updatedQuantity,
      })
    );
  };

  // Calculate and update tip_price a/c to chef_earning
  const calculateTip = (percent, chefEarningFee) => {
    // console.log("percent tip = ", percent / 100)
    const tip_amount = parseFloat(
      (chefEarningFee * (percent / 100)).toFixed(2)
    );
    // console.log("single chef tip = ", tip_amount)
    // updateOrder({ tip_price: tip_amount });
    return tip_amount;
  };

  // create order for chef
  const createOrderForChef = async (chef) => {
    let sub_total = 0;
    let deliverPriceSum = 0;
    let platformPriceSum = 0;
    let chefEarningSum = 0;

    chef.menu.forEach((menu) => {
      const chef_earning_fee = menu.chef_earning_fee || 0;
      const quantity = menu.quantity || 0;
      // const delivery_price = menu.delivery_price || 0;
      // const platform_price = menu.platform_price || 0;
      // --- Updated
      // ---- Delivery Price
      const deliveryPercentageFee =
        (defaultSetting.delivery_charge_percentage / 100) * chef_earning_fee;

      const delivery_price =
        deliveryPercentageFee > defaultSetting.delivery_charge
          ? deliveryPercentageFee
          : defaultSetting.delivery_charge;

      // ---- Platform Price
      const platformPercentageFee =
        (defaultSetting.platform_charge_percentage / 100) * chef_earning_fee;

      const platform_price =
        platformPercentageFee > defaultSetting.platform_charge
          ? platformPercentageFee
          : defaultSetting.platform_charge;

      // Calculate chef_earning_fee for each item
      chefEarningSum += chef_earning_fee * quantity;
      // Calculate sub_total = chef_earning_fee * quantity;
      sub_total += chef_earning_fee * quantity;
      // Calculate DeliveryPrice
      deliverPriceSum += delivery_price * quantity;

      platformPriceSum += platform_price * quantity;
    });

    const city = JSON.parse(localStorage.getItem("region"));
    // Calculate tip & update the tip_price in Order(state)
    const tip_price = calculateTip(activeChefTip, chefEarningSum);
    console.log("checking order(state) after calculateTip ", order);
    const total = sub_total + tip_price + deliverPriceSum + platformPriceSum;

    // Payload creation for create-order api
    const orderPayload = {
      ...order,
      chef_id: chef.id,
      city_id: city.id,
      sub_total: sub_total,
      chef_earning_price: chefEarningSum,
      tip_price: tip_price,
      delivery_price: deliverPriceSum,
      delivery_percentage: (deliverPriceSum / chefEarningSum) * 100,
      service_fee: platformPriceSum,
      total_price: total,
      // updated
      orderDetails: chef.menu.map((menu) => {
        // --- Delivery Price - Default Setting
        const deliveryPercentageFee =
          (defaultSetting.delivery_charge_percentage / 100) *
          menu.chef_earning_fee;

        const delivery_price =
          deliveryPercentageFee > defaultSetting.delivery_charge
            ? deliveryPercentageFee
            : defaultSetting.delivery_charge;

        // ---- Platform Price - Default Setting
        const platformPercentageFee =
          (defaultSetting.platform_charge_percentage / 100) *
          menu.chef_earning_fee;

        const platform_price =
          platformPercentageFee > defaultSetting.platform_charge
            ? platformPercentageFee
            : defaultSetting.platform_charge;

        return {
          name: menu.name,
          user_menu_id: menu.id,
          unit_price: menu.unit_price,
          quantity: menu.quantity,
          platform_percentage:
            (platform_price / menu.chef_earning_fee) * 100 || 0,
          platform_price: platform_price, // Updated with computed platform price
          delivery_percentage:
            (delivery_price / menu.chef_earning_fee) * 100 || 0,
          delivery_price: delivery_price, // Updated with computed delivery price
          chef_price: menu.chef_earning_fee,
        };
      }),
      // orderDetails: chef.menu.map((menu) => ({
      //   name: menu.name,
      //   user_menu_id: menu.id,
      //   unit_price: menu.unit_price,
      //   quantity: menu.quantity,
      //   platform_percentage:
      //     (menu.platform_percentage
      //       ? menu.platform_percentage
      //       : (menu.platform_price / menu.chef_earning_fee) * 100) || 0,
      //   platform_price: menu.platform_price,
      //   delivery_percentage:
      //     (menu.delivery_percentage
      //       ? menu.delivery_percentage
      //       : (menu.delivery_price / menu.chef_earning_fee) * 100) || 0,
      //   delivery_price: menu.delivery_price,
      //   chef_price: menu.chef_earning_fee,
      // })),
    };

    const payload = { ...orderPayload, orderDeliveryAddress };
    // Concetanate address - (street, building, floor, apt no )
    const { streetAddress, apartmentNumber, buildingName, floor } =
      addressForUser;
    payload.orderDeliveryAddress.address = `${streetAddress}, ${buildingName}, ${floor}, ${apartmentNumber}`;
    console.log("Payload is ", payload);
    // Api Call
    try {
      const response = await handleCreateOrder(authToken, payload);
      // console.log("checkout all response ", response);
      toast.success(`Order of Chef ${chef?.first_name} is confirmed`, {
        theme: "colored",
      });
      // remove that chef from redux
      dispatch(onOrderSubmit({ chefId: chef.id }));
      // update user in redux with last_order_address
      const updatedUserInfo = {
        ...userInfo,
        last_order_address: {
          order_delivery_address: orderDeliveryAddress,
        },
      };
      localStorage.setItem("user", JSON.stringify(updatedUserInfo));
      dispatch(updateUser(updatedUserInfo));
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error(error.message || "Order creation failed", {
        theme: "colored",
      });
      throw error;
    }
  };

  // handle All Checkout in loop
  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const orderIds = await Promise.all(cartItem.map(createOrderForChef));
      console.log("order id ", orderIds);
      navigate("/", { replace: true });
      // navigate(`/orders/${orderIds.join(',')}`);
    } catch (error) {
      console.error("Failed to create orders:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="container mx-auto my-8 realtive">
        <div className="mb-3">
          <Link
            className="!text-black font-semibold flex items-center gap-2"
            to="/cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="rgba(0,0,0,1)"
            >
              <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
            </svg>
            <span>Back to Menu</span>
          </Link>
        </div>
        <div className="lg:text-start text-center">
          <h1 className="font-semibold text-3xl uppercase text-secondary tracking-widest">
            All Checkout
          </h1>
          <div className="w-[60px] h-[2px] bg-primary my-4 lg:mx-0 mx-auto"></div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="lg:col-span-7 col-span-12">
            <form onSubmit={handleCheckout}>
              <div className="border border-primary border-dashed rounded-lg p-4">
                <h2 className="font-semibold text-xl uppercase text-secondary tracking-widest">
                  Delivery information
                </h2>
                {/* Name Phone and Email */}
                <div className="grid grid-cols-2 gap-2 pb-3 mb-3 bg-slate-50 px-3 pt-5 rounded">
                  <div className=" relative">
                    <h4 className="text-sm font-semibold mb-1 bg-white absolute -top-2 left-2 px-1 z-20">
                      Name <span className="text-primary">*</span>
                    </h4>
                    <input
                      required
                      className="border rounded-md w-full"
                      name=""
                      value={order.name}
                      onChange={(e) => {
                        updateOrder({ name: e.target.value });
                        updateOrderDeliveryAddress({ name: e.target.value });
                      }}
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className=" relative">
                    <input
                      required
                      className="border rounded-md"
                      name=""
                      value={order.phone}
                      onChange={(e) => {
                        updateOrder({ phone: e.target.value });
                        updateOrderDeliveryAddress({ phone: e.target.value });
                      }}
                      placeholder="Enter Phone"
                    />
                    <h4 className="text-sm font-semibold mb- bg-white absolute -top-2 left-2 px-1 z-20">
                      Phone <span className="text-primary">*</span>
                    </h4>
                  </div>

                  <div className=" relative mt-2 col-span-2">
                    <h4 className="text-sm font-semibold mb-1 bg-white absolute -top-2 left-2 px-1 z-20">
                      Email <span className="text-primary">*</span>
                    </h4>
                    <input
                      required
                      className="border rounded-md w-full"
                      name=""
                      value={order.email}
                      onChange={(e) => {
                        updateOrder({ email: e.target.value });
                      }}
                      placeholder="Enter Email"
                    />
                  </div>
                </div>

                <div className="border-b mb-3 border-primary border-dashed"></div>
                {/* Address */}
                <div className="border- border-primary border-dashed pb- mb-4 bg-slate-50 px-3 py-4">
                  {userInfo.user_addresses &&
                    userInfo.user_addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="block ml-auto text-primary"
                      >
                        Select Existing Address
                      </button>
                    )}

                  {/* Address Fields Updated */}
                  <div className="relative">
                    <h4 className="text-sm font-semibold mb-1 bg-white absolute -top-2 left-2 px-1 z-20">
                      Building Name
                      {/* <span className="text-primary">*</span> */}
                    </h4>
                    <input
                      // required
                      className="border rounded-md w-full"
                      name=""
                      value={addressForUser.buildingName}
                      onChange={(e) =>
                        updateAddressForUser({ buildingName: e.target.value })
                      }
                      placeholder="Building Name"
                    />
                  </div>
                  {/* Apartment and floor */}
                  <div className="grid grid-cols-2 gap-2 w-full mt-4">
                    <div className="relative">
                      <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                        Apt. No
                        {/* <span className="text-primary">*</span> */}
                      </h4>
                      <input
                        // required
                        className="border rounded-md w-full"
                        name=""
                        value={addressForUser.apartmentNumber}
                        onChange={(e) =>
                          updateAddressForUser({
                            apartmentNumber: e.target.value,
                          })
                        }
                        placeholder="Apartment No"
                      />
                    </div>

                    <div className="relative">
                      <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                        Floor
                        {/* <span className="text-primary">*</span> */}
                      </h4>
                      <input
                        // required
                        className="border rounded-md w-full"
                        name=""
                        value={addressForUser.floor}
                        onChange={(e) =>
                          updateAddressForUser({
                            floor: e.target.value,
                          })
                        }
                        placeholder="Floor"
                      />
                    </div>
                  </div>

                  <div className="relative mb-1 mt-5">
                    <h4 className="text-sm font-semibold  bg-white absolute -top-2 left-2 px-1 z-20">
                      Street Address <span className="text-primary">*</span>
                    </h4>
                    <input
                      required
                      className="border rounded-md w-full"
                      name=""
                      // value={orderDeliveryAddress.address}
                      // onChange={(e) =>
                      //   updateOrderDeliveryAddress({ address: e.target.value })
                      // }
                      value={addressForUser.streetAddress}
                      onChange={(e) =>
                        updateAddressForUser({ streetAddress: e.target.value })
                      }
                      placeholder="Street Address"
                    />
                  </div>

                  <div className="relative mb-1 mt-4">
                    <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                      City <span className="text-primary">*</span>
                    </h4>
                    <input
                      required
                      className="border rounded-md w-full"
                      name=""
                      value={orderDeliveryAddress.city}
                      onChange={(e) =>
                        updateOrderDeliveryAddress({ city: e.target.value })
                      }
                      placeholder="City"
                    />
                  </div>
                  {/* ---- UNNECESSARY ----  */}
                  {/* <h4 className="text-base font-semibold mb-1 mt-3">
                    Postal Code
                  </h4>
                  <input
                    className="border rounded-md w-full "
                    name=""
                    value={orderDeliveryAddress.postal_code}
                    onChange={(e) =>
                      updateOrderDeliveryAddress({
                        postal_code: e.target.value,
                      })
                    }
                    placeholder="Postal Code"
                  /> */}
                  {/* <h4 className="text-base font-semibold mb-1 mt-3">
                    State 
                  </h4>
                  <input
                    className="border rounded-md w-full "
                    name=""
                    value={orderDeliveryAddress.state}
                    onChange={(e) =>
                      updateOrderDeliveryAddress({ state: e.target.value })
                    }
                    placeholder="State"
                  /> */}
                </div>

                 <div className="border-b border-t pt-5 pb-3 border-primary border-dashed mb-4">
                  <div className="relative">
                    <h4 className="text-sm font-semibold  bg-white absolute -top-2 left-2 px-1 z-20">
                      Delivery Instruction
                      {/* <span className="text-primary">*</span> */}
                    </h4>
                    <textarea
                      className="border pt-3 rounded-md w-full h-[100px]"
                      value={orderDeliveryAddress.delivery_instruction}
                      onChange={(e) =>
                        updateOrderDeliveryAddress({
                          delivery_instruction: e.target.value,
                        })
                      }
                      placeholder="Type Query..."
                    />

                  </div>
                </div>
                {/* <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Delivery Notes <span className="text-primary">*</span>
                  </h4>
                  <textarea
                    required
                    className="border rounded-md w-full h-[100px]"
                    value={order.delivery_notes}
                    onChange={(e) => {
                      updateOrderDeliveryAddress({
                        delivery_notes: e.target.value,
                      });
                      updateOrder({ delivery_notes: e.target.value });
                    }}
                    placeholder="Delivery Notes "
                  ></textarea>
                </div> */}
                <div className="border-b border-primary border-dashed pb-4 mb-4 relative">
                  <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                    Delivery time <span className="text-primary">*</span>
                  </h4>
                  <input
                    min={new Date().toISOString().slice(0, 16)}
                    required
                    className="border rounded-md w-full pt-3"
                    type="datetime-local"
                    name=""
                    value={order.delivery_time}
                    onChange={(e) =>
                      updateOrder({ delivery_time: e.target.value })
                    }
                    placeholder=""
                  />
                </div>
                {/* ------ Promo Code ------ */}
                {/* <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Promo code or Gift card{" "}
                  </h4>
                  <div className="relative">
                    <input
                      className="border rounded-md w-full"
                      name=""
                      value={promoCode.code}
                      onChange={(e) => setPromoCode((prev) => ({
                        ...prev, 
                        code: e.target.value
                      }))}
                      placeholder="Promo Code"
                    />
                    <button type="button" onClick={handlePromoCodeSubmit} className="text-[10px] font-semobold bg-primary px-2 py-1 text-white rounded-md absolute right-2 top-[50%] translate-y-[-50%]">
                      Submit
                    </button>
                  </div>
                </div> */}
                <div className="mt-6 border-b border-primary border-dashed pb-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl uppercase text-secondary tracking-widest">
                      Tip Shef:
                    </h2>
                    <h2 className="font-semibold text-2xl uppercase text-primary tracking-widest">
                      {/* {order.tip_price.toLocaleString("en-PK", {
                        style: "currency",
                        currency: "PKR",
                      })} */}
                      {/* Chef Tip -- for user view */}
                      {orderSummaryForUser.shefTip.toLocaleString("en-PK", {
                        style: "currency",
                        currency: "PKR",
                      })}
                    </h2>
                  </div>
                  <div className="grid lg:grid-cols-8 md:grid-cols-8 grid-cols-4 gap-3 mb-4">
                    <div
                      className={`chefDateBtn ${
                        activeChefTip === 0 ? "active" : ""
                      }`}
                      onClick={() => handleChefTip(0)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        No Tip
                      </h4>
                    </div>
                    <div
                      className={`chefDateBtn ${
                        activeChefTip === 10 ? "active" : ""
                      }`}
                      onClick={() => handleChefTip(10)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        10%
                      </h4>
                    </div>
                    <div
                      className={`chefDateBtn ${
                        activeChefTip === 15 ? "active" : ""
                      }`}
                      onClick={() => handleChefTip(15)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        15%
                      </h4>
                    </div>
                    <div
                      className={`chefDateBtn ${
                        activeChefTip === 20 ? "active" : ""
                      }`}
                      onClick={() => handleChefTip(20)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        20%
                      </h4>
                    </div>
                    <div
                      className={`chefDateBtn ${
                        activeChefTip === 25 ? "active" : ""
                      }`}
                      onClick={() => handleChefTip(25)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        25%
                      </h4>
                    </div>
                  </div>
                </div>
                {/* Recurring & terms-privacy links */}
                <div className="mt-5">
                  {/* <h2 className="font-semibold text-2xl uppercase text-secondary tracking-widest">
                    Make it a recurring order and save!
                  </h2> */}
                  {/* <div className="block w-[280px] mt-2">
                    <label className="flex items-center cursor-pointer mb-3">
                      <input
                        type="radio"
                        className="form-radio text-primary w-[15px] h-[15px]"
                        name="radioGroup"
                        value="option1"
                      />
                      <span className="ml-3 text-base font-medium">
                        Order once
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer mb-3">
                      <input
                        type="radio"
                        className="form-radio text-primary w-[15px] h-[15px]"
                        name="radioGroup"
                        value="option2"
                      />
                      <span className="ml-3 text-base font-medium">
                        Every other week{" "}
                        <span className="font-bold">--5% off</span>{" "}
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer mb-3">
                      <input
                        type="radio"
                        className="form-radio text-primary w-[15px] h-[15px]"
                        name="radioGroup"
                        value="option3"
                      />
                      <span className="ml-3 text-base font-medium">
                        Every week <span className="font-bold">--10% off</span>
                      </span>
                    </label>
                  </div> */}
                  <p>
                    By placing your order, you agree to Shef’s updated{" "}
                    <Link to="/terms-of-servies">Terms of Service</Link>,{" "}
                    <Link to="/privacy-policy">Privacy Policy</Link>, and to
                    receive order updates and marketing text messages.
                  </p>
                </div>
              </div>
              {/* Payment Details */}
              <div className="border border-primary border-dashed rounded-lg p-4 mt-5">
                <h2 className="font-semibold text-xl uppercase text-secondary tracking-widest">
                  Payment details
                </h2>
                <p>All transactions are secure and encrypted.</p>
                {/* BANK API */}
                <div className="flex items-center gap-x-4 mt-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="delivery"
                      name="paymentMethod"
                      value={order.payment_mode}
                      className="mr-2 w-4 h-4"
                      defaultChecked
                      onChange={() => updateOrder({ payment_mode: 1 })}
                    />
                    <label htmlFor="delivery" className="text-lg font-medium">
                      Cash on Delivery
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      className="mr-2 w-4 h-4"
                      disabled
                    />
                    <label
                      htmlFor="card"
                      className="text-lg font-medium text-gray-500"
                    >
                      Card (Unavailable)
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button
                  disabled={isPending || cartItem.length < 1}
                  className="bg-primary text-white text-lg w-full uppercase px-6 py-2 font-semibold rounded-lg disabled:opacity-60"
                >
                  Place All Order
                </button>
              </div>
            </form>
          </div>
          <div className="lg:col-span-5 col-span-12">
            <div className="md:p-4 p-3 bg-primaryLight rounded-lg sticky top-0">
              <h3 className="mb-6 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest">
                Your orders for delivery
              </h3>
              <div>
                {/* Order Box */}
                {cartItem.map((chef, chefIndex) => (
                  <div key={chefIndex}>
                    <div className="flex items-center gap-x-2 bg-primaryLight p-2 rounded-lg mt-2">
                      <img
                        src={
                          chef.profile_pic && isValidURL(chef.profile_pic)
                            ? chef.profile_pic
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        className="object-top rounded-full w-[30px] object-cover h-[30px]"
                        alt="ef"
                      />
                      <Link
                        to={`/shef-detail/${chef.id}`}
                        className="!underline !text-secondary text-base font-semibold"
                      >
                        {" "}
                        {`${chef.first_name} ${chef.last_name}`}
                      </Link>
                    </div>
                    {chef.menu.map((menu, menuIndex) => (
                      <div
                        key={menuIndex}
                        className="flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4"
                      >
                        <div className="flex items-center gap-x-2 w-[65%]">
                          <img
                            src={
                              menu.logo && isValidURL(menu.logo)
                                ? menu.logo
                                : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                            }
                            className="object-top rounded-lg w-[60px] object-cover h-[60px]"
                            alt="ef"
                          />

                          <div>
                            <h3 className="mb-1 text-base font-semibold leading-tight">
                              {menu.name}{" "}
                            </h3>
                            <div className="flex items-center gap-x-3">
                              <div className="flex items-center justify-between w-[55%] bg-primaryLight rounded-lg">
                                <button
                                  onClick={() =>
                                    updateQuantityInStore(
                                      chefIndex,
                                      menuIndex,
                                      menu.quantity,
                                      "decrement"
                                    )
                                  }
                                  className="w-[25%]"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mx-auto"
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                    fill="rgba(0,0,0,1)"
                                  >
                                    <path d="M5 11V13H19V11H5Z"></path>
                                  </svg>
                                </button>
                                <input
                                  value={menu.quantity}
                                  className="w-[50%] text-center border-0 bg-transparent text-xs px-1 h-[30px]"
                                  readOnly
                                  placeholder="1"
                                />
                                <button
                                  onClick={() =>
                                    updateQuantityInStore(
                                      chefIndex,
                                      menuIndex,
                                      menu.quantity,
                                      "increment"
                                    )
                                  }
                                  className="w-[25%]"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mx-auto"
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                    fill="rgba(0,0,0,1)"
                                  >
                                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                  </svg>
                                </button>
                              </div>
                              <h4 className="text-lg fontsemibold mb-0 min-w-max">
                                x{" "}
                                {menu.unit_price.toLocaleString("en-PK", {
                                  style: "currency",
                                  currency: "PKR",
                                })}
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div
                          onClick={() => {
                            dispatch(removeFromCart({ chefIndex, menuIndex }));
                            navigate("/cart", { replace: true });
                            toast.success(`${menu?.name} is removed from cart`);
                          }}
                          className="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="rgba(0,0,0,1)"
                          >
                            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="d:p-4 p-3 bg-primaryLight rounded-lg mt-6">
              <h3 className="mb-6 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest">
                Order Summary
              </h3>
              <div className="flex justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold mb-0">Subtotal</h3>
                {/* <h4 className='text-lg font-bold mb-0'>$44.97</h4> */}
                <h4 className="text-lg font-bold mb-0">
                  {orderSummaryForUser.subTotal.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                  {/* {order.sub_total.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })} */}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Delivery Fee</h3>
                {/* <h4 className='text-lg font-medium mb-0'>$2.49</h4> */}
                <h4 className="text-lg font-medium mb-0">
                  {orderSummaryForUser.deliveryFee.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                  {/* {order.delivery_price.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })} */}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Fees & Taxes</h3>
                {/* <h4 className='text-lg font-medium mb-0'>$6.86</h4> */}
                <h4 className="text-lg font-medium mb-0">
                  {orderSummaryForUser.platformFee.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                  {/* {order.service_fee.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })} */}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Shef Tip</h3>
                {/* <h4 className='text-lg font-medium mb-0'>$6.74</h4> */}
                <h4 className="text-lg font-medium mb-0">
                  {orderSummaryForUser.shefTip.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                  {/* {order.tip_price.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })} */}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1 bg-primaryLight py-2 px-3 rounded-md">
                <h3 className="text-lg font-bold mb-0">Total</h3>
                {/* <h4 className='text-lg font-bold mb-0'>$61.06</h4> */}
                <h4 className="text-lg font-bold mb-0">
                  {orderSummaryForUser.total.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                  {/* {order.total_price.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })} */}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Address"
      >
        {/* Modal content here */}
        <div className="flex items-center justify-between border-b pb-3 gap-3">
          <h2 className="text-lg font-semibold leading-tight mb-0">
            Existing Address
          </h2>
          <button onClick={onRequestClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgba(0,0,0,1)"
            >
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
            </svg>
          </button>
        </div>

        {/* Main Content */}
        {userInfo.user_addresses && userInfo.user_addresses.length > 0 && (
          <div>
            <h3 className="mb-5 text-lg text-gray my-2 font-semibold">
              Select Address
            </h3>
            <ul className="flex flex-wrap gap-2 ">
              {userInfo.user_addresses.map((address, index) => (
                <li className="min-w-[200px]" key={index}>
                  <input
                    onChange={() => onSelectExistingAddress(address)}
                    type="radio"
                    id={index}
                    name="hosting"
                    value="hosting-small"
                    className="hidden peer"
                    required
                    checked={
                      orderDeliveryAddress.address === address?.address &&
                      (orderDeliveryAddress.city && address?.city
                        ? orderDeliveryAddress.city === address.city
                        : !orderDeliveryAddress.city && !address?.city) &&
                      (orderDeliveryAddress.line2 && address?.line2
                        ? orderDeliveryAddress.line2 === address.line2
                        : !orderDeliveryAddress.line2 && !address?.line2)
                    }
                  />
                  <label
                    htmlFor={index}
                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 "
                  >
                    <div className="block">
                      <div className="w-full">
                        {`
                        ${address?.address ? address.address + ", " : ""}
                        ${address?.line2 ? address.line2 + ", " : ""}
                        ${address?.city ? address.city + ", " : ""}
                        ${
                          address?.postal_code ? address.postal_code + ", " : ""
                        }
                        ${address?.state || ""}`}
                      </div>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </>
  );
};
export default CheckoutAll;
