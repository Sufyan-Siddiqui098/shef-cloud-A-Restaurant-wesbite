import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleCreateOrder } from "../../services/order";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  onOrderSubmit,
  removeFromCart,
  updateCartItem,
} from "../../store/slice/cart";
import isValidURL from "../../ValidateUrl";
import { updateUser } from "../../store/slice/user";

export const Checkout = () => {

  const { userInfo } = useSelector(state => state.user);

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
    name: "",
    email: "",
    phone: "",
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
    address: "",
    line2: "",
    latitude: "",
    longitude: "",
    name: "",
    phone: "",
    postal_code: "",
    city: "",
    state: "",
    delivery_instruction: "",
    delivery_notes: "",
  };
  //--- END - Initial Value for State

  const [order, setOrder] = useState(orderInitial);
  const [orderDetails, setOrderDetails] = useState(orderDetailInitial);
  const [orderDeliveryAddress, setOrderDeliveryAddress] = useState(
    orderDeliveryAddressInitial
  );

  // Use effect to set the initial delivery address from the last order address
  useEffect(() => {
    
    if (userInfo.last_order_address?.order_delivery_address) {
      const lastOrderAddress = userInfo.last_order_address.order_delivery_address;
      setOrderDeliveryAddress(prevAddress => ({
        ...prevAddress,
        address: lastOrderAddress?.address,
        line2: lastOrderAddress?.line2,
        city: lastOrderAddress?.city,
        postal_code: lastOrderAddress?.postal_code,
        state: lastOrderAddress?.state,
      }));
    }
  }, []);
  // Calculate and update tip_price
  const calculateTip = (percent) => {
    const tip_amount = parseFloat(
      (order.sub_total * (percent / 100)).toFixed(2)
    );
    updateOrder({ tip_price: tip_amount });
  };

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
 

  // Chef id
  const { chefId } = useParams();

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

  // Cart Item from Redux
  const { cartItem } = useSelector((state) => state.cart);
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

  // Get values from Cart item and update the above states.
  useEffect(() => {
    // Sub total = chef-earning * quantity
    const sub_total = cartItem.reduce((accChef, chef) => {
      const chefTotal = chef.menu.reduce((accMenu, menu) => {
        return accMenu + (menu.chef_earning_fee || 0) * menu.quantity;
      }, 0);
      return accChef + chefTotal;
    }, 0);
    // Delivery
    const deliverPriceSum = cartItem.reduce((accChef, chef) => {
      const chefTotal = chef.menu.reduce((accMenu, menu) => {
        return accMenu + (menu.delivery_price || 0) * menu.quantity;
      }, 0);
      return accChef + chefTotal;
    }, 0);
    // Platform
    const platformPriceSum = cartItem.reduce((accChef, chef) => {
      const chefTotal = chef.menu.reduce((accMenu, menu) => {
        return accMenu + (menu.platform_price || 0) * menu.quantity;
      }, 0);
      return accChef + chefTotal;
    }, 0);

    const city = JSON.parse(localStorage.getItem("region"));
    updateOrder({ chef_id: parseInt(chefId), city_id: city.id });

    const total =
      sub_total + order.tip_price + deliverPriceSum + platformPriceSum;
    // Update - Order(state)
    updateOrder({
      sub_total,
      delivery_price: deliverPriceSum,
      service_fee: platformPriceSum,
    });
    updateOrder({ total_price: total });
    // extract each Dish's detail a/c to OrderDetails(state)

    //temporary array to hold orderDetails
    const menuDetails = [];
    // select the chef according menuDetails
    cartItem.forEach((chef) => {
      if (chef.id === parseInt(chefId)) {
        chef.menu.forEach((menu) => {
          menuDetails.push({
            name: menu.name,
            user_menu_id: menu.id,
            unit_price: menu.unit_price,
            quantity: menu.quantity,
            platform_percentage:
              (menu.platform_percentage
                ? menu.platform_percentage
                : (menu.platform_price / menu.chef_earning_fee) * 100) || 0,
            platform_price: menu.platform_price,
            delivery_percentage:
              (menu.delivery_percentage
                ? menu.delivery_percentage
                : (menu.delivery_price / menu.chef_earning_fee) * 100) || 0,
            delivery_price: menu.delivery_price,
            chef_price: menu.chef_earning_fee,
          });
        });
      }
    });
    // Update - OrderDetail(state)
    setOrderDetails(menuDetails);

    console.log("delivery data", orderDeliveryAddress);
    console.log("Order Detail ", menuDetails);
    console.log("Order  ", order);

    console.log("UseEffect for cart updation is running .. CartItem", cartItem);
    //eslint-disable-next-line
  }, [cartItem, order.tip_price]);

  // ---- On submit
  const [isPending, setIsPending] = useState(false);
  const { authToken } = useSelector((state) => state.user);

  const navigate = useNavigate();
  //--- On Submit Function
  const onSubmit = async (e) => {
    try {
      setIsPending(true);
      const payload = order;
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
          order_delivery_address: orderDeliveryAddress 
        } 
      };

      localStorage.setItem("user", JSON.stringify(updatedUserInfo))
      dispatch(updateUser(updatedUserInfo));
      // Resetting
      setOrder(orderInitial);
      setOrderDetails(orderDetailInitial);
      setOrderDeliveryAddress(orderDeliveryAddressInitial);
      navigate("/cart", { replace: true});
    } catch (error) {
      console.error("Error on Placing order ", error);
      toast.error(error.message, { theme: "colored" });
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
            to="/"
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
            Chechout
          </h1>
          <div className="w-[60px] h-[2px] bg-primary my-4 lg:mx-0 mx-auto"></div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="lg:col-span-7 col-span-12">
            <form>
              <div className="border border-primary border-dashed rounded-lg p-4">
                <h2 className="font-semibold text-xl uppercase text-secondary tracking-widest">
                  Delivery information
                </h2>
                <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Phone <span className="text-primary">*</span>
                  </h4>
                  <input
                    className="border rounded-md w-1/2"
                    name=""
                    value={order.phone}
                    onChange={(e) => {
                      updateOrder({ phone: e.target.value });
                      updateOrderDeliveryAddress({ phone: e.target.value });
                    }}
                    placeholder="Enter Phone"
                  />
                </div>
                <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Name <span className="text-primary">*</span>
                  </h4>
                  <input
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
                <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Email <span className="text-primary">*</span>
                  </h4>
                  <input
                    className="border rounded-md w-full"
                    name=""
                    value={order.email}
                    onChange={(e) => {
                      updateOrder({ email: e.target.value });
                    }}
                    placeholder="Enter Email"
                  />
                </div>
                <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Address <span className="text-primary">*</span>
                  </h4>
                  <input
                    className="border rounded-md w-full"
                    name=""
                    value={orderDeliveryAddress.address}
                    onChange={(e) =>
                      updateOrderDeliveryAddress({ address: e.target.value })
                    }
                    placeholder="Apartment, suite, unit, building, floor, etc."
                  />
                  <h4 className="text-base font-semibold mb-1 mt-3">
                    Address Line 2 <span className="text-primary">*</span>
                  </h4>
                  <input
                    className="border rounded-md w-full"
                    name=""
                    value={orderDeliveryAddress.line2}
                    onChange={(e) =>
                      updateOrderDeliveryAddress({ line2: e.target.value })
                    }
                    placeholder="Apartment, suite, unit, building, floor, etc."
                  />
                  <h4 className="text-base font-semibold mb-1 mt-3">
                    City <span className="text-primary">*</span>
                  </h4>
                  <input
                    className="border rounded-md w-full"
                    name=""
                    value={orderDeliveryAddress.city}
                    onChange={(e) =>
                      updateOrderDeliveryAddress({ city: e.target.value })
                    }
                    placeholder="City"
                  />
                  <h4 className="text-base font-semibold mb-1 mt-3">
                    Postal Code <span className="text-primary">*</span>
                  </h4>
                  <input
                    className="border rounded-md w-full"
                    name=""
                    value={orderDeliveryAddress.postal_code}
                    onChange={(e) =>
                      updateOrderDeliveryAddress({
                        postal_code: e.target.value,
                      })
                    }
                    placeholder="Postal Code"
                  />
                  <h4 className="text-base font-semibold mb-1 mt-3">
                    State <span className="text-primary">*</span>
                  </h4>
                  <input
                    className="border rounded-md w-full"
                    name=""
                    value={orderDeliveryAddress.state}
                    onChange={(e) =>
                      updateOrderDeliveryAddress({ state: e.target.value })
                    }
                    placeholder="State"
                  />
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
                <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Delivery Instruction <span className="text-primary">*</span>
                  </h4>
                  <textarea
                    className="border rounded-md w-full h-[100px]"
                    value={orderDeliveryAddress.delivery_instruction}
                    onChange={(e) =>
                      updateOrderDeliveryAddress({
                        delivery_instruction: e.target.value,
                      })
                    }
                    placeholder="Type Query..."
                  ></textarea>
                </div>
                <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Delivery Notes <span className="text-primary">*</span>
                  </h4>
                  <textarea
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
                </div>
                <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Delivery time <span className="text-primary">*</span>
                  </h4>
                  <input
                    className="border rounded-md w-full"
                    type="datetime-local"
                    name=""
                    value={order.delivery_time}
                    onChange={(e) =>
                      updateOrder({ delivery_time: e.target.value })
                    }
                    placeholder=""
                  />
                </div>
                {/* <div className="border-b border-primary border-dashed pb-5 mb-4">
                  <h4 className="text-base font-semibold mb-1">
                    Promo code or Gift card{" "}
                    <span className="text-primary">*</span>
                  </h4>
                  <div className="relative">
                    <input
                      className="border rounded-md w-full"
                      name=""
                      placeholder="Promo Code"
                    />
                    <button className="text-[10px] font-semobold bg-primary px-2 py-1 text-white rounded-md absolute right-2 top-[50%] translate-y-[-50%]">
                      Submit
                    </button>
                  </div>
                </div> */}
                <div className="mt-8 border-b border-primary border-dashed pb-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl uppercase text-secondary tracking-widest">
                      Tip Shef:
                    </h2>
                    <h2 className="font-semibold text-2xl uppercase text-primary tracking-widest">
                      {/* $5.99 */}
                      {order.tip_price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
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
                <div className="mt-8">
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
              <div className="border border-primary border-dashed rounded-lg p-4 mt-8">
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
                      Delivery
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
                  onClick={onSubmit}
                  type="button"
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
                    chef.id === parseInt(chefId) && (
                      <div key={chefIndex}>
                        <div className="flex items-center gap-x-2 bg-primaryLight p-2 rounded-lg">
                          <img
                            src={
                              (chef.profile_pic && isValidURL(chef.profile_pic))
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
                              {/* <img
                                src={
                                  menu.logo && isValidURL(menu.logo)
                                    ? menu.logo
                                    : "/media/frontend/img/restaurants/255x104/order-2.jpg"
                                }
                                className="object-top rounded-lg w-[60px] object-cover h-[60px]"
                                alt="ef"
                              /> */}
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
                                    {menu.unit_price.toLocaleString("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                    })}
                                  </h4>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                dispatch(removeFromCart(chefIndex, menuIndex))
                              }
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
                  {order.sub_total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Delivery Fee</h3>
                {/* <h4 className='text-lg font-medium mb-0'>$2.49</h4> */}
                <h4 className="text-lg font-medium mb-0">
                  {order.delivery_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Fees & Taxes</h3>
                {/* <h4 className='text-lg font-medium mb-0'>$6.86</h4> */}
                <h4 className="text-lg font-medium mb-0">
                  {order.service_fee.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1">
                <h3 className="text-lg font-medium mb-0">Shef Tip</h3>
                {/* <h4 className='text-lg font-medium mb-0'>$6.74</h4> */}
                <h4 className="text-lg font-medium mb-0">
                  {order.tip_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h4>
              </div>
              <div className="flex justify-between gap-2 mb-1 bg-primaryLight py-2 px-3 rounded-md">
                <h3 className="text-lg font-bold mb-0">Total</h3>
                {/* <h4 className='text-lg font-bold mb-0'>$61.06</h4> */}
                <h4 className="text-lg font-bold mb-0">
                  {order.total_price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Checkout;
