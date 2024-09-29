import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleCheckDiscount, handleCreateOrder } from "../../services/order";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  onOrderSubmit,
  removeFromCart,
  updateCartItem,
} from "../../store/slice/cart";
import isValidURL from "../../ValidateUrl";
import { updateUser } from "../../store/slice/user";
import Modal from "react-modal";
import { handleGetDefaultSetting } from "../../services/default_setting";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Checkout = () => {
  // User Info - redux store
  const { userInfo, authToken } = useSelector((state) => state.user);
  // Cart Item from Redux
  const { cartItem } = useSelector((state) => state.cart);

  // Chef id - from url parameter
  const { chefId, chef_index } = useParams();

  // Chef Tip
  const [activeButton, setActiveButton] = useState(null);
  const handleButtonClick = (buttonId, percent) => {
    setActiveButton(buttonId);
    //Calculate and update tip_price
    calculateTip(percent);
  };

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
  const orderDetailInitial = [
    {
      name: "", // user menu name
      user_menu_id: 1,
      unit_price: 0,
      quantity: 0,
      platform_percentage: 0,
      platform_price: 0,
      delivery_percentage: 0,
      delivery_price: 0,
      chef_price: 0,
    },
  ];
  const orderDeliveryAddressInitial = {
    home_house_no: "",
    home_street_address: "",
    home_city: "",
    home_addition_direction: "",
    office_department: "",
    office_floor: "",
    office_company: "",
    office_building_no: "",
    office_street_address: "",
    office_city: "",
    office_addition_direction: "",
    apartment_name: "",
    apartment_apartment_no: "",
    apartment_floor: "",
    apartment_street_address: "",
    apartment_city: "",
    apartment_addition_direction: "",
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
    address_type: "", // to make sure where to deliver (home | office | building)
  };
  //--- END - Initial Value for State

  // Order API - States
  const [order, setOrder] = useState(orderInitial);
  const [orderDetails, setOrderDetails] = useState(orderDetailInitial);
  const [orderDeliveryAddress, setOrderDeliveryAddress] = useState(
    orderDeliveryAddressInitial
  );
  // Order States - End

  // ---- On submit
  const [isPending, setIsPending] = useState(false);
  // ---- Promo Code
  const [promoCode, setPromoCode] = useState({
    code: "", // promo code
    order_total: 0, // Total of order,
    menus: [], // array with menu.id (i.e. user_menu_id) & menu.quantity
  });
  // Default Setting
  const [defaultSetting, setDefaultSetting] = useState("");

  //  =========================
  //    STATE UPDATER START
  //  =========================

  // Update Fields States - (Order, OrderDeliveryAddress, OrderDetail)
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
  // console.log("order address ", orderDeliveryAddress);
  //  =========================
  //    STATE UPDATER END
  //  =========================

  // Promo code - Submit
  const handlePromoCodeSubmit = async (e) => {
    try {
      // console.log("Promo code payload ", promoCode);
      const discountResponse = await handleCheckDiscount(authToken, promoCode);
      // console.log("respons of promo code ", discountResponse);
      // If no promo code is present
      if (discountResponse?.original?.error) {
        toast.error(
          discountResponse?.original?.error ||
            "Something's wrong with Promo Code"
        );
      }

      // discounted amount
      const { discounted_amount } = discountResponse.original;

      // If promo code is present  --- Set discount_price here
      if (discountResponse?.original?.success) {
        toast.success(
          `${parseFloat(discounted_amount)?.toLocaleString("en-PK", {
            style: "currency",
            currency: "PKR",
          })} ` + (discountResponse?.original?.success || "Discount is applied")
        );

        // calculate discount on total amount
        const discountedTotal = order.total_price - discounted_amount;
        // -- Update discount_price & total
        updateOrder({
          discount_price: parseFloat(discounted_amount),
          total_price: discountedTotal,
        });
      }
    } catch (error) {
      console.error("Error while getting promo code \n", error);
    }
  };

  // Calculate and update tip_price
  const calculateTip = (percent) => {
    const tip_amount = parseFloat(
      (order.chef_earning_price * (percent / 100)).toFixed(2)
    );
    updateOrder({ tip_price: tip_amount });
  };

  // Default setting api call
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

  // Use effect to set the initial delivery address from the last order address
  useEffect(() => {
    //--- Existing address after first order
    if (userInfo.last_order_address?.order_delivery_address) {
      const lastOrderAddress =
        userInfo.last_order_address.order_delivery_address;
      // console.log("exiting addresss useEffect ", lastOrderAddress);
      updateOrderDeliveryAddress({
        home_house_no: lastOrderAddress?.home_house_no || "",
        home_street_address: lastOrderAddress?.home_street_address || "",
        home_city: lastOrderAddress?.home_city || "",
        home_addition_direction:
          lastOrderAddress?.home_addition_direction || "",
        office_department: lastOrderAddress?.office_department || "",
        office_floor: lastOrderAddress?.office_floor || "",
        office_company: lastOrderAddress?.office_company || "",
        office_building_no: lastOrderAddress?.office_building_no || "",
        office_street_address: lastOrderAddress?.office_street_address || "",
        office_city: lastOrderAddress?.office_city || "",
        office_addition_direction:
          lastOrderAddress?.office_addition_direction || "",
        apartment_name: lastOrderAddress?.apartment_name || "",
        apartment_apartment_no: lastOrderAddress?.apartment_apartment_no || "",
        apartment_floor: lastOrderAddress?.apartment_floor || "",
        apartment_street_address:
          lastOrderAddress?.apartment_street_address || "",
        apartment_city: lastOrderAddress?.apartment_city || "",
        apartment_addition_direction:
          lastOrderAddress?.apartment_addition_direction || "",
      });
      // setOrderDeliveryAddress((prevAddress) => ({
      //   ...prevAddress,
      //   address: lastOrderAddress?.address || "",
      //   line2: lastOrderAddress?.line2 || "",
      //   city: lastOrderAddress?.city || "",
      //   postal_code: lastOrderAddress?.postal_code || "",
      //   state: lastOrderAddress?.state || "",
      // }));
    }

    // eslint-disable-next-line
  }, []);

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

  const dispatch = useDispatch();

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

  // Get values from Cart item and update the order & orderDetails
  useEffect(() => {
    // Initialize variables to store calculated sums
    let sub_total = 0;
    let deliverPriceSum = 0;
    let platformPriceSum = 0;
    let chefEarningSum = 0;
    // delivery date and time 
    let deliveryDateAndSlot = ""

    // Calculate the sub total, delivery price sum, and platform price sum
    cartItem.forEach((chef, chefIndex) => {
      if (chef.id === parseInt(chefId) && chefIndex === parseInt(chef_index)) {
        deliveryDateAndSlot = `${chef.delivery_date}T${chef.delivery_slot}`
        chef.menu.forEach((menu) => {
          const chef_earning_fee = menu.chef_earning_fee || 0;
          const quantity = menu.quantity || 0;
          // const delivery_price = menu.delivery_price || 0;
          // const platform_price = menu.platform_price || 0;

          // ---- Delivery Price
          const deliveryPercentageFee =
            (defaultSetting?.delivery_charge_percentage / 100) *
            chef_earning_fee;

          const delivery_price =
            deliveryPercentageFee > defaultSetting?.delivery_charge
              ? deliveryPercentageFee
              : defaultSetting?.delivery_charge;

          // ---- Platform Price
          const platformPercentageFee =
            (defaultSetting?.platform_charge_percentage / 100) *
            chef_earning_fee;

          const platform_price =
            platformPercentageFee > defaultSetting?.platform_charge
              ? platformPercentageFee
              : defaultSetting?.platform_charge;

          // Calculate chef_earning_fee for each item
          chefEarningSum += chef_earning_fee * quantity;

          // Calculate sub total for each item
          sub_total += chef_earning_fee * quantity;

          // Calculate delivery price sum for each item
          deliverPriceSum += delivery_price * quantity;

          // Calculate platform price sum for each item -- teax & fee
          platformPriceSum += platform_price * quantity;
        });
      }
    });

    // Fetch the city data from local storage
    const city = JSON.parse(localStorage.getItem("region"));

    // Update city
    updateOrderDeliveryAddress({
      city: city.name,
    });

    // Calculate the total order price
    // const total = sub_total + order.tip_price + deliverPriceSum;
    const total =
      sub_total + order.tip_price + deliverPriceSum + platformPriceSum;

    // --- Promo code payload
    setPromoCode((prev) => ({
      ...prev,
      order_total: total,
    }));
    // console.log("chef delivery date adn tiem ", deliveryDateAndSlot)
    // Update the order state with calculated values
    updateOrder({
      delivery_time: deliveryDateAndSlot,
      chef_id: parseInt(chefId),
      city_id: city.id,
      sub_total: sub_total,
      chef_earning_price: chefEarningSum,
      delivery_price: deliverPriceSum,
      delivery_percentage: ((deliverPriceSum / chefEarningSum) * 100)?.toFixed(
        2
      ),
      service_fee: platformPriceSum,
      total_price: total,
    });

    // Temporary array to hold orderDetails
    const menuDetails = [];
    const promoCodeMenu = [];
    // Select the chef according to menuDetails
    cartItem.forEach((chef, chefIndex) => {
      if (chef.id === parseInt(chefId) && chefIndex === parseInt(chef_index)) {
        chef.menu.forEach((menu) => {
          // --- Delivery Price - Default Setting
          const deliveryPercentageFee =
            (defaultSetting?.delivery_charge_percentage / 100) *
            menu.chef_earning_fee;

          const delivery_price =
            deliveryPercentageFee > defaultSetting?.delivery_charge
              ? deliveryPercentageFee
              : defaultSetting?.delivery_charge;

          // ---- Platform Price - Default Setting
          const platformPercentageFee =
            (defaultSetting?.platform_charge_percentage / 100) *
            menu.chef_earning_fee;

          const platform_price =
            platformPercentageFee > defaultSetting?.platform_charge
              ? platformPercentageFee
              : defaultSetting?.platform_charge;

          // ---- Menu Detail for create-order api
          menuDetails.push({
            name: menu.name,
            user_menu_id: menu.id,
            unit_price: menu.unit_price,
            quantity: menu.quantity,
            // platform_percentage:(menu.platform_percentage
            //     ? menu.platform_percentage
            //     : (menu.platform_price / menu.chef_earning_fee) * 100) || 0,
            // platform_price: menu.platform_price,
            platform_percentage:
              ((platform_price / menu.chef_earning_fee) * 100).toFixed(2) || 0,
            platform_price: platform_price,
            // delivery_percentage:
            //   (menu.delivery_percentage
            //     ? menu.delivery_percentage
            //     : (menu.delivery_price / menu.chef_earning_fee) * 100) || 0,
            delivery_percentage:
              ((delivery_price / menu.chef_earning_fee) * 100)?.toFixed(2) || 0,
            // delivery_price: menu.delivery_price,
            delivery_price: delivery_price,
            chef_price: menu.chef_earning_fee,
          });
          // ---- For promo Code API
          promoCodeMenu.push({
            id: menu.id,
            qty: menu.quantity,
          });
        });
      }
    });

    // Update the orderDetail state
    setOrderDetails(menuDetails);
    // Promo Code
    setPromoCode((prev) => ({
      ...prev,
      menus: promoCodeMenu,
    }));
    // console.log("PromoCode required data from menu ", promoCodeMenu)

    // console.log("delivery data", orderDeliveryAddress);
    // console.log("Order Detail ", menuDetails);
    // console.log("Order  ", order);

    // console.log("UseEffect for cart updation is running .. CartItem", cartItem);
    //eslint-disable-next-line
  }, [cartItem, order.tip_price, defaultSetting]);


  const navigate = useNavigate();
  //--- On Submit Function
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsPending(true);
      // const datetimeString = combineDateAndTime(selectedDate, selectedTime);
      const payload = order;
      // payload.delivery_time = datetimeString;
      payload.orderDeliveryAddress = orderDeliveryAddress;
      payload.orderDetails = orderDetails;
      console.log("Pyalod is ", payload);
      const response = await handleCreateOrder(authToken, payload);
      // console.log("response ", response);
      toast.success(response.success || "Order created Successfully", {
        theme: "colored",
      });

      dispatch(onOrderSubmit({ chefId: parseInt(chefId) }));
      const updatedUserInfo = {
        ...userInfo,
        last_order_address: {
          order_delivery_address: orderDeliveryAddress,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUserInfo));
      dispatch(updateUser(updatedUserInfo));
      // Resetting
      setOrder(orderInitial);
      setOrderDetails(orderDetailInitial);
      setOrderDeliveryAddress(orderDeliveryAddressInitial);
      // navigate to cart - not reversable
      navigate("/cart", { replace: true });
    } catch (error) {
      console.error("Error on Placing order ", error);
      toast.error(error.message, { theme: "colored" });
    } finally {
      setIsPending(false);
    }
  };

  // Modal for Existing Addresses
  const [isOpen, setIsOpen] = useState(false);
  const onRequestClose = () => {
    setIsOpen(false);
  };

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

  const [addressPlace, setAddressPlace] = useState("home");
  const changeAddressPlace = (placeName) => {
    if (placeName === "home") {
      // reset office & buiding
    } else if (placeName === "office") {
      // reset home & buiding
    } else if (placeName === "building") {
      // reset home & office
    }
    setAddressPlace(placeName);
    updateOrderDeliveryAddress({ address_type: placeName });
  };

  // Custom date and time picker
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(null);

  // Handle time for delivery sync with date
  // const handleTimeChange = (time) => {
  //   // Extract the time from the Date object
  //   const hours = time.getHours();
  //   const minutes = time.getMinutes();

  //   // Format the time as HH:MM (24-hour) or h:mm aa (12-hour)
  //   const formattedTime = `${String(hours).padStart(2, "0")}:${String(
  //     minutes
  //   ).padStart(2, "0")}`;
  //   console.log("Selected time:", formattedTime);

  //   setSelectedTime(time); // Save the full Date object or formatted time based on your use case
  // };

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
            Checkout
          </h1>
          <div className="w-[60px] h-[2px] bg-primary my-4 lg:mx-0 mx-auto"></div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="lg:col-span-7 col-span-12">
            <form onSubmit={onSubmit}>
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
                <div className="border- border-primary border-dashed mb-3 rounded bg-slate-50 px-3 py-3">
                  {/* {userInfo.user_addresses &&
                    userInfo.user_addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="block ml-auto text-primary"
                      >
                        Select Existing Address
                      </button>
                    )} */}
                  {/* 3 different Addresses */}
                  <div className="grid grid-cols-3 gap-x-2 mb-5 w- mx-auto">
                    <div className="col-span-3">
                      <p className="text-sm text-primary opacity-80 text-center">* Select the tab where you want your food delivered</p>
                    </div>
                    {/* Home */}
                    <div
                      onClick={() => changeAddressPlace("home")}
                      className={`${
                        addressPlace === "home" &&
                        "bg-primary text-white fill-white"
                      } transition cursor-pointer hover:bg-red-300 border rounded-full h-10 flex justify-center gap-1  items-center p-1 px-2 text-base`}
                    >
                      Home
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="fill-inherit"
                        // width="25"
                        height="25"
                        viewBox="0 0 16 17"
                        xmlns="http://www.w3.org/2000/svg"
                        data-testid="home-label"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.72825 2.56995C8.30463 2.22335 7.69542 2.22335 7.2718 2.56995L2.02509 6.86271C1.70451 7.125 1.65726 7.59752 1.91955 7.9181C2.18185 8.23869 2.65437 8.28594 2.97495 8.02364L3.25002 7.79859V12.4428C3.25002 13.1332 3.80966 13.6928 4.50002 13.6928H6.85002C7.07093 13.6928 7.25002 13.5137 7.25002 13.2928V10.4428C7.25002 10.1667 7.50002 9.69281 8.00002 9.69281C8.50002 9.69281 8.75002 10.1667 8.75002 10.4428V13.2928C8.75002 13.5137 8.9291 13.6928 9.15002 13.6928H11.5C12.1904 13.6928 12.75 13.1332 12.75 12.4428V7.79858L13.0251 8.02364C13.3457 8.28594 13.8182 8.23869 14.0805 7.9181C14.3428 7.59752 14.2955 7.125 13.975 6.86271L8.72825 2.56995ZM11.25 6.5713L8.00002 3.91222L4.75002 6.57132V11.9928C4.75002 12.1033 4.83956 12.1928 4.95002 12.1928H5.55002C5.66047 12.1928 5.75002 12.1033 5.75002 11.9928V10.1928C5.75002 9.08824 6.89545 8.19281 8.00002 8.19281C9.10458 8.19281 10.25 9.08824 10.25 10.1928V11.9928C10.25 12.1033 10.3396 12.1928 10.45 12.1928H11.05C11.1605 12.1928 11.25 12.1033 11.25 11.9928V6.5713Z"
                        ></path>
                      </svg>
                    </div>
                    {/* Office */}
                    <div
                      onClick={() => changeAddressPlace("office")}
                      className={`${
                        addressPlace === "office" &&
                        "bg-primary text-white fill-white"
                      } transition cursor-pointer hover:bg-red-300 border rounded-full h-10 flex justify-center gap-1  items-center p-1 px-2`}
                    >
                      Office
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="fill-inherit"
                        height="25"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                        data-testid="work-label"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5 5L3 5C2.44772 5 2 5.44772 2 6V12C2 12.5523 2.44772 13 3 13H13C13.5523 13 14 12.5523 14 12V6C14 5.44772 13.5523 5 13 5H11C11 3.89543 10.1046 3 9 3H7C5.89543 3 5 3.89543 5 5ZM9 4.5H7C6.72386 4.5 6.5 4.72386 6.5 5L9.5 5C9.5 4.72386 9.27614 4.5 9 4.5ZM3.5 6.5V9H12.5V6.5H3.5ZM3.5 11.5V10.5H12.5V11.5H3.5Z"
                        ></path>
                      </svg>
                    </div>
                    {/* Buiding/Apartment */}
                    <div
                      onClick={() => changeAddressPlace("apartment")}
                      className={`${
                        addressPlace === "apartment" &&
                        "bg-primary text-white fill-white"
                      } transition cursor-pointer hover:bg-red-300 border rounded-full h-10 flex justify-center gap-1  items-center p-1 px-2`}
                    >
                      Apartment
                      <svg
                        fill="white"
                        className="fill-inherit"
                        height="25"
                        viewBox="0 0 50 50"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M9 0C7.355469 0 6 1.355469 6 3L6 50L44 50L44 3C44 1.355469 42.644531 0 41 0 Z M 9 2L41 2C41.554688 2 42 2.445313 42 3L42 48L38 48L38 36L27 36L27 48L8 48L8 3C8 2.445313 8.445313 2 9 2 Z M 12 6L12 14L23 14L23 6 Z M 27 6L27 14L38 14L38 6 Z M 14 8L21 8L21 12L14 12 Z M 29 8L36 8L36 12L29 12 Z M 12 16L12 24L23 24L23 16 Z M 27 16L27 24L38 24L38 16 Z M 14 18L21 18L21 22L14 22 Z M 29 18L36 18L36 22L29 22 Z M 12 26L12 34L23 34L23 26 Z M 27 26L27 34L38 34L38 26 Z M 14 28L21 28L21 32L14 32 Z M 29 28L36 28L36 32L29 32 Z M 12 36L12 44L23 44L23 36 Z M 14 38L21 38L21 42L14 42 Z M 29 38L36 38L36 48L29 48Z"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  {/* Home specific input field for delivery address */}
                  {addressPlace === "home" && (
                    <>
                      <div className="relative mb-1 mt-5">
                        <h4 className="text-sm font-semibold  bg-white absolute -top-2 left-2 px-1 z-20">
                          Street Address <span className="text-primary">*</span>
                        </h4>
                        <input
                          required
                          className="border rounded-md w-full"
                          name=""
                          value={orderDeliveryAddress.home_street_address}
                          onChange={(e) =>
                            updateOrderDeliveryAddress({
                              home_street_address: e.target.value,
                            })
                          }
                          placeholder="Street Address"
                        />
                      </div>
                      <div className="grid grid-cols-2 mt-5 gap-2">
                        <div className="relative mb-1 mt">
                          <h4 className="text-sm font-semibold  bg-white absolute -top-2 left-2 px-1 z-20">
                            House Number <span className="text-primary">*</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.home_house_no}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                home_house_no: e.target.value,
                              })
                            }
                            placeholder="House no. "
                          />
                        </div>
                        <div className="relative mb-1 mt">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            City <span className="text-primary">*</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.home_city}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                home_city: e.target.value,
                              })
                            }
                            placeholder="City"
                          />
                        </div>
                      </div>
                      <div className="relative mb-1 mt-4">
                        <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                          Additional Direction
                        </h4>
                        <input
                          className="border rounded-md w-full"
                          name=""
                          value={orderDeliveryAddress.home_addition_direction}
                          onChange={(e) =>
                            updateOrderDeliveryAddress({
                              home_addition_direction: e.target.value,
                            })
                          }
                          placeholder="Additional direction"
                        />
                      </div>
                    </>
                  )}

                  {/* Office specific input fields for delivery address */}
                  {addressPlace === "office" && (
                    <>
                      <div className="grid grid-cols-2 gap-2 gap-y-3 w-full mt-4">
                        <div className="relative">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            Office Dept
                            <span className="text-primary"> *</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.office_department}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                office_department: e.target.value,
                              })
                            }
                            placeholder="Office department"
                          />
                        </div>

                        <div className="relative">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            Floor
                            <span className="text-primary"> *</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.office_floor}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                office_floor: e.target.value,
                              })
                            }
                            placeholder="Floor"
                          />
                        </div>

                        <div className="relative">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            Company
                            <span className="text-primary"> *</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.office_company}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                office_company: e.target.value,
                              })
                            }
                            placeholder="Company "
                          />
                        </div>

                        <div className="relative">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            Building no.
                            <span className="text-primary"> *</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.office_building_no}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                office_building_no: e.target.value,
                              })
                            }
                            placeholder="Building no. "
                          />
                        </div>
                      </div>
                      {/* Street, city, additional direction */}
                      <div className="grid grid-cols-2 gap-2 gap-y-3 mt-4 ">
                        {/* Street for office */}
                        <div className="relative">
                          <h4 className="text-sm font-semibold  bg-white absolute -top-2 left-2 px-1 z-20">
                            Street Address{" "}
                            <span className="text-primary">*</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.office_street_address}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                office_street_address: e.target.value,
                              })
                            }
                            placeholder="Street Address"
                          />
                        </div>
                        {/* City for office */}
                        <div className="relative">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            City <span className="text-primary">*</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.office_city}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                office_city: e.target.value,
                              })
                            }
                            placeholder="City"
                          />
                        </div>
                      </div>
                      {/* Additional direction for office */}
                      <div className="relative mb-1 mt-4">
                        <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                          Additional Direction
                        </h4>
                        <input
                          className="border rounded-md w-full"
                          name=""
                          value={orderDeliveryAddress.office_addition_direction}
                          onChange={(e) =>
                            updateOrderDeliveryAddress({
                              office_addition_direction: e.target.value,
                            })
                          }
                          placeholder="Additional direction"
                        />
                      </div>
                    </>
                  )}

                  {/* Building specific input fields for delivery address */}
                  {addressPlace === "apartment" && (
                    <>
                      {/* Address, Apartment no, floor */}
                      <div className="grid grid-cols-2 gap-2 gap-y-3 w-full mt-4">
                        {/* Address Fields Updated */}
                        <div className="relative">
                          <h4 className="text-sm font-semibold mb-1 bg-white absolute -top-2 left-2 px-1 z-20">
                            Apartment Name
                            <span className="text-primary"> *</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.apartment_name}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                apartment_name: e.target.value,
                              })
                            }
                            placeholder="Building Name"
                          />
                        </div>
                        <div className="relative">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            Apt. No
                            <span className="text-primary"> *</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.apartment_apartment_no}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                apartment_apartment_no: e.target.value,
                              })
                            }
                            placeholder="Apartment No"
                          />
                        </div>
                        {/* Floor */}
                        <div className="relative">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            Floor <span className="text-primary">*</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.apartment_floor}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                apartment_floor: e.target.value,
                              })
                            }
                            placeholder="Floor"
                          />
                        </div>
                        {/* City */}
                        <div className="relative">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            City <span className="text-primary">*</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={orderDeliveryAddress.apartment_city}
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                apartment_city: e.target.value,
                              })
                            }
                            placeholder="City"
                          />
                        </div>
                        {/* Street  */}
                        <div className="relative col-span-2">
                          <h4 className="text-sm font-semibold  bg-white absolute -top-2 left-2 px-1 z-20">
                            Street Address{" "}
                            <span className="text-primary">*</span>
                          </h4>
                          <input
                            required
                            className="border rounded-md w-full"
                            name=""
                            value={
                              orderDeliveryAddress.apartment_street_address
                            }
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                apartment_street_address: e.target.value,
                              })
                            }
                            placeholder="Street Address"
                          />
                        </div>
                        {/* Additional direction */}
                        <div className="relative col-span-2 mt-1">
                          <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                            Additional Direction
                          </h4>
                          <input
                            className="border rounded-md w-full"
                            name=""
                            value={
                              orderDeliveryAddress.apartment_addition_direction
                            }
                            onChange={(e) =>
                              updateOrderDeliveryAddress({
                                apartment_addition_direction: e.target.value,
                              })
                            }
                            placeholder="Additional direction"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Not required */}
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
                  {/* <h4 className="text-base font-semibold mb-1 mt-3">
                      Longitude <span className="text-primary">*</span>
                    </h4>
                    <input
                      className="border rounded-md w-full"
                      name=""
                      type="number"
                      min={0}
                      step={0.01}
                      value={orderDeliveryAddress.longitude}
                      onChange={(e) =>
                        updateOrderDeliveryAddress({
                          longitude: parseFloat(e.target.value),
                        })
                      }
                      placeholder="Longitude"
                    />
                    <h4 className="text-base font-semibold mb-1 mt-3">
                      Latitude <span className="text-primary">*</span>
                    </h4>
                    <input
                      className="border rounded-md w-full"
                      name=""
                      type="number"
                      min={0}
                      step={0.01}
                      value={orderDeliveryAddress.latitude}
                      onChange={(e) =>
                        updateOrderDeliveryAddress({
                          latitude: parseFloat(e.target.value),
                        })
                      }
                      placeholder="Latitude"
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
                <div className="border-b border-primary border-dashed pb-4 mb-4 ">
                  <div className="relative grid grid-cols-2 gap-2">
                    <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                      Selected Delivery Date <span className="text-primary">*</span>
                    </h4>
                    <input type="text" className="" value={new Date(order.delivery_time.split("T")[0]).toDateString()}  disabled/>
                    {/* <input
                      min={new Date().toISOString().slice(0, 16)}
                      required
                      className="border rounded-md w-full pt-3"
                      type="datetime-local"
                      name=""
                      value={order.delivery_time}
                      onClick={() => setDeliveryTimeModal(true)}
                      // onChange={(e) =>
                      //   updateOrder({ delivery_time: e.target.value })
                      // }
                      readOnly
                      placeholder=""
                    /> */}
                    {/* <DatePicker
                      required
                      popperClassName="!z-50"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      includeDates={availableDays.map((day) => day.date)}
                      placeholderText="Pick a delivery date"
                      dateFormat="MMMM d, yyyy"
                    /> */}
                    {/* {selectedDate && ( */}
                      <div className="relative">
                        <h4 className="text-sm font-semibold bg-white absolute -top-2 left-2 px-1 z-20">
                          Selected Delivery Time{" "}
                          <span className="text-primary">*</span>
                        </h4>
                        <input type="text" value={order.delivery_time.split("T")[1]}  disabled/>
                        {/* <DatePicker
                          required
                          selected={selectedTime}
                          onChange={handleTimeChange} // Use the custom handler
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          placeholderText="Pick a delivery time"
                          dateFormat="h:mm aa" // Display time in 12-hour format (AM/PM)
                          filterTime={(time) => {
                            const selectedDay = availableDays.find(
                              (day) =>
                                day.date.toDateString() ===
                                selectedDate.toDateString()
                            );
                            if (selectedDay) {
                              const timeStr = time.toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                              return selectedDay.timeRanges.some(
                                (range) =>
                                  timeStr >= range.start && timeStr <= range.end
                              );
                            }
                            return false;
                          }}
                        /> */}
                      </div>
                    {/* )} */}
                  </div>
                </div>
                {/* ------ Promo Code ------ */}
                <div className="border-b border-primary border-dashed pb-4 mb-4 relative">
                  <h4 className="text-sm font-semibold mb- bg-white absolute -top-2 left-2 px-1 z-20">
                    Promo code or Gift card{" "}
                    {/* <span className="text-primary">*</span> */}
                  </h4>
                  <div className="relative">
                    <input
                      className="border rounded-md w-full pt-2"
                      name=""
                      value={promoCode.code}
                      onChange={(e) =>
                        setPromoCode((prev) => ({
                          ...prev,
                          code: e.target.value,
                        }))
                      }
                      placeholder="Promo Code"
                    />
                    <button
                      type="button"
                      onClick={handlePromoCodeSubmit}
                      className="text-[10px] font-semobold bg-primary px-2 py-1 text-white rounded-md absolute right-2 top-[50%] translate-y-[-50%]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                <div className="mt-6 border-b border-primary border-dashed pb-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl uppercase text-secondary tracking-widest">
                      Tip Shef:
                    </h2>
                    <h2 className="font-semibold text-2xl uppercase text-primary tracking-widest">
                      {/* $5.99 */}
                      {order.tip_price.toLocaleString("en-PK", {
                        style: "currency",
                        currency: "PKR",
                      })}
                    </h2>
                  </div>
                  <div className="grid lg:grid-cols-8 md:grid-cols-8 grid-cols-4 gap-3 mb-4">
                    <div
                      className={`chefDateBtn ${
                        activeButton === "btn1" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("btn1", 0)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        No Tip
                      </h4>
                    </div>
                    <div
                      className={`chefDateBtn ${
                        activeButton === "btn2" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("btn2", 10)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        10%
                      </h4>
                    </div>
                    <div
                      className={`chefDateBtn ${
                        activeButton === "btn3" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("btn3", 15)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        15%
                      </h4>
                    </div>
                    <div
                      className={`chefDateBtn ${
                        activeButton === "btn4" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("btn4", 20)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        20%
                      </h4>
                    </div>
                    <div
                      className={`chefDateBtn ${
                        activeButton === "btn5" ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick("btn5", 25)}
                    >
                      <h4 className="text-[14px] font-semibold mb-0 leading-tight">
                        25%
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
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
              <div className="border border-primary border-dashed rounded-lg p-4 mt-6">
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
                  Place Order
                </button>
              </div>
            </form>
          </div>
          <div className="lg:col-span-5 col-span-12">
            <div className="md:p-4 p-3 bg-primaryLight rounded-lg sticky top-0">
              <h3 className="mb-6 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest">
                Your order for delivery
              </h3>
              {/* <h3 className="mb-6 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest">
                Your order for delivery on Monday, February 12
              </h3> */}
              <div>
                {/* Order Box */}
                {cartItem.map(
                  (chef, chefIndex) =>
                    chef.id === parseInt(chefId) && chefIndex === parseInt(chef_index) && (
                      <div key={chefIndex}>
                        <div className="flex items-center gap-x-2 bg-primaryLight p-2 rounded-lg">
                          <img
                            src={
                              chef.profile_pic && isValidURL(chef.profile_pic)
                                ? chef.profile_pic
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            }
                            className="object-top rounded-full w-[30px] object-cover h-[30px]"
                            alt="ef"
                          />
                          {/* <img
                            src={
                              chef.profile_pic
                                ? chef.profile_pic
                                : "/media/frontend/img/banner/female-chef.png"
                            }
                            className="object-top rounded-full w-[30px] object-cover h-[30px]"
                            alt="ef"
                          /> */}
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
                                  <h4 className="text-lg fontsemibold mb-0">
                                    x
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
                                dispatch(
                                  removeFromCart({ chefIndex, menuIndex })
                                );
                                navigate("/cart", { replace: true });
                                toast.success(
                                  `${menu?.name} is removed from cart`
                                );
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
                    )
                )}

                {/* {(<div className='flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4'>
                                    <div className='flex items-center gap-x-2 w-[65%]'>
                                        <img src='./media/frontend/img/restaurants/255x104/order-2.jpg' className='object-top rounded-lg w-[60px] object-cover h-[60px]' alt='ef' />
                                        <div>
                                            <h3 className='mb-1 text-base font-semibold leading-tight'>Guajillo Grilled Shrimps </h3>
                                            <div className='flex items-center gap-x-3'>
                                                <div className='flex items-center justify-between w-[55%] bg-primaryLight rounded-lg'>
                                                    <button className='w-[25%]'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="15" height="15" fill="rgba(0,0,0,1)"><path d="M5 11V13H19V11H5Z"></path></svg>
                                                    </button>
                                                    <input className='w-[50%] text-center border-0 bg-transparent text-xs px-1 h-[30px]' placeholder='1' />
                                                    <button className='w-[25%]'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="15" height="15" fill="rgba(0,0,0,1)"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                                    </button>
                                                </div>
                                                <h4 className='text-lg fontsemibold mb-0'>x $13.99</h4>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className='cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
                                            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                                        </svg>
                                    </div>
                                </div>)} */}
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
                  {order.sub_total.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Delivery Fee</h3>
                {/* <h4 className='text-lg font-medium mb-0'>$2.49</h4> */}
                <h4 className="text-lg font-medium mb-0">
                  {order.delivery_price.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Fees & Taxes</h3>
                {/* <h4 className='text-lg font-medium mb-0'>$6.86</h4> */}
                <h4 className="text-lg font-medium mb-0">
                  {order.service_fee.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Shef Tip</h3>
                {/* <h4 className='text-lg font-medium mb-0'>$6.74</h4> */}
                <h4 className="text-lg font-medium mb-0">
                  {order.tip_price.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                </h4>
              </div>
              {/* Discount */}
              {/* {order?.discount_price > 0 && ( */}
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Discount</h3>
                <h4 className="text-lg font-medium mb-0">
                  {order.discount_price.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                </h4>
              </div>
              {/* )} */}
              <div className="flex justify-between gap-2 mb-1 bg-primaryLight py-2 px-3 rounded-md">
                <h3 className="text-lg font-bold mb-0">Total</h3>
                {/* <h4 className='text-lg font-bold mb-0'>$61.06</h4> */}
                <h4 className="text-lg font-bold mb-0">
                  {order.total_price.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                  })}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Adress modal */}
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
                      {/* <div className="w-full text-lg font-semibold">0-50 MB</div> */}
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

      {/* Select time for delivery  */}
      {/* <Modal
        isOpen={deliveryTimeModal}
        onRequestClose={onDeliveryModalClose}
        contentLabel="Delivery Time"
        style={{
          content: {
            height: "max-content",
            top: "10%",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        {/* Modal content here */}
      {/*<div className="flex items-center justify-between border-b pb-3 gap-3">
          <h2 className="text-lg font-semibold leading-tight mb-0">
            Select Delivery Time
          </h2>
          <button onClick={onDeliveryModalClose}>
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

        <div>
          <p className="my-3 text-lg text-headGray">
            <strong> Delivery Time : </strong>{" "}
            {selectedDeliveryDate?.date?.toDateString()}{" "}
            {convertTo12Hour(selectedDeliveryDate?.deliveryTime)}
          </p>
          {/* Delivery date and time */}
      {/*<div className="grid grid-cols-2 sm:grid-cols-3 w-full gap-1 my-2">
            {/* No matched days/time found */}
      {/* {availableDays?.length < 1 && (
              <>
                <h3 className="col-span-2 sm:col-span-3 opacity-70 text-xl font-semibold text-center">
                  No Matching Days
                </h3>
                <p className="text-sm text-gray-500 col-span-2 sm:col-span-3">
                  Thank you for adding items to your menu. Please note that some
                  of the items are not available at the same day and time. To
                  ensure availability, we kindly ask you to place separate
                  orders for items with different availability times. We
                  appreciate your understanding!
                </p>
              </>
            )}
            {/* Map the matched days */}
      {/* {availableDays?.map((obj, index) => (
              <label
                key={index}
                className={`flex items-center justify-between cursor-pointer border rounded-md px-2 py-5 ${
                  selectedDeliveryDate?.date?.toDateString() ===
                    obj?.date?.toDateString() && "border-blue-500"
                } `}
                onClick={() => SelectDeliveryDate(obj)}
              >
                <div className="flex flex-col items-center w-full">
                  <span className="text-lg font-semibold mb-1">
                    {obj.date.toDateString()}
                  </span>
                  <span className="text-sm">
                    {obj.timeRange?.start + " - " + obj.timeRange?.end}
                  </span>
                </div>
                {/* <input
                  type="radio"
                  className="form-radio w-[16px] h-[16px] hidden"
                /> */}
      {/*</label>
            ))}
          </div>

          <label
            className={`${!selectedDeliveryDate?.date && "hidden"} mt-4`}
            htmlFor="time"
          >
            <strong className="text-base my-3 block">Select Date :</strong>
            <input
              disabled={selectedDeliveryDate === ""}
              onChange={(e) =>
                setSelectedDeliveryDate((prev) => ({
                  ...prev,
                  deliveryTime: e.target.value,
                }))
              }
              value={selectedDeliveryDate.deliveryTime || ""}
              type="time"
              id="time"
              name="delivery_time"
              className="disabled:opacity-55"
              min={selectedDeliveryDate?.timeRange?.start}
              max={selectedDeliveryDate?.timeRange?.end}
            />
          </label>
          <button
            onClick={saveDeliveryDateTime}
            disabled={
              !selectedDeliveryDate.deliveryTime ||
              selectedDeliveryDate?.deliveryTime === ""
            }
            className="bg-primary py-2 px-4 font-semibold tracking-wide block rounded text-white mt-4 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </Modal> */}
    </>
  );
};
export default Checkout;
