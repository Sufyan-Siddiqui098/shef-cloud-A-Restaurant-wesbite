import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slice/cart";
import { toast } from "react-toastify";
import {
  handleGetAllChefs,
  handleGetSingleDish,
} from "../../services/get_without_auth";
import isValidURL from "../../ValidateUrl";

export const DishDetailSingle = () => {
  // Description Tabs Start
  const [activeDescTab, setDescActiveTab] = useState(1);

  const descTabClick = (tabNumber) => {
    setDescActiveTab(tabNumber);
  };
  // Description Tabs End

  // Plus Minus Quantity Start
  const [quantity, setQuantity] = useState(0);
  // If already in cart then show the count
  const [alreadyInCartCount, setAlreadyInCartCount] = useState(0);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    if (alreadyInCartCount !== 0) {
      setAlreadyInCartCount((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    if (alreadyInCartCount !== 0) {
      setAlreadyInCartCount((prevQuantity) =>
        prevQuantity > 0 ? prevQuantity - 1 : 0
      );
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 0 : value);
  };
  // Plus Minus Quantity End

  // -- Get dishId from Param
  const { dishId } = useParams();
  // -- authtoken from redux store
  const { authToken } = useSelector((state) => state.user);
  // -- Single Dish
  const [dish, setDish] = useState({});
  // --- Api is fetching
  const [isFetching, setIsFetching] = useState(false);

  const { cartItem } = useSelector((state) => state.cart);

  // Fetch Single Dish
  useEffect(() => {
    const fetchSingleDish = async () => {
      try {
        setIsFetching(true);
        const dishResponse = await handleGetSingleDish(dishId);
        const city = JSON.parse(localStorage.getItem("region"));
        const chefReponse = await handleGetAllChefs(city.id);
        chefReponse.forEach((chef) => {
          if (chef.id === dishResponse.user_id) {
            dishResponse.chef = chef;
          }
        });

        let discount;
        if (
          dishResponse.auto_applied_discounts &&
          dishResponse.auto_applied_discounts.length > 0
        ) {
          const discountType =
            dishResponse.auto_applied_discounts[0].discount_type;
          const discountAmount = parseFloat(
            dishResponse.auto_applied_discounts[0].discount
          );
          if (discountType === "$") {
            discount = dishResponse.chef_earning_fee - discountAmount;
          } else if (discountType === "%") {
            discount =
              dishResponse.chef_earning_fee -
              dishResponse.chef_earning_fee * (discountAmount / 100);
          }
          dishResponse.chef_earning_fee = discount;
        }
        console.log("Chef discounted ", discount);
        console.log("response of single dish ", dishResponse);
        setDish(dishResponse);
      } catch (error) {
        console.error("Error while fetching single dish \n", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSingleDish();
  }, [authToken, dishId]);

  // add to cart
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const unit_price = parseFloat(
      (
        dish.chef_earning_fee +
        dish.platform_price +
        dish.delivery_price
      ).toFixed(2)
    );

    // console.log("add to cart payload ", {...dish, quantity, unit_price});
    // const payload = dish.chef;
    // payload.menu = [{...dish, quantity, unit_price}];
    // console.log("dispatch add to cart ", payload);
    dispatch(addToCart({ ...dish, quantity, unit_price, chef: dish.chef }));
    // dispatch(addToCart(payload));
    toast.dismiss();
    toast.success("Added to Cart ", { autoClose: 2000 });
    setQuantity(0);
  };

  useEffect(() => {
    // Checking if the item alreay exist in cart then show its count
    cartItem?.forEach((chef, chefIndex) => {
      if (chef.id === dish?.chef?.id) {
        chef.menu?.forEach((menu, menuIdex) => {
          if (menu.id === dish.id && menu.quantity > 0) {
            console.log("Quantity already exist ", menu.quantity);
            setAlreadyInCartCount(menu.quantity);
          }
        });
      }
    });
    console.log("Count useEffect is running ");
  }, [dish, cartItem]);

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8 lg:px-2 px-4">
        <Link to="/all-dish-detail">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="rgba(0,0,0,1)"
            >
              <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
            </svg>
            <div>
              <h1 className="text-lg font-semibold mb-0">Back</h1>
            </div>
          </div>
        </Link>
        <div className="mt-8 border p-4 rounded-xl">
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-5 col-span-12">
              <div className="relative h-full">
                <div className="absolute left-2 top-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="#ec2044"
                  >
                    <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
                  </svg>
                  {/******* When User Add To Wishlish Show This Icon  ******/}
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ec2044">
                                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path>
                                        </svg> */}
                </div>
                <img
                  src={
                    dish.logo && isValidURL(dish.logo)
                      ? dish.logo
                      : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                  }
                  className="img-fluid object-cover h-full max-h-[400px] w-full rounded-xl"
                  alt="product-img"
                />
                {/* <img src={(dish.logo && isValidURL(dish.logo))? dish.logo : "/media/frontend/img/restaurants/255x104/order-1.jpg"} className="img-fluid object-cover h-full max-h-[400px] w-full rounded-xl" alt="product-img" /> */}
              </div>
            </div>
            <div className="lg:col-span-7 col-span-12">
              <div className="md:py-4 py-0">
                <div className="flex md:flex-row flex-col md:items-center text-start justify-between gap-2">
                  <h2 className="md:text-3xl text-2xl text-secondary font-semibold leading-tight md:mb-2 mb-0">
                    {/* Chilli Chicken Pizza */}
                    {dish.name}
                  </h2>
                  <h2 className="md:text-4xl text-2xl text-secondary font-bold mb-2">
                    {/* $12.99 */}
                    {(
                      dish.chef_earning_fee +
                      dish.platform_price +
                      dish.delivery_price
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}

                    {dish?.auto_applied_discounts?.length > 0 && (
                      <span className="text-[14px] md:text-[18px] block -mt-1 text-green-700">
                        {/* [ 20% off ] */}[{" "}
                        {`${dish.auto_applied_discounts[0].discount} ${dish.auto_applied_discounts[0].discount_type} `}
                        <span className="text-[11px] md:text-[14px]">Off</span>{" "}
                        ]
                      </span>
                    )}
                  </h2>
                </div>
                <div className="text-lg text-secondary  flex items-center gap-2 mb-1">
                  <span className="!text-headGray">by</span>
                  {/* <Link to="/shef-detail" className='!underline !text-headGray font-semibold'>Khudeja Fatima </Link> */}
                  <Link
                    to={`/shef-detail/${dish?.user_id}`}
                    className="!underline !text-headGray font-semibold"
                  >
                    {`${dish?.chef?.first_name} ${dish?.chef?.last_name}`}
                  </Link>

                  {/* <span className="!text-headGray">rating</span>

                  <div className="inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="#323232"
                    >
                      <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                    </svg>
                    <h4 className="text-base leading-tight mb-0 font-semibold">
                      4.5 <span className="text-[12px] font-normal">(30)</span>
                    </h4>
                  </div> */}
                </div>

                {/* ---- Availibility ---- */}
                <div className="mt-0 mb-3 ">
                  <h4 className="text-[12px] text-headGray mb-1">
                    Availibility:{" "}
                  </h4>
                  <ul className="flex gap-1 flex-wrap">
                    {/* Days - starting from sunday */}
                    <div className="relative group">
                      <li
                        className={`text w-6 h-6 text-center ${
                          dish?.is_sunday === 1
                            ? "bg-primary text-white"
                            : "border"
                        } rounded-full mb-0 flex items-center justify-center`}
                      >
                        S
                      </li>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        Sunday
                      </div>
                    </div>

                    <div className="relative group">
                      <li
                        className={`text w-6 h-6 text-center ${
                          dish?.is_monday === 1
                            ? "bg-primary text-white"
                            : "border"
                        } rounded-full mb-0 flex items-center justify-center`}
                      >
                        M
                      </li>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        Monday
                      </div>
                    </div>

                    <div className="relative group">
                      <li
                        className={`text w-6 h-6 text-center ${
                          dish?.is_tuesday === 1
                            ? "bg-primary text-white"
                            : "border"
                        } rounded-full mb-0 flex items-center justify-center`}
                      >
                        T
                      </li>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        Tuesday
                      </div>
                    </div>

                    <div className="relative group">
                      <li
                        className={`text w-6 h-6 text-center ${
                          dish?.is_wednesday === 1
                            ? "bg-primary text-white"
                            : "border"
                        } rounded-full mb-0 flex items-center justify-center`}
                      >
                        W
                      </li>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        Wednesday
                      </div>
                    </div>

                    <div className="relative group">
                      <li
                        className={`text w-6 h-6 text-center ${
                          dish?.is_thursday === 1
                            ? "bg-primary text-white"
                            : "border"
                        } rounded-full mb-0 flex items-center justify-center`}
                      >
                        T
                      </li>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        Thursday
                      </div>
                    </div>

                    <div className="relative group">
                      <li
                        className={`text w-6 h-6 text-center ${
                          dish?.is_friday === 1
                            ? "bg-primary text-white"
                            : "border"
                        } rounded-full mb-0 flex items-center justify-center`}
                      >
                        F
                      </li>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        Friday
                      </div>
                    </div>

                    <div className="relative group">
                      <li
                        className={`text w-6 h-6 text-center ${
                          dish?.is_saturday === 1
                            ? "bg-primary text-white"
                            : "border"
                        } rounded-full mb-0 flex items-center justify-center`}
                      >
                        S
                      </li>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                        Saturday
                      </div>
                    </div>
                  </ul>
                </div>
                <div className="md:w-2/3 w-full">
                  <div className="flex gap-3 mb-3 border-b">
                    <div
                      onClick={() => descTabClick(1)}
                      className={
                        activeDescTab === 1
                          ? "!border-b-2 !border-primary cursor-pointer font-semibold text-lg"
                          : "cursor-pointer text-lg"
                      }
                    >
                      Description
                    </div>
                    <div
                      onClick={() => descTabClick(2)}
                      className={
                        activeDescTab === 2
                          ? "!border-b-2 !border-primary cursor-pointer font-semibold text-lg"
                          : "cursor-pointer text-lg"
                      }
                    >
                      Main ingredients
                    </div>
                  </div>
                  <div>
                    {activeDescTab === 1 && (
                      <p className="text-base">{dish.description}</p>
                    )}
                    {activeDescTab === 2 && (
                      <p className="text-base">
                        {dish?.ingredients
                          ?.map((ing) => ing?.ingredient.name)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/********* EXTRA DETAIL *********/}
          <div className="mt-8">
            {/*****  PORTION SIZE BOX *****/}
            <div className="mt-2">
              <h4 className="text-lg font-bold uppercase mb-2">Portion size</h4>
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 mt-2">
                {/* 1 Serving Box */}
                <label
                  className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 prtionRadio"
                  htmlFor="portion_1"
                >
                  <div className="flex items-center gap-x-3 ">
                    <div className="text-center border-r pr-3">
                      <div className=" mb-1">
                        <svg
                          className="mx-auto"
                          height="30"
                          width="30"
                          viewBox="0 0 16 16"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                        >
                          <path
                            d="M8 3C5.09114 3 2 3.87696 2 5.50083C2 7.12471 2.62751 8.68078 3.76653 9.75003C4.33217 10.2813 5.00497 10.6881 5.74627 10.9593V12.6099C5.74627 12.8244 5.91972 12.9989 6.13294 12.9989H9.86595C10.0792 12.9989 10.2526 12.8244 10.2526 12.6099V10.9593C10.9939 10.6881 11.6667 10.2813 12.2324 9.75003C13.3714 8.68078 13.9989 7.17139 13.9989 5.50083C13.9989 3.83028 10.9089 3 8 3ZM8 3.77804C11.2381 3.77804 13.2267 4.78171 13.2267 5.50083C13.2267 6.21996 11.2381 7.22474 8 7.22474C4.76192 7.22474 2.77334 6.22107 2.77334 5.50083C2.77334 4.78059 4.76192 3.77804 8 3.77804ZM9.47929 12.222H6.51961V11.1894C6.99466 11.2972 7.4907 11.3517 7.9989 11.3517C8.50709 11.3517 9.00313 11.2961 9.47818 11.1894V12.222H9.47929ZM8 10.5736C5.47671 10.5736 3.53231 9.09314 2.95231 6.89908C4.09133 7.62265 6.08544 8.00278 8 8.00278C9.91456 8.00278 11.9087 7.62265 13.0477 6.89908C12.4677 9.09203 10.5222 10.5736 8 10.5736Z"
                            stroke="none"
                            fill="currentColor"
                            className="sc-iBPRYJ brBpOV"
                          ></path>
                          <path
                            d="M3.96094 5.89117C4.02501 5.89117 4.0913 5.8745 4.15096 5.84004C4.30673 5.75112 4.58734 5.61775 5.0403 5.48548C5.86666 5.24429 6.9173 5.11202 7.99887 5.11202C8.21209 5.11202 8.38554 4.93752 8.38554 4.723C8.38554 4.50849 8.21209 4.33398 7.99887 4.33398C6.84659 4.33398 5.71973 4.47737 4.82487 4.73856C4.40285 4.86194 4.04822 5.00421 3.76871 5.16315C3.58311 5.26874 3.51793 5.5066 3.62288 5.69333C3.69358 5.82004 3.82505 5.89117 3.95983 5.89117H3.96094Z"
                            stroke="none"
                            fill="currentColor"
                            className="sc-iBPRYJ brBpOV"
                          ></path>
                        </svg>
                      </div>
                      {/* <h4 className='text-[10px] font-semibold mb-0 leading-tight'>1 serving</h4> */}
                      <h4 className="text-[10px] font-semibold mb-0 leading-tight">
                        {dish?.portion_type?.name}
                      </h4>
                    </div>
                    <div className="">
                      {/* <h5 className="text-lg font-semibold mr-2 mb-1">$12.99 16 oz container</h5> */}
                      <h5 className="text-lg font-semibold mr-2 mb-1">
                        {(
                          dish.chef_earning_fee +
                          dish.platform_price +
                          dish.delivery_price
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                        <br /> {dish.portion_size}{" "}
                        {dish.base_type_id === 1
                          ? "oz Container"
                          : dish.base_type_id === 2
                          ? "pieces Pieces"
                          : dish.base_type_id === 3 && "Other"}
                      </h5>
                      <h6 className="text-[12px] text-primaryGreen mb-0 mr-3">
                        Shef recommend
                      </h6>
                    </div>
                    <span className="text-base font-medium mr-2"></span>
                  </div>
                  {/* <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="portion_radio" id="portion_1" value="" /> */}
                </label>

                {/* 2 Serving Box */}
                {/* <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 prtionRadio" htmlFor="portion_2">
                                    <div className='flex items-center gap-x-3'>
                                        <div className='text-center border-r pr-3'>
                                            <div className=' mb-1'>
                                                <svg className="mx-auto" height="30" width="30" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none" >
                                                    <path d="M8 3C5.09114 3 2 3.87696 2 5.50083C2 7.12471 2.62751 8.68078 3.76653 9.75003C4.33217 10.2813 5.00497 10.6881 5.74627 10.9593V12.6099C5.74627 12.8244 5.91972 12.9989 6.13294 12.9989H9.86595C10.0792 12.9989 10.2526 12.8244 10.2526 12.6099V10.9593C10.9939 10.6881 11.6667 10.2813 12.2324 9.75003C13.3714 8.68078 13.9989 7.17139 13.9989 5.50083C13.9989 3.83028 10.9089 3 8 3ZM8 3.77804C11.2381 3.77804 13.2267 4.78171 13.2267 5.50083C13.2267 6.21996 11.2381 7.22474 8 7.22474C4.76192 7.22474 2.77334 6.22107 2.77334 5.50083C2.77334 4.78059 4.76192 3.77804 8 3.77804ZM9.47929 12.222H6.51961V11.1894C6.99466 11.2972 7.4907 11.3517 7.9989 11.3517C8.50709 11.3517 9.00313 11.2961 9.47818 11.1894V12.222H9.47929ZM8 10.5736C5.47671 10.5736 3.53231 9.09314 2.95231 6.89908C4.09133 7.62265 6.08544 8.00278 8 8.00278C9.91456 8.00278 11.9087 7.62265 13.0477 6.89908C12.4677 9.09203 10.5222 10.5736 8 10.5736Z" stroke="none" fill="currentColor" className="sc-iBPRYJ brBpOV" ></path><path d="M3.96094 5.89117C4.02501 5.89117 4.0913 5.8745 4.15096 5.84004C4.30673 5.75112 4.58734 5.61775 5.0403 5.48548C5.86666 5.24429 6.9173 5.11202 7.99887 5.11202C8.21209 5.11202 8.38554 4.93752 8.38554 4.723C8.38554 4.50849 8.21209 4.33398 7.99887 4.33398C6.84659 4.33398 5.71973 4.47737 4.82487 4.73856C4.40285 4.86194 4.04822 5.00421 3.76871 5.16315C3.58311 5.26874 3.51793 5.5066 3.62288 5.69333C3.69358 5.82004 3.82505 5.89117 3.95983 5.89117H3.96094Z" stroke="none" fill="currentColor" className="sc-iBPRYJ brBpOV" ></path>
                                                </svg>
                                            </div>
                                            <h4 className='text-[10px] font-semibold mb-0 leading-tight'>2 serving</h4>
                                        </div>
                                        <div className=''>
                                            <h5 className="text-lg font-semibold mr-2 mb-1">$20.99 16 oz container</h5>
                                            <h6 className='text-[12px] text-primaryGreen mb-0 mr-3'>Save 18%</h6>
                                        </div>
                                    </div>
                                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="portion_radio" id="portion_2" value="" />
                                </label> */}
                {/* 3 Serving Box */}
                {/* <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 prtionRadio" htmlFor="portion_3">
                                    <div className='flex items-center gap-x-3'>
                                        <div className='text-center border-r pr-3'>
                                            <div className=' mb-1'>
                                                <svg className="mx-auto" height="30" width="30" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none" >
                                                    <path d="M8 3C5.09114 3 2 3.87696 2 5.50083C2 7.12471 2.62751 8.68078 3.76653 9.75003C4.33217 10.2813 5.00497 10.6881 5.74627 10.9593V12.6099C5.74627 12.8244 5.91972 12.9989 6.13294 12.9989H9.86595C10.0792 12.9989 10.2526 12.8244 10.2526 12.6099V10.9593C10.9939 10.6881 11.6667 10.2813 12.2324 9.75003C13.3714 8.68078 13.9989 7.17139 13.9989 5.50083C13.9989 3.83028 10.9089 3 8 3ZM8 3.77804C11.2381 3.77804 13.2267 4.78171 13.2267 5.50083C13.2267 6.21996 11.2381 7.22474 8 7.22474C4.76192 7.22474 2.77334 6.22107 2.77334 5.50083C2.77334 4.78059 4.76192 3.77804 8 3.77804ZM9.47929 12.222H6.51961V11.1894C6.99466 11.2972 7.4907 11.3517 7.9989 11.3517C8.50709 11.3517 9.00313 11.2961 9.47818 11.1894V12.222H9.47929ZM8 10.5736C5.47671 10.5736 3.53231 9.09314 2.95231 6.89908C4.09133 7.62265 6.08544 8.00278 8 8.00278C9.91456 8.00278 11.9087 7.62265 13.0477 6.89908C12.4677 9.09203 10.5222 10.5736 8 10.5736Z" stroke="none" fill="currentColor" className="sc-iBPRYJ brBpOV" ></path><path d="M3.96094 5.89117C4.02501 5.89117 4.0913 5.8745 4.15096 5.84004C4.30673 5.75112 4.58734 5.61775 5.0403 5.48548C5.86666 5.24429 6.9173 5.11202 7.99887 5.11202C8.21209 5.11202 8.38554 4.93752 8.38554 4.723C8.38554 4.50849 8.21209 4.33398 7.99887 4.33398C6.84659 4.33398 5.71973 4.47737 4.82487 4.73856C4.40285 4.86194 4.04822 5.00421 3.76871 5.16315C3.58311 5.26874 3.51793 5.5066 3.62288 5.69333C3.69358 5.82004 3.82505 5.89117 3.95983 5.89117H3.96094Z" stroke="none" fill="currentColor" className="sc-iBPRYJ brBpOV" ></path>
                                                </svg>
                                            </div>
                                            <h4 className='text-[10px] font-semibold mb-0 leading-tight'>3 serving</h4>
                                        </div>
                                        <div className=''>
                                            <h5 className="text-lg font-semibold mr-2 mb-1">$26.99 16 oz container</h5>
                                            <h6 className='text-[12px] text-primaryGreen mb-0 mr-3'>Save 33%</h6>
                                        </div>
                                    </div>
                                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="portion_radio" id="portion_3" value="" />
                                </label> */}
              </div>
            </div>

            {/*****  SPICE LEVEL *****/}
            <div className="mt-4">
              <h4 className="text-lg font-bold uppercase mb-2">Spice level</h4>
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 mt-2">
                {/* 1 Spice Box */}
                <label
                  className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 prtionRadio"
                  htmlFor="spice_1"
                >
                  <div className="flex items-center gap-x-3 ">
                    <div className="flex items-center mb-2 border-r pr-3">
                      <svg
                        className="sc-jSgupP ckDfJz"
                        height="18"
                        width="18"
                        viewBox="0 0 16 16"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          d="M13.9834 5.93983L13.879 5.37787C13.6812 4.30918 13.0436 3.38775 12.1306 2.8507C12.0895 2.82688 11.9106 2.73918 11.7018 2.64822C11.8484 2.32664 11.9128 1.97258 11.8862 1.61202C11.844 1.03058 11.5718 0.500021 11.1197 0.118889C10.9109 -0.0576019 10.5954 -0.0359466 10.4144 0.167613C10.2333 0.371172 10.2566 0.678677 10.4644 0.855168C10.7143 1.06631 10.8654 1.35974 10.8887 1.68132C10.9065 1.91736 10.8531 2.1469 10.7387 2.3483C9.27136 2.10576 7.76733 2.67421 6.82315 3.85767L6.57544 4.16843C6.30551 4.50733 6.28996 4.96859 6.53101 5.30641C6.29774 5.96256 6.22332 6.71725 6.14778 7.51092C6.04003 8.62725 5.92895 9.78255 5.38688 10.887C5.02032 11.633 4.58821 12.1852 4.10279 12.5263C3.90507 12.666 3.66514 12.7721 3.37189 12.8522C2.6021 13.0622 2.11001 13.5441 2.02115 14.1721C1.94784 14.6875 2.07002 15.1596 2.36328 15.5017C2.61987 15.7995 2.98755 15.9792 3.373 15.9933C3.47852 15.9976 3.58405 15.9987 3.69069 15.9987C5.81787 15.9987 8.00838 15.218 9.749 13.8332C11.2097 12.6692 13.0125 10.5459 13.4458 6.98144C13.4757 6.96737 13.5057 6.95329 13.5346 6.93597C13.8756 6.73566 14.0556 6.33503 13.9823 5.93874L13.9834 5.93983ZM7.61182 4.45644C8.37716 3.49711 9.67902 3.05967 10.852 3.36718C11.0275 3.41374 11.5141 3.63462 11.6218 3.68984C12.285 4.08397 12.7493 4.76178 12.8959 5.5522L12.9925 6.08383L12.3561 5.79798C11.7218 5.51322 10.9787 5.62258 10.4588 6.07625L9.92562 6.49637C9.90229 6.51477 9.87563 6.5191 9.84675 6.51044C9.81787 6.50178 9.79899 6.48337 9.79121 6.45522L9.56794 5.69837L9.55572 5.66156C9.36244 5.16024 8.88369 4.81917 8.33495 4.7921L7.38188 4.74554L7.61182 4.45752V4.45644ZM9.11585 13.0796C7.47519 14.3865 5.39688 15.0946 3.41076 15.0199C3.30857 15.0166 3.20304 14.9625 3.12862 14.8759C3.01643 14.7459 2.97533 14.5489 3.01087 14.3053C3.0542 13.9956 3.4252 13.8494 3.64181 13.7909C4.04503 13.6805 4.39716 13.5213 4.68819 13.3167C5.31024 12.8793 5.84898 12.2025 6.28885 11.3082C6.90757 10.0478 7.03309 8.74852 7.14306 7.60295C7.21193 6.884 7.27525 6.24733 7.44409 5.72327L8.28608 5.76442C8.43159 5.772 8.55822 5.85862 8.61487 5.98855L8.83148 6.72266C8.93256 7.06374 9.20027 7.33118 9.54684 7.43837C9.65458 7.47194 9.76455 7.48818 9.87341 7.4871C10.1178 7.4871 10.3577 7.40589 10.5532 7.25214L11.0975 6.82336L11.1208 6.80387C11.343 6.60573 11.664 6.55808 11.9373 6.68044L12.4483 6.90998C12.0439 10.1258 10.4288 12.0336 9.11696 13.0785L9.11585 13.0796Z"
                          fill="currentColor"
                          stroke="none"
                          className="sc-iBPRYJ brBpOV"
                        ></path>
                      </svg>
                      <svg
                        className="sc-jSgupP ckDfJz"
                        height="18"
                        width="18"
                        viewBox="0 0 16 16"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          d="M13.9834 5.93983L13.879 5.37787C13.6812 4.30918 13.0436 3.38775 12.1306 2.8507C12.0895 2.82688 11.9106 2.73918 11.7018 2.64822C11.8484 2.32664 11.9128 1.97258 11.8862 1.61202C11.844 1.03058 11.5718 0.500021 11.1197 0.118889C10.9109 -0.0576019 10.5954 -0.0359466 10.4144 0.167613C10.2333 0.371172 10.2566 0.678677 10.4644 0.855168C10.7143 1.06631 10.8654 1.35974 10.8887 1.68132C10.9065 1.91736 10.8531 2.1469 10.7387 2.3483C9.27136 2.10576 7.76733 2.67421 6.82315 3.85767L6.57544 4.16843C6.30551 4.50733 6.28996 4.96859 6.53101 5.30641C6.29774 5.96256 6.22332 6.71725 6.14778 7.51092C6.04003 8.62725 5.92895 9.78255 5.38688 10.887C5.02032 11.633 4.58821 12.1852 4.10279 12.5263C3.90507 12.666 3.66514 12.7721 3.37189 12.8522C2.6021 13.0622 2.11001 13.5441 2.02115 14.1721C1.94784 14.6875 2.07002 15.1596 2.36328 15.5017C2.61987 15.7995 2.98755 15.9792 3.373 15.9933C3.47852 15.9976 3.58405 15.9987 3.69069 15.9987C5.81787 15.9987 8.00838 15.218 9.749 13.8332C11.2097 12.6692 13.0125 10.5459 13.4458 6.98144C13.4757 6.96737 13.5057 6.95329 13.5346 6.93597C13.8756 6.73566 14.0556 6.33503 13.9823 5.93874L13.9834 5.93983ZM7.61182 4.45644C8.37716 3.49711 9.67902 3.05967 10.852 3.36718C11.0275 3.41374 11.5141 3.63462 11.6218 3.68984C12.285 4.08397 12.7493 4.76178 12.8959 5.5522L12.9925 6.08383L12.3561 5.79798C11.7218 5.51322 10.9787 5.62258 10.4588 6.07625L9.92562 6.49637C9.90229 6.51477 9.87563 6.5191 9.84675 6.51044C9.81787 6.50178 9.79899 6.48337 9.79121 6.45522L9.56794 5.69837L9.55572 5.66156C9.36244 5.16024 8.88369 4.81917 8.33495 4.7921L7.38188 4.74554L7.61182 4.45752V4.45644ZM9.11585 13.0796C7.47519 14.3865 5.39688 15.0946 3.41076 15.0199C3.30857 15.0166 3.20304 14.9625 3.12862 14.8759C3.01643 14.7459 2.97533 14.5489 3.01087 14.3053C3.0542 13.9956 3.4252 13.8494 3.64181 13.7909C4.04503 13.6805 4.39716 13.5213 4.68819 13.3167C5.31024 12.8793 5.84898 12.2025 6.28885 11.3082C6.90757 10.0478 7.03309 8.74852 7.14306 7.60295C7.21193 6.884 7.27525 6.24733 7.44409 5.72327L8.28608 5.76442C8.43159 5.772 8.55822 5.85862 8.61487 5.98855L8.83148 6.72266C8.93256 7.06374 9.20027 7.33118 9.54684 7.43837C9.65458 7.47194 9.76455 7.48818 9.87341 7.4871C10.1178 7.4871 10.3577 7.40589 10.5532 7.25214L11.0975 6.82336L11.1208 6.80387C11.343 6.60573 11.664 6.55808 11.9373 6.68044L12.4483 6.90998C12.0439 10.1258 10.4288 12.0336 9.11696 13.0785L9.11585 13.0796Z"
                          fill="currentColor"
                          stroke="none"
                          className="sc-iBPRYJ brBpOV"
                        ></path>
                      </svg>
                      <svg
                        className="sc-jSgupP ckDfJz"
                        height="18"
                        width="18"
                        viewBox="0 0 16 16"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          d="M13.9834 5.93983L13.879 5.37787C13.6812 4.30918 13.0436 3.38775 12.1306 2.8507C12.0895 2.82688 11.9106 2.73918 11.7018 2.64822C11.8484 2.32664 11.9128 1.97258 11.8862 1.61202C11.844 1.03058 11.5718 0.500021 11.1197 0.118889C10.9109 -0.0576019 10.5954 -0.0359466 10.4144 0.167613C10.2333 0.371172 10.2566 0.678677 10.4644 0.855168C10.7143 1.06631 10.8654 1.35974 10.8887 1.68132C10.9065 1.91736 10.8531 2.1469 10.7387 2.3483C9.27136 2.10576 7.76733 2.67421 6.82315 3.85767L6.57544 4.16843C6.30551 4.50733 6.28996 4.96859 6.53101 5.30641C6.29774 5.96256 6.22332 6.71725 6.14778 7.51092C6.04003 8.62725 5.92895 9.78255 5.38688 10.887C5.02032 11.633 4.58821 12.1852 4.10279 12.5263C3.90507 12.666 3.66514 12.7721 3.37189 12.8522C2.6021 13.0622 2.11001 13.5441 2.02115 14.1721C1.94784 14.6875 2.07002 15.1596 2.36328 15.5017C2.61987 15.7995 2.98755 15.9792 3.373 15.9933C3.47852 15.9976 3.58405 15.9987 3.69069 15.9987C5.81787 15.9987 8.00838 15.218 9.749 13.8332C11.2097 12.6692 13.0125 10.5459 13.4458 6.98144C13.4757 6.96737 13.5057 6.95329 13.5346 6.93597C13.8756 6.73566 14.0556 6.33503 13.9823 5.93874L13.9834 5.93983ZM7.61182 4.45644C8.37716 3.49711 9.67902 3.05967 10.852 3.36718C11.0275 3.41374 11.5141 3.63462 11.6218 3.68984C12.285 4.08397 12.7493 4.76178 12.8959 5.5522L12.9925 6.08383L12.3561 5.79798C11.7218 5.51322 10.9787 5.62258 10.4588 6.07625L9.92562 6.49637C9.90229 6.51477 9.87563 6.5191 9.84675 6.51044C9.81787 6.50178 9.79899 6.48337 9.79121 6.45522L9.56794 5.69837L9.55572 5.66156C9.36244 5.16024 8.88369 4.81917 8.33495 4.7921L7.38188 4.74554L7.61182 4.45752V4.45644ZM9.11585 13.0796C7.47519 14.3865 5.39688 15.0946 3.41076 15.0199C3.30857 15.0166 3.20304 14.9625 3.12862 14.8759C3.01643 14.7459 2.97533 14.5489 3.01087 14.3053C3.0542 13.9956 3.4252 13.8494 3.64181 13.7909C4.04503 13.6805 4.39716 13.5213 4.68819 13.3167C5.31024 12.8793 5.84898 12.2025 6.28885 11.3082C6.90757 10.0478 7.03309 8.74852 7.14306 7.60295C7.21193 6.884 7.27525 6.24733 7.44409 5.72327L8.28608 5.76442C8.43159 5.772 8.55822 5.85862 8.61487 5.98855L8.83148 6.72266C8.93256 7.06374 9.20027 7.33118 9.54684 7.43837C9.65458 7.47194 9.76455 7.48818 9.87341 7.4871C10.1178 7.4871 10.3577 7.40589 10.5532 7.25214L11.0975 6.82336L11.1208 6.80387C11.343 6.60573 11.664 6.55808 11.9373 6.68044L12.4483 6.90998C12.0439 10.1258 10.4288 12.0336 9.11696 13.0785L9.11585 13.0796Z"
                          fill="currentColor"
                          stroke="none"
                          className="sc-iBPRYJ brBpOV"
                        ></path>
                      </svg>
                    </div>
                    <div className="">
                      {/* <h5 className="text-lg font-semibold mr-2 mb-1">Not Spicy</h5> */}
                      <h5 className="text-lg font-semibold mr-2 mb-1">
                        {dish?.spice_level?.name}
                      </h5>
                      <h6 className="text-[12px] text-primaryGreen mb-0 mr-3">
                        Shef recommend
                      </h6>
                    </div>
                    <span className="text-base font-medium mr-2"></span>
                  </div>
                  {/* <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="spice_radio" id="spice_1" value="" /> */}
                </label>
                {/* 2 Spice Box */}
                {/* <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 prtionRadio" htmlFor="spice_2">
                                    <div className='flex items-center gap-x-3 '>
                                        <div className='flex items-center mb-2 border-r pr-3'>
                                            <svg className="sc-jSgupP ckDfJz" height="16" width="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                <path d="M13.9853 5.93177L13.8789 5.3621C13.6831 4.30949 13.0527 3.40285 12.1507 2.8749C12.1043 2.84746 11.8667 2.7344 11.6177 2.63013C12.0545 1.79045 11.8701 0.737833 11.105 0.0946277C10.9398 -0.04477 10.6896 -0.0272081 10.5459 0.133044C10.4022 0.293297 10.4203 0.535871 10.5855 0.675268C11.105 1.11102 11.2023 1.84423 10.8481 2.39195C9.37002 2.11974 7.84328 2.68172 6.89034 3.87044L6.63796 4.18546C6.5825 4.25461 6.5395 4.32924 6.50781 4.40608C6.44556 4.55974 6.5361 4.73427 6.69794 4.78476C6.90392 4.84952 7.12801 4.90549 7.31249 4.92415L8.34352 4.97464C8.86639 4.99989 9.32362 5.32369 9.50696 5.80005L9.51715 5.82859L9.75029 6.61558C9.77858 6.71218 9.85894 6.7462 9.89176 6.75718C9.92458 6.76706 10.0106 6.78352 10.0909 6.72096L10.6512 6.28191C11.1571 5.84067 11.8814 5.7342 12.4993 6.0108L13.1965 6.32252C13.321 6.36972 13.4545 6.41692 13.5858 6.46192C13.7612 6.52229 13.9548 6.41692 13.9853 6.2391C14.0023 6.14032 14.0023 6.03714 13.9831 5.93396L13.9853 5.93177Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV" ></path><path d="M12.8784 7.0228L12.17 6.70559C11.8384 6.55631 11.4479 6.61558 11.1785 6.85486L11.1604 6.87023L10.5912 7.31586C10.4089 7.45855 10.186 7.53319 9.95964 7.53319C9.85778 7.53319 9.75593 7.51782 9.6552 7.48709C9.33265 7.38831 9.08366 7.14134 8.99086 6.82523L8.76224 6.0547C8.68642 5.87249 8.50873 5.74956 8.30502 5.73968L7.24569 5.68809C7.05895 5.67053 6.79865 5.61345 6.53608 5.53662C6.36066 6.13482 6.29389 6.80986 6.22598 7.51563C6.12073 8.60447 6.00076 9.83819 5.44054 10.9742C5.05914 11.7481 4.60644 12.321 4.09715 12.6777C3.88438 12.827 3.6286 12.9401 3.31624 13.0257C2.5772 13.2265 2.10526 13.681 2.02151 14.2726C1.9321 14.9026 2.14827 15.3065 2.34519 15.5348C2.58626 15.8136 2.93144 15.9805 3.29134 15.9936C3.39773 15.998 3.50411 15.9991 3.6105 15.9991C5.75178 15.9991 7.9587 15.2176 9.71066 13.828C11.1469 12.6898 12.9113 10.6329 13.4013 7.21159C13.2553 7.1622 13.0889 7.10183 12.8999 7.03048L12.8784 7.0217V7.0228Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV"></path>
                                            </svg>
                                            <svg className="sc-jSgupP ckDfJz" height="18" width="18" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none" >
                                                <path d="M13.9834 5.93983L13.879 5.37787C13.6812 4.30918 13.0436 3.38775 12.1306 2.8507C12.0895 2.82688 11.9106 2.73918 11.7018 2.64822C11.8484 2.32664 11.9128 1.97258 11.8862 1.61202C11.844 1.03058 11.5718 0.500021 11.1197 0.118889C10.9109 -0.0576019 10.5954 -0.0359466 10.4144 0.167613C10.2333 0.371172 10.2566 0.678677 10.4644 0.855168C10.7143 1.06631 10.8654 1.35974 10.8887 1.68132C10.9065 1.91736 10.8531 2.1469 10.7387 2.3483C9.27136 2.10576 7.76733 2.67421 6.82315 3.85767L6.57544 4.16843C6.30551 4.50733 6.28996 4.96859 6.53101 5.30641C6.29774 5.96256 6.22332 6.71725 6.14778 7.51092C6.04003 8.62725 5.92895 9.78255 5.38688 10.887C5.02032 11.633 4.58821 12.1852 4.10279 12.5263C3.90507 12.666 3.66514 12.7721 3.37189 12.8522C2.6021 13.0622 2.11001 13.5441 2.02115 14.1721C1.94784 14.6875 2.07002 15.1596 2.36328 15.5017C2.61987 15.7995 2.98755 15.9792 3.373 15.9933C3.47852 15.9976 3.58405 15.9987 3.69069 15.9987C5.81787 15.9987 8.00838 15.218 9.749 13.8332C11.2097 12.6692 13.0125 10.5459 13.4458 6.98144C13.4757 6.96737 13.5057 6.95329 13.5346 6.93597C13.8756 6.73566 14.0556 6.33503 13.9823 5.93874L13.9834 5.93983ZM7.61182 4.45644C8.37716 3.49711 9.67902 3.05967 10.852 3.36718C11.0275 3.41374 11.5141 3.63462 11.6218 3.68984C12.285 4.08397 12.7493 4.76178 12.8959 5.5522L12.9925 6.08383L12.3561 5.79798C11.7218 5.51322 10.9787 5.62258 10.4588 6.07625L9.92562 6.49637C9.90229 6.51477 9.87563 6.5191 9.84675 6.51044C9.81787 6.50178 9.79899 6.48337 9.79121 6.45522L9.56794 5.69837L9.55572 5.66156C9.36244 5.16024 8.88369 4.81917 8.33495 4.7921L7.38188 4.74554L7.61182 4.45752V4.45644ZM9.11585 13.0796C7.47519 14.3865 5.39688 15.0946 3.41076 15.0199C3.30857 15.0166 3.20304 14.9625 3.12862 14.8759C3.01643 14.7459 2.97533 14.5489 3.01087 14.3053C3.0542 13.9956 3.4252 13.8494 3.64181 13.7909C4.04503 13.6805 4.39716 13.5213 4.68819 13.3167C5.31024 12.8793 5.84898 12.2025 6.28885 11.3082C6.90757 10.0478 7.03309 8.74852 7.14306 7.60295C7.21193 6.884 7.27525 6.24733 7.44409 5.72327L8.28608 5.76442C8.43159 5.772 8.55822 5.85862 8.61487 5.98855L8.83148 6.72266C8.93256 7.06374 9.20027 7.33118 9.54684 7.43837C9.65458 7.47194 9.76455 7.48818 9.87341 7.4871C10.1178 7.4871 10.3577 7.40589 10.5532 7.25214L11.0975 6.82336L11.1208 6.80387C11.343 6.60573 11.664 6.55808 11.9373 6.68044L12.4483 6.90998C12.0439 10.1258 10.4288 12.0336 9.11696 13.0785L9.11585 13.0796Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV" ></path>
                                            </svg>
                                            <svg className="sc-jSgupP ckDfJz" height="18" width="18" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none" >
                                                <path d="M13.9834 5.93983L13.879 5.37787C13.6812 4.30918 13.0436 3.38775 12.1306 2.8507C12.0895 2.82688 11.9106 2.73918 11.7018 2.64822C11.8484 2.32664 11.9128 1.97258 11.8862 1.61202C11.844 1.03058 11.5718 0.500021 11.1197 0.118889C10.9109 -0.0576019 10.5954 -0.0359466 10.4144 0.167613C10.2333 0.371172 10.2566 0.678677 10.4644 0.855168C10.7143 1.06631 10.8654 1.35974 10.8887 1.68132C10.9065 1.91736 10.8531 2.1469 10.7387 2.3483C9.27136 2.10576 7.76733 2.67421 6.82315 3.85767L6.57544 4.16843C6.30551 4.50733 6.28996 4.96859 6.53101 5.30641C6.29774 5.96256 6.22332 6.71725 6.14778 7.51092C6.04003 8.62725 5.92895 9.78255 5.38688 10.887C5.02032 11.633 4.58821 12.1852 4.10279 12.5263C3.90507 12.666 3.66514 12.7721 3.37189 12.8522C2.6021 13.0622 2.11001 13.5441 2.02115 14.1721C1.94784 14.6875 2.07002 15.1596 2.36328 15.5017C2.61987 15.7995 2.98755 15.9792 3.373 15.9933C3.47852 15.9976 3.58405 15.9987 3.69069 15.9987C5.81787 15.9987 8.00838 15.218 9.749 13.8332C11.2097 12.6692 13.0125 10.5459 13.4458 6.98144C13.4757 6.96737 13.5057 6.95329 13.5346 6.93597C13.8756 6.73566 14.0556 6.33503 13.9823 5.93874L13.9834 5.93983ZM7.61182 4.45644C8.37716 3.49711 9.67902 3.05967 10.852 3.36718C11.0275 3.41374 11.5141 3.63462 11.6218 3.68984C12.285 4.08397 12.7493 4.76178 12.8959 5.5522L12.9925 6.08383L12.3561 5.79798C11.7218 5.51322 10.9787 5.62258 10.4588 6.07625L9.92562 6.49637C9.90229 6.51477 9.87563 6.5191 9.84675 6.51044C9.81787 6.50178 9.79899 6.48337 9.79121 6.45522L9.56794 5.69837L9.55572 5.66156C9.36244 5.16024 8.88369 4.81917 8.33495 4.7921L7.38188 4.74554L7.61182 4.45752V4.45644ZM9.11585 13.0796C7.47519 14.3865 5.39688 15.0946 3.41076 15.0199C3.30857 15.0166 3.20304 14.9625 3.12862 14.8759C3.01643 14.7459 2.97533 14.5489 3.01087 14.3053C3.0542 13.9956 3.4252 13.8494 3.64181 13.7909C4.04503 13.6805 4.39716 13.5213 4.68819 13.3167C5.31024 12.8793 5.84898 12.2025 6.28885 11.3082C6.90757 10.0478 7.03309 8.74852 7.14306 7.60295C7.21193 6.884 7.27525 6.24733 7.44409 5.72327L8.28608 5.76442C8.43159 5.772 8.55822 5.85862 8.61487 5.98855L8.83148 6.72266C8.93256 7.06374 9.20027 7.33118 9.54684 7.43837C9.65458 7.47194 9.76455 7.48818 9.87341 7.4871C10.1178 7.4871 10.3577 7.40589 10.5532 7.25214L11.0975 6.82336L11.1208 6.80387C11.343 6.60573 11.664 6.55808 11.9373 6.68044L12.4483 6.90998C12.0439 10.1258 10.4288 12.0336 9.11696 13.0785L9.11585 13.0796Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV" ></path>
                                            </svg>
                                        </div>
                                        <div className=''>
                                            <h5 className="text-lg font-semibold mr-2 mb-1">Mild</h5>
                                        </div>
                                        <span className="text-base font-medium mr-2"></span>
                                    </div>
                                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="spice_radio" value="" id="spice_2" />
                                </label> */}
                {/* 3 Spice Box */}
                {/* <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 prtionRadio" htmlFor="spice_3">
                                    <div className='flex items-center gap-x-3 '>
                                        <div className='flex items-center mb-2 border-r pr-3'>
                                            <svg className="sc-jSgupP ckDfJz" height="16" width="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                <path d="M13.9853 5.93177L13.8789 5.3621C13.6831 4.30949 13.0527 3.40285 12.1507 2.8749C12.1043 2.84746 11.8667 2.7344 11.6177 2.63013C12.0545 1.79045 11.8701 0.737833 11.105 0.0946277C10.9398 -0.04477 10.6896 -0.0272081 10.5459 0.133044C10.4022 0.293297 10.4203 0.535871 10.5855 0.675268C11.105 1.11102 11.2023 1.84423 10.8481 2.39195C9.37002 2.11974 7.84328 2.68172 6.89034 3.87044L6.63796 4.18546C6.5825 4.25461 6.5395 4.32924 6.50781 4.40608C6.44556 4.55974 6.5361 4.73427 6.69794 4.78476C6.90392 4.84952 7.12801 4.90549 7.31249 4.92415L8.34352 4.97464C8.86639 4.99989 9.32362 5.32369 9.50696 5.80005L9.51715 5.82859L9.75029 6.61558C9.77858 6.71218 9.85894 6.7462 9.89176 6.75718C9.92458 6.76706 10.0106 6.78352 10.0909 6.72096L10.6512 6.28191C11.1571 5.84067 11.8814 5.7342 12.4993 6.0108L13.1965 6.32252C13.321 6.36972 13.4545 6.41692 13.5858 6.46192C13.7612 6.52229 13.9548 6.41692 13.9853 6.2391C14.0023 6.14032 14.0023 6.03714 13.9831 5.93396L13.9853 5.93177Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV" ></path><path d="M12.8784 7.0228L12.17 6.70559C11.8384 6.55631 11.4479 6.61558 11.1785 6.85486L11.1604 6.87023L10.5912 7.31586C10.4089 7.45855 10.186 7.53319 9.95964 7.53319C9.85778 7.53319 9.75593 7.51782 9.6552 7.48709C9.33265 7.38831 9.08366 7.14134 8.99086 6.82523L8.76224 6.0547C8.68642 5.87249 8.50873 5.74956 8.30502 5.73968L7.24569 5.68809C7.05895 5.67053 6.79865 5.61345 6.53608 5.53662C6.36066 6.13482 6.29389 6.80986 6.22598 7.51563C6.12073 8.60447 6.00076 9.83819 5.44054 10.9742C5.05914 11.7481 4.60644 12.321 4.09715 12.6777C3.88438 12.827 3.6286 12.9401 3.31624 13.0257C2.5772 13.2265 2.10526 13.681 2.02151 14.2726C1.9321 14.9026 2.14827 15.3065 2.34519 15.5348C2.58626 15.8136 2.93144 15.9805 3.29134 15.9936C3.39773 15.998 3.50411 15.9991 3.6105 15.9991C5.75178 15.9991 7.9587 15.2176 9.71066 13.828C11.1469 12.6898 12.9113 10.6329 13.4013 7.21159C13.2553 7.1622 13.0889 7.10183 12.8999 7.03048L12.8784 7.0217V7.0228Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV"></path>
                                            </svg>
                                            <svg className="sc-jSgupP ckDfJz" height="16" width="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                <path d="M13.9853 5.93177L13.8789 5.3621C13.6831 4.30949 13.0527 3.40285 12.1507 2.8749C12.1043 2.84746 11.8667 2.7344 11.6177 2.63013C12.0545 1.79045 11.8701 0.737833 11.105 0.0946277C10.9398 -0.04477 10.6896 -0.0272081 10.5459 0.133044C10.4022 0.293297 10.4203 0.535871 10.5855 0.675268C11.105 1.11102 11.2023 1.84423 10.8481 2.39195C9.37002 2.11974 7.84328 2.68172 6.89034 3.87044L6.63796 4.18546C6.5825 4.25461 6.5395 4.32924 6.50781 4.40608C6.44556 4.55974 6.5361 4.73427 6.69794 4.78476C6.90392 4.84952 7.12801 4.90549 7.31249 4.92415L8.34352 4.97464C8.86639 4.99989 9.32362 5.32369 9.50696 5.80005L9.51715 5.82859L9.75029 6.61558C9.77858 6.71218 9.85894 6.7462 9.89176 6.75718C9.92458 6.76706 10.0106 6.78352 10.0909 6.72096L10.6512 6.28191C11.1571 5.84067 11.8814 5.7342 12.4993 6.0108L13.1965 6.32252C13.321 6.36972 13.4545 6.41692 13.5858 6.46192C13.7612 6.52229 13.9548 6.41692 13.9853 6.2391C14.0023 6.14032 14.0023 6.03714 13.9831 5.93396L13.9853 5.93177Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV" ></path><path d="M12.8784 7.0228L12.17 6.70559C11.8384 6.55631 11.4479 6.61558 11.1785 6.85486L11.1604 6.87023L10.5912 7.31586C10.4089 7.45855 10.186 7.53319 9.95964 7.53319C9.85778 7.53319 9.75593 7.51782 9.6552 7.48709C9.33265 7.38831 9.08366 7.14134 8.99086 6.82523L8.76224 6.0547C8.68642 5.87249 8.50873 5.74956 8.30502 5.73968L7.24569 5.68809C7.05895 5.67053 6.79865 5.61345 6.53608 5.53662C6.36066 6.13482 6.29389 6.80986 6.22598 7.51563C6.12073 8.60447 6.00076 9.83819 5.44054 10.9742C5.05914 11.7481 4.60644 12.321 4.09715 12.6777C3.88438 12.827 3.6286 12.9401 3.31624 13.0257C2.5772 13.2265 2.10526 13.681 2.02151 14.2726C1.9321 14.9026 2.14827 15.3065 2.34519 15.5348C2.58626 15.8136 2.93144 15.9805 3.29134 15.9936C3.39773 15.998 3.50411 15.9991 3.6105 15.9991C5.75178 15.9991 7.9587 15.2176 9.71066 13.828C11.1469 12.6898 12.9113 10.6329 13.4013 7.21159C13.2553 7.1622 13.0889 7.10183 12.8999 7.03048L12.8784 7.0217V7.0228Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV"></path>
                                            </svg>
                                            <svg className="sc-jSgupP ckDfJz" height="18" width="18" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none" >
                                                <path d="M13.9834 5.93983L13.879 5.37787C13.6812 4.30918 13.0436 3.38775 12.1306 2.8507C12.0895 2.82688 11.9106 2.73918 11.7018 2.64822C11.8484 2.32664 11.9128 1.97258 11.8862 1.61202C11.844 1.03058 11.5718 0.500021 11.1197 0.118889C10.9109 -0.0576019 10.5954 -0.0359466 10.4144 0.167613C10.2333 0.371172 10.2566 0.678677 10.4644 0.855168C10.7143 1.06631 10.8654 1.35974 10.8887 1.68132C10.9065 1.91736 10.8531 2.1469 10.7387 2.3483C9.27136 2.10576 7.76733 2.67421 6.82315 3.85767L6.57544 4.16843C6.30551 4.50733 6.28996 4.96859 6.53101 5.30641C6.29774 5.96256 6.22332 6.71725 6.14778 7.51092C6.04003 8.62725 5.92895 9.78255 5.38688 10.887C5.02032 11.633 4.58821 12.1852 4.10279 12.5263C3.90507 12.666 3.66514 12.7721 3.37189 12.8522C2.6021 13.0622 2.11001 13.5441 2.02115 14.1721C1.94784 14.6875 2.07002 15.1596 2.36328 15.5017C2.61987 15.7995 2.98755 15.9792 3.373 15.9933C3.47852 15.9976 3.58405 15.9987 3.69069 15.9987C5.81787 15.9987 8.00838 15.218 9.749 13.8332C11.2097 12.6692 13.0125 10.5459 13.4458 6.98144C13.4757 6.96737 13.5057 6.95329 13.5346 6.93597C13.8756 6.73566 14.0556 6.33503 13.9823 5.93874L13.9834 5.93983ZM7.61182 4.45644C8.37716 3.49711 9.67902 3.05967 10.852 3.36718C11.0275 3.41374 11.5141 3.63462 11.6218 3.68984C12.285 4.08397 12.7493 4.76178 12.8959 5.5522L12.9925 6.08383L12.3561 5.79798C11.7218 5.51322 10.9787 5.62258 10.4588 6.07625L9.92562 6.49637C9.90229 6.51477 9.87563 6.5191 9.84675 6.51044C9.81787 6.50178 9.79899 6.48337 9.79121 6.45522L9.56794 5.69837L9.55572 5.66156C9.36244 5.16024 8.88369 4.81917 8.33495 4.7921L7.38188 4.74554L7.61182 4.45752V4.45644ZM9.11585 13.0796C7.47519 14.3865 5.39688 15.0946 3.41076 15.0199C3.30857 15.0166 3.20304 14.9625 3.12862 14.8759C3.01643 14.7459 2.97533 14.5489 3.01087 14.3053C3.0542 13.9956 3.4252 13.8494 3.64181 13.7909C4.04503 13.6805 4.39716 13.5213 4.68819 13.3167C5.31024 12.8793 5.84898 12.2025 6.28885 11.3082C6.90757 10.0478 7.03309 8.74852 7.14306 7.60295C7.21193 6.884 7.27525 6.24733 7.44409 5.72327L8.28608 5.76442C8.43159 5.772 8.55822 5.85862 8.61487 5.98855L8.83148 6.72266C8.93256 7.06374 9.20027 7.33118 9.54684 7.43837C9.65458 7.47194 9.76455 7.48818 9.87341 7.4871C10.1178 7.4871 10.3577 7.40589 10.5532 7.25214L11.0975 6.82336L11.1208 6.80387C11.343 6.60573 11.664 6.55808 11.9373 6.68044L12.4483 6.90998C12.0439 10.1258 10.4288 12.0336 9.11696 13.0785L9.11585 13.0796Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV" ></path>
                                            </svg>
                                        </div>
                                        <div className=''>
                                            <h5 className="text-lg font-semibold mr-2 mb-1">Medium</h5>
                                        </div>
                                        <span className="text-base font-medium mr-2"></span>
                                    </div>
                                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="spice_radio" value="" id="spice_3" />
                                </label> */}
                {/* 4 Spice Box */}
                {/* <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 prtionRadio" htmlFor="spice_4">
                                    <div className='flex items-center gap-x-3 '>
                                        <div className='flex items-center mb-2 border-r pr-3'>
                                            <svg className="sc-jSgupP ckDfJz" height="16" width="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                <path d="M13.9853 5.93177L13.8789 5.3621C13.6831 4.30949 13.0527 3.40285 12.1507 2.8749C12.1043 2.84746 11.8667 2.7344 11.6177 2.63013C12.0545 1.79045 11.8701 0.737833 11.105 0.0946277C10.9398 -0.04477 10.6896 -0.0272081 10.5459 0.133044C10.4022 0.293297 10.4203 0.535871 10.5855 0.675268C11.105 1.11102 11.2023 1.84423 10.8481 2.39195C9.37002 2.11974 7.84328 2.68172 6.89034 3.87044L6.63796 4.18546C6.5825 4.25461 6.5395 4.32924 6.50781 4.40608C6.44556 4.55974 6.5361 4.73427 6.69794 4.78476C6.90392 4.84952 7.12801 4.90549 7.31249 4.92415L8.34352 4.97464C8.86639 4.99989 9.32362 5.32369 9.50696 5.80005L9.51715 5.82859L9.75029 6.61558C9.77858 6.71218 9.85894 6.7462 9.89176 6.75718C9.92458 6.76706 10.0106 6.78352 10.0909 6.72096L10.6512 6.28191C11.1571 5.84067 11.8814 5.7342 12.4993 6.0108L13.1965 6.32252C13.321 6.36972 13.4545 6.41692 13.5858 6.46192C13.7612 6.52229 13.9548 6.41692 13.9853 6.2391C14.0023 6.14032 14.0023 6.03714 13.9831 5.93396L13.9853 5.93177Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV" ></path><path d="M12.8784 7.0228L12.17 6.70559C11.8384 6.55631 11.4479 6.61558 11.1785 6.85486L11.1604 6.87023L10.5912 7.31586C10.4089 7.45855 10.186 7.53319 9.95964 7.53319C9.85778 7.53319 9.75593 7.51782 9.6552 7.48709C9.33265 7.38831 9.08366 7.14134 8.99086 6.82523L8.76224 6.0547C8.68642 5.87249 8.50873 5.74956 8.30502 5.73968L7.24569 5.68809C7.05895 5.67053 6.79865 5.61345 6.53608 5.53662C6.36066 6.13482 6.29389 6.80986 6.22598 7.51563C6.12073 8.60447 6.00076 9.83819 5.44054 10.9742C5.05914 11.7481 4.60644 12.321 4.09715 12.6777C3.88438 12.827 3.6286 12.9401 3.31624 13.0257C2.5772 13.2265 2.10526 13.681 2.02151 14.2726C1.9321 14.9026 2.14827 15.3065 2.34519 15.5348C2.58626 15.8136 2.93144 15.9805 3.29134 15.9936C3.39773 15.998 3.50411 15.9991 3.6105 15.9991C5.75178 15.9991 7.9587 15.2176 9.71066 13.828C11.1469 12.6898 12.9113 10.6329 13.4013 7.21159C13.2553 7.1622 13.0889 7.10183 12.8999 7.03048L12.8784 7.0217V7.0228Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV"></path>
                                            </svg>
                                            <svg className="sc-jSgupP ckDfJz" height="16" width="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                <path d="M13.9853 5.93177L13.8789 5.3621C13.6831 4.30949 13.0527 3.40285 12.1507 2.8749C12.1043 2.84746 11.8667 2.7344 11.6177 2.63013C12.0545 1.79045 11.8701 0.737833 11.105 0.0946277C10.9398 -0.04477 10.6896 -0.0272081 10.5459 0.133044C10.4022 0.293297 10.4203 0.535871 10.5855 0.675268C11.105 1.11102 11.2023 1.84423 10.8481 2.39195C9.37002 2.11974 7.84328 2.68172 6.89034 3.87044L6.63796 4.18546C6.5825 4.25461 6.5395 4.32924 6.50781 4.40608C6.44556 4.55974 6.5361 4.73427 6.69794 4.78476C6.90392 4.84952 7.12801 4.90549 7.31249 4.92415L8.34352 4.97464C8.86639 4.99989 9.32362 5.32369 9.50696 5.80005L9.51715 5.82859L9.75029 6.61558C9.77858 6.71218 9.85894 6.7462 9.89176 6.75718C9.92458 6.76706 10.0106 6.78352 10.0909 6.72096L10.6512 6.28191C11.1571 5.84067 11.8814 5.7342 12.4993 6.0108L13.1965 6.32252C13.321 6.36972 13.4545 6.41692 13.5858 6.46192C13.7612 6.52229 13.9548 6.41692 13.9853 6.2391C14.0023 6.14032 14.0023 6.03714 13.9831 5.93396L13.9853 5.93177Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV" ></path><path d="M12.8784 7.0228L12.17 6.70559C11.8384 6.55631 11.4479 6.61558 11.1785 6.85486L11.1604 6.87023L10.5912 7.31586C10.4089 7.45855 10.186 7.53319 9.95964 7.53319C9.85778 7.53319 9.75593 7.51782 9.6552 7.48709C9.33265 7.38831 9.08366 7.14134 8.99086 6.82523L8.76224 6.0547C8.68642 5.87249 8.50873 5.74956 8.30502 5.73968L7.24569 5.68809C7.05895 5.67053 6.79865 5.61345 6.53608 5.53662C6.36066 6.13482 6.29389 6.80986 6.22598 7.51563C6.12073 8.60447 6.00076 9.83819 5.44054 10.9742C5.05914 11.7481 4.60644 12.321 4.09715 12.6777C3.88438 12.827 3.6286 12.9401 3.31624 13.0257C2.5772 13.2265 2.10526 13.681 2.02151 14.2726C1.9321 14.9026 2.14827 15.3065 2.34519 15.5348C2.58626 15.8136 2.93144 15.9805 3.29134 15.9936C3.39773 15.998 3.50411 15.9991 3.6105 15.9991C5.75178 15.9991 7.9587 15.2176 9.71066 13.828C11.1469 12.6898 12.9113 10.6329 13.4013 7.21159C13.2553 7.1622 13.0889 7.10183 12.8999 7.03048L12.8784 7.0217V7.0228Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV"></path>
                                            </svg>
                                            <svg className="sc-jSgupP ckDfJz" height="16" width="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none">
                                                <path d="M13.9853 5.93177L13.8789 5.3621C13.6831 4.30949 13.0527 3.40285 12.1507 2.8749C12.1043 2.84746 11.8667 2.7344 11.6177 2.63013C12.0545 1.79045 11.8701 0.737833 11.105 0.0946277C10.9398 -0.04477 10.6896 -0.0272081 10.5459 0.133044C10.4022 0.293297 10.4203 0.535871 10.5855 0.675268C11.105 1.11102 11.2023 1.84423 10.8481 2.39195C9.37002 2.11974 7.84328 2.68172 6.89034 3.87044L6.63796 4.18546C6.5825 4.25461 6.5395 4.32924 6.50781 4.40608C6.44556 4.55974 6.5361 4.73427 6.69794 4.78476C6.90392 4.84952 7.12801 4.90549 7.31249 4.92415L8.34352 4.97464C8.86639 4.99989 9.32362 5.32369 9.50696 5.80005L9.51715 5.82859L9.75029 6.61558C9.77858 6.71218 9.85894 6.7462 9.89176 6.75718C9.92458 6.76706 10.0106 6.78352 10.0909 6.72096L10.6512 6.28191C11.1571 5.84067 11.8814 5.7342 12.4993 6.0108L13.1965 6.32252C13.321 6.36972 13.4545 6.41692 13.5858 6.46192C13.7612 6.52229 13.9548 6.41692 13.9853 6.2391C14.0023 6.14032 14.0023 6.03714 13.9831 5.93396L13.9853 5.93177Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV" ></path><path d="M12.8784 7.0228L12.17 6.70559C11.8384 6.55631 11.4479 6.61558 11.1785 6.85486L11.1604 6.87023L10.5912 7.31586C10.4089 7.45855 10.186 7.53319 9.95964 7.53319C9.85778 7.53319 9.75593 7.51782 9.6552 7.48709C9.33265 7.38831 9.08366 7.14134 8.99086 6.82523L8.76224 6.0547C8.68642 5.87249 8.50873 5.74956 8.30502 5.73968L7.24569 5.68809C7.05895 5.67053 6.79865 5.61345 6.53608 5.53662C6.36066 6.13482 6.29389 6.80986 6.22598 7.51563C6.12073 8.60447 6.00076 9.83819 5.44054 10.9742C5.05914 11.7481 4.60644 12.321 4.09715 12.6777C3.88438 12.827 3.6286 12.9401 3.31624 13.0257C2.5772 13.2265 2.10526 13.681 2.02151 14.2726C1.9321 14.9026 2.14827 15.3065 2.34519 15.5348C2.58626 15.8136 2.93144 15.9805 3.29134 15.9936C3.39773 15.998 3.50411 15.9991 3.6105 15.9991C5.75178 15.9991 7.9587 15.2176 9.71066 13.828C11.1469 12.6898 12.9113 10.6329 13.4013 7.21159C13.2553 7.1622 13.0889 7.10183 12.8999 7.03048L12.8784 7.0217V7.0228Z" fill="currentColor" stroke="none" className="sc-iBPRYJ brBpOV"></path>
                                            </svg>
                                        </div>
                                        <div className=''>
                                            <h5 className="text-lg font-semibold mr-2 mb-1">Hot</h5>
                                        </div>
                                        <span className="text-base font-medium mr-2"></span>
                                    </div>
                                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="spice_radio" value="" id="spice_4" />
                                </label>*/}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3">
              {/* <div className='lg:col-span-6 col-span-12 '> */}
              {/*****  DISH REVIEW SUMMARY *****/}
              {/* <div className='mt-4'>
                                    <h4 className='text-lg font-bold uppercase mb-2'>Dish Review Summary</h4>
                                    <ul className='block-inline'>
                                        <li className='inline-block mr-2 mb-2'>
                                            <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="rgba(0,0,0,1)">
                                                    <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                </svg>
                                                <h4 className='text-base mb-0 font-semibold'>
                                                    100% <span className='text-[12px] font-normal'>(230)</span>
                                                </h4>
                                            </div>
                                        </li>
                                        <li className='inline-block mr-2 mb-2'>
                                            <h4 className='bg-primaryLight px-2 py-2 text-xs rounded-[4px] inline-block text-base mb-0'>Good for lunch</h4>
                                        </li>
                                        <li className='inline-block mr-2 mb-2'>
                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block text-base mb-0'>Healthy</h4>
                                        </li>
                                        <li className='inline-block mr-2 mb-2'>
                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block text-base mb-0'>Authentic taste</h4>
                                        </li>
                                    </ul>
                                </div> 
                            </div>*/}
              <div className="lg:col-span-6 col-span-12 my-auto">
                {/*****  COUNT & ADD TO CART BUTTON SUMMARY *****/}
                <div className="grid grid-cols-12 mt-4 gap-3 ">
                  <div className="md:col-span-5 col-span-6 ">
                    <div className="flex items-center justify-between] bg-grayBg rounded-lg">
                      <button
                        disabled={quantity === 0}
                        onClick={handleDecrement}
                        className="w-[25%] disabled:opacity-60"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="rgba(0,0,0,1)"
                        >
                          <path d="M5 11V13H19V11H5Z"></path>
                        </svg>
                      </button>
                      <div className="flex items-center w-[50%]">
                        <input
                          className="text-center border-0 bg-transparent text-base px-1 focus:border-0"
                          placeholder="1"
                          value={
                            alreadyInCartCount > 0
                              ? alreadyInCartCount
                              : quantity
                          }
                          onChange={handleInputChange}
                        />
                      </div>
                      <button onClick={handleIncrement} className="w-[25%]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="rgba(0,0,0,1)"
                        >
                          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-7 col-span-6">
                    <button
                      onClick={handleAddToCart}
                      disabled={isFetching || quantity === 0}
                      className="text-lg font-bold bg-primary w-full h-full uppercase text-white rounded-[6px] disabled:opacity-60"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DishDetailSingle;
