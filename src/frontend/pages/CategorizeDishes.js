import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { handleGetCategorizeDishesOfCity } from "../../services/get_without_auth";
import isValidURL from "../../ValidateUrl";

const CategorizeDishes = () => {
  // eslint-disable-next-line
  const [categoryDishes, setCategoryDishes] = useState([]);
  // eslint-disable-next-line
  const { foodCategoryId } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if (foodCategoryId) {
      (async () => {
        try {
          setIsFetching(true);
          const city = JSON.parse(localStorage.getItem("region"));
          const foodTypeId = parseInt(foodCategoryId);
          const response = await handleGetCategorizeDishesOfCity(
            foodTypeId,
            city.id
          );
          // console.log("Categorize dish response ", response);
          // const categorize = response.filter(
          //   (dish) => dish.food_type_id === parseInt(foodCategoryId)
          // );
          // console.log("categorize dish", categoryDishes);
          setCategoryDishes(response);
        } catch (error) {
          console.error(error);
        } finally {
          setIsFetching(false);
        }
      })();
    }
  }, [foodCategoryId]);
  return (
    <>
      <Header />

      <div className="container mx-auto my-8 px-lg-2 px-4">
        <div className="mt-8">
          <h2 className="text-secondary font-bold text-2xl mb-0 border-b pb-2">
            Category Foods Plan
          </h2>
          <div className="grid grid-cols-12 gap-4 mt-6">
            {!isFetching && categoryDishes.length < 1 && (
              <div className=" col-span-12">
                <p className="font-semibold text-base sm:text-xl my-2 text-headGray">
                  No Dishes
                </p>
              </div>
            )}
            {/* Dishes  */}
            {categoryDishes.map((dish) => (
              <div
                key={dish.id}
                className="lg:col-span-3 sm:col-span-6 col-span-12"
              >
                <div className="product-box">
                  <div className="relative">
                    {/* <div className="absolute right-2 top-2 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="#ec2044"
                      >
                        <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
                      </svg> */}
                    {/******* When User Add To Wishlish Show This Icon  ******/}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ec2044">
                              <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path>
                          </svg> */}
                    {/* </div> */}
                    <img
                      src={
                        dish.logo && isValidURL(dish.logo)
                          ? dish.logo
                          : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                      }
                      className="img-fluid object-cover h-[200px] full-width"
                      alt="product-img"
                    />
                    {/* <img
                      src={
                        dish.logo && dish.logo[0] !== "p"
                          ? `${process.env.REACT_APP_baseURL}/addded_images/menus/${dish.logo}`
                          : "/media/frontend/img/restaurants/255x104/order-2.jpg"
                      }
                      className="img-fluid object-cover h-[200px] full-width"
                      alt="product-img"
                    /> */}
                    <Link to={`/shef-detail/${dish.user_id}`}>
                      <div className="flex items-center gap-x-3 bg-white absolute bottom-[-40px] p-2 w-[90%] left-[50%] translate-x-[-50%] rounded-lg shadow-lg">
                        <img
                          src={
                            dish.user?.profile_pice &&
                            isValidURL(dish.user?.profile_pice)
                              ? dish.user.profile_pice
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                          className="img-fluid object-cover h-[60px] w-[60px] object-top rounded-lg"
                          alt="Chef"
                        />
                        <div>
                          <h3 className="font-bold text-base leading-tight mb-1">
                            {/* Shef Kevin L. */}

                            {`${dish?.user?.first_name} ${dish?.user?.last_name}`}
                          </h3>
                          {/* <h4 className="font-medium text-[12px] leading-tight text-headGray mb-1">
                            New York . USA
                          </h4> */}
                          {/* <div className="inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="9"
                              height="9"
                              fill="#323232"
                            >
                              <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                            </svg>
                            <h4 className="text-[10px] leading-tight mb-0 font-semibold">
                              5.0{" "}
                              <span className="text-[10px] font-normal">
                                (87)
                              </span>
                            </h4>
                          </div> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="p-3 mt-12">
                    <h6 className="text-lg leading-tight text-secondary font-semibold mb-2">
                      <Link to={`/dish-detail-single/${dish.id}`}>
                        {" "}
                        {dish.name}
                      </Link>
                    </h6>
                    <div className="flex justify-between items-center gap-x-2">
                      {/* <div className="inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="10"
                          height="10"
                          fill="rgba(0,0,0,1)"
                        >
                          <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                        </svg>
                        <h4 className="text-xs mb-0 font-semibold">
                          100%{" "}
                          <span className="text-[12px] font-normal">(165)</span>
                        </h4>
                      </div> */}
                      <h4 className="text-xl text-secondary font-semibold mb-0">
                        {/* $ 30.99{" "} */}
                        {(
                          dish.chef_earning_fee +
                          dish.platform_price +
                          dish.delivery_price
                        ).toLocaleString("en-PK", {
                          style: "currency",
                          currency: "PKR",
                        })}
                        {dish?.auto_applied_discounts?.length > 0 && (
                          <span className="block text-[13px] -mt-2 text-green-700">
                            [
                            {` ${dish.auto_applied_discounts[0].discount} ${dish.auto_applied_discounts[0].discount_type} `}
                            <span className="text-[10px]">Off</span> ]
                          </span>
                        )}
                      </h4>
                    </div>
                    <div className="border-t pt-3 mt-2">
                      <div className="grid grid-cols-12 gap-x-1">
                        <div className="col-span-9">
                          {/* <h4 className='text-[10px] text-headGray mb-0'>Earliest Delivery: </h4>
                                                                    <h5 className='text-[12px] text-secondary leading-tight mb-0'>Tomorrow at 1:00 PM </h5> */}
                          <h4 className="text-[10px] text-headGray mb-0">
                            Availibility:{" "}
                          </h4>
                          <ul className="flex gap-1 flex-wrap">
                            {/* Days - starting from sunday */}
                            <div className="relative group">
                              <li
                                className={`text w-5 h-5 text-center ${
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
                                className={`text w-5 h-5 text-center ${
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
                                className={`text w-5 h-5 text-center ${
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
                                className={`text w-5 h-5 text-center ${
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
                                className={`text w-5 h-5 text-center ${
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
                                className={`text w-5 h-5 text-center ${
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
                                className={`text w-5 h-5 text-center ${
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
                        <div className="col-span-3 my-auto">
                          <Link
                            to={`/dish-detail-single/${dish.id}`}
                            className="bg-primary px-3 py-1 rounded-[4px] font-medium text-xs !text-white tracking-wide"
                          >
                            {" "}
                            Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Dishe end */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CategorizeDishes;
