import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import DateFilter from "../components/AllDishesDetail/DateFilter";
import AllCuisinesFilter from "../components/AllDishesDetail/AllCuisinesFilter";
import DietaryFilter from "../components/AllDishesDetail/DietaryFilter";
import Footer from "../components/Footer";
import {
  // handleGetAllChefs,
  handleGetAllDishesOfCity,
} from "../../services/get_without_auth";
import isValidURL from "../../ValidateUrl";

export const DishDetail = () => {
  const [filterActiveTab, setFilterActiveTab] = useState(null);

  const filterTabClick = (tabNumber) => {
    setFilterActiveTab(tabNumber);
  };
  const [isFetching, setIsFetching] = useState(false);
  // Dishes
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    const city = JSON.parse(localStorage.getItem("region"));
    const fetchAllDishes = async () => {
      try {
        setIsFetching(true);
        // const response = await handleGetAllDishes(authToken);
        const dishResponse = await handleGetAllDishesOfCity(city.id);
        console.log("reponse of dishes ", dishResponse);
        setDishes(dishResponse);
      } catch (error) {
        console.error("Error while fetching dishes \n", error);
      } finally{
        setIsFetching(false)
      }
    };

    fetchAllDishes();
  }, []);

  if(!isFetching && dishes?.length<1){
    return <>
      <Header />
        <div className="container mx-auto my-8 px-lg-2 px-4">
        <h2 className="text-secondary font-bold text-2xl mb-0 border-b pb-2">
            All Foods Plan
          </h2>

            <p className="font-semibold text-base sm:text-lg my-2 text-headGray">No dish found</p>
        </div>
      <Footer />

    </>
  }
  return (
    <>
      <Header />
      <div className="container mx-auto my-8 px-lg-2 px-4">
        {/* <div className='flex md:flex-row flex-col items-center border-b mb-3 pb-3 gap-4'>
                    <h2 className='font-bold text-2xl mb-0 uppercase tracking-wider'>Filters</h2>
                    <div className='flex md:flex-row flex-col items-center gap-3 w-full'>
                        <button onClick={() => filterTabClick(1)} className={`filterTab bg-grayBg uppercase rounded-md py-2 font-semibold text-base tracking-wider md:w-[150px] w-full ${filterActiveTab === 1 ? 'active' : ''}`}>
                            Date
                        </button>
                        <button onClick={() => filterTabClick(2)} className={`filterTab bg-grayBg uppercase rounded-md py-2 font-semibold text-base tracking-wider md:w-[150px] w-full ${filterActiveTab === 2 ? 'active' : ''}`}>
                            All cuisines
                        </button>
                        <button onClick={() => filterTabClick(3)} className={`filterTab bg-grayBg uppercase rounded-md py-2 font-semibold text-base tracking-wider md:w-[150px] w-full ${filterActiveTab === 3 ? 'active' : ''}`}>
                            Dietary (0)
                        </button>
                    </div>
                </div> */}

        <div>
          {filterActiveTab === 1 && (
            <div className="py-3 border-b">
              <DateFilter />
            </div>
          )}
          {filterActiveTab === 2 && (
            <div className="py-3 border-b">
              <AllCuisinesFilter />
            </div>
          )}
          {filterActiveTab === 3 && (
            <div className="py-3 border-b">
              <DietaryFilter />
            </div>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-secondary font-bold text-2xl mb-0 border-b pb-2">
            All Foods Plan
          </h2>
          <div className="grid grid-cols-12 gap-4 mt-6">
            {/* Dish Column #1 */}
            {dishes.map((item) => (
              <div
                key={item.id}
                className="lg:col-span-3 sm:col-span-6 col-span-12"
              >
                <div className="product-box">
                  <div className="relative">
                    <div className="absolute right-2 top-2 cursor-pointer">
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
                      src={`${
                        item.logo && isValidURL(item.logo)
                          ? item.logo
                          : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                      }`}
                      className="img-fluid object-cover h-[200px] full-width"
                      alt="product-img"
                    />
                    {/* <img src={`${item.logo? `${process.env.REACT_APP_baseURL}/addded_images/menus/${item.logo}`: "./media/frontend/img/restaurants/255x104/order-1.jpg"}`} className="img-fluid object-cover h-[200px] full-width" alt="product-img" /> */}
                    <Link to={`/shef-detail/${item.user_id}`}>
                      <div className="flex items-center gap-x-3 bg-white absolute bottom-[-40px] p-2 w-[90%] left-[50%] translate-x-[-50%] rounded-lg shadow-lg">
                        <img
                          src={
                            item.chef?.profile_pic &&
                            isValidURL(item.chef?.profile_pic)
                              ? item.chef?.profile_pic
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                          className="img-fluid object-cover h-[60px] w-[60px] object-top rounded-lg"
                          alt="Chef"
                        />
                        <div>
                          {/* <h3 className='font-bold text-base leading-tight mb-1'>Shef Razia M.</h3> */}
                          <h3 className="font-bold text-base leading-tight mb-1">
                            {`${item?.chef?.first_name} ${item?.chef?.last_name}`}
                          </h3>
                          {/* <h4 className='font-medium text-[12px] leading-tight text-headGray mb-1'>Middle Eastern . Afghan</h4> */}
                          {/* <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="9" height="9" fill="#323232">
                                                        <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                                    </svg>
                                                    <h4 className='text-[10px] leading-tight mb-0 font-semibold'>
                                                        4.5 <span className='text-[10px] font-normal'>(30)</span>
                                                    </h4>
                                                </div> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="p-3 mt-12">
                    <h6 className="text-lg leading-tight text-secondary font-semibold mb-2">
                      <Link to={`/dish-detail-single/${item.id}`}>
                        {" "}
                        {item.name}{" "}
                      </Link>
                    </h6>
                    <div className="flex justify-between items-center gap-x-2">
                      {/* <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="rgba(0,0,0,1)">
                                                <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                            </svg>
                                            <h4 className='text-xs mb-0 font-semibold'>
                                                100% <span className='text-[12px] font-normal'>(230)</span>
                                            </h4>
                                        </div> */}
                      {/* <h4 className='text-xl text-secondary font-semibold mb-0'>$ 12.99 </h4> */}
                      <h4 className="text-xl text-secondary font-semibold mb-0">
                        {(
                          item.chef_earning_fee +
                          item.platform_price +
                          item.delivery_price
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                        {item?.auto_applied_discounts?.length > 0 && (
                          <span className="block text-[13px] -mt-2 text-green-700">
                            [
                            {` ${item.auto_applied_discounts[0].discount} ${item.auto_applied_discounts[0].discount_type} `}
                            <span className="text-[10px]">Off</span> ]
                          </span>
                        )}
                      </h4>
                    </div>
                    {/* <div className='border-t pt-3 mt-2'>
                                        <div className='grid grid-cols-12 gap-x-2'>
                                            <div className='col-span-8'>
                                                <h4 className='text-[10px] text-headGray mb-0'>Earliest Delivery: </h4>
                                                <h5 className='text-[12px] text-secondary leading-tight mb-0'>Tomorrow at 1:00 PM </h5>
                                            </div>
                                            <div className='col-span-4 text-right my-auto'>
                                                <Link to={`/dish-detail-single/${item.id}`} className='bg-primary px-3 py-1 rounded-[4px] font-medium text-xs !text-white tracking-wide'> Detail</Link>
                                            </div>
                                        </div>
                                    </div> */}
                  </div>
                </div>
              </div>
            ))}
            {/* Dish Column #2 */}
            {/* <div className='lg:col-span-3 sm:col-span-6 col-span-12'>
                            <div className="product-box">
                                <div className="relative">
                                    <div className='absolute right-2 top-2 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ec2044">
                                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
                                        </svg>
                                        {/******* When User Add To Wishlish Show This Icon  ******/}
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ec2044">
                                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path>
                                        </svg> */}
            {/*</div>
                                    <img src="./media/frontend/img/restaurants/255x104/order-2.jpg" className="img-fluid object-cover h-[200px] full-width" alt="product-img" />
                                    <Link to="/shef-detail">
                                        <div className='flex items-center gap-x-3 bg-white absolute bottom-[-40px] p-2 w-[90%] left-[50%] translate-x-[-50%] rounded-lg shadow-lg'>
                                            <img src="./media/frontend/img/banner/chef-5.webp" className="img-fluid object-cover h-[60px] w-[60px] object-top rounded-lg" alt="Chef" />
                                            <div>
                                                <h3 className='font-bold text-base leading-tight mb-1'>Shef Kevin L.</h3>
                                                <h4 className='font-medium text-[12px] leading-tight text-headGray mb-1'>New York . USA</h4>
                                                <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="9" height="9" fill="#323232">
                                                        <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                                    </svg>
                                                    <h4 className='text-[10px] leading-tight mb-0 font-semibold'>
                                                        5.0 <span className='text-[10px] font-normal'>(87)</span>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-3 mt-12">
                                    <h6 className="text-lg leading-tight text-secondary font-semibold mb-2">
                                        <Link to='/dish-detail-single'> Mixed Vegetable</Link>
                                    </h6>
                                    <div className='flex justify-between items-center gap-x-2'>
                                        <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="rgba(0,0,0,1)">
                                                <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                            </svg>
                                            <h4 className='text-xs mb-0 font-semibold'>
                                                100% <span className='text-[12px] font-normal'>(165)</span>
                                            </h4>
                                        </div>
                                        <h4 className='text-xl text-secondary font-semibold mb-0'>$ 30.99 </h4>
                                    </div>
                                    <div className='border-t pt-3 mt-2'>
                                        <div className='grid grid-cols-12 gap-x-2'>
                                            <div className='col-span-8'>
                                                <h4 className='text-[10px] text-headGray mb-0'>Earliest Delivery: </h4>
                                                <h5 className='text-[12px] text-secondary leading-tight mb-0'>21-2-2024 at 2:00 PM </h5>
                                            </div>
                                            <div className='col-span-4 text-right my-auto'>
                                                <Link to='/dish-detail-single' className='bg-primary px-3 py-1 rounded-[4px] font-medium text-xs !text-white tracking-wide'> Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
            {/* Dish Column #3 */}
            {/* <div className='lg:col-span-3 sm:col-span-6 col-span-12'>
                            <div className="product-box">
                                <div className="relative">
                                    <div className='absolute right-2 top-2 cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ec2044">
                                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
                                        </svg> */}
            {/******* When User Add To Wishlish Show This Icon  ******/}
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ec2044">
                                            <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path>
                                        </svg> */}
            {/* </div>
                                    <img src="./media/frontend/img/restaurants/255x104/order-3.jpg" className="img-fluid object-cover h-[200px] full-width" alt="product-img" />
                                    <Link to="/shef-detail">
                                        <div className='flex items-center gap-x-3 bg-white absolute bottom-[-40px] p-2 w-[90%] left-[50%] translate-x-[-50%] rounded-lg shadow-lg'>
                                            <img src="./media/frontend/img/banner/chef-4.webp" className="img-fluid object-cover h-[60px] w-[60px] object-top rounded-lg" alt="Chef" />
                                            <div>
                                                <h3 className='font-bold text-base leading-tight mb-1'>Shef Khudeja F.</h3>
                                                <h4 className='font-medium text-[12px] leading-tight text-headGray mb-1'>Middle Eastern . Pakistan</h4>
                                                <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="9" height="9" fill="#323232">
                                                        <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                                    </svg>
                                                    <h4 className='text-[10px] leading-tight mb-0 font-semibold'>
                                                        4.9 <span className='text-[10px] font-normal'>(87)</span>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-3 mt-12">
                                    <h6 className="text-lg leading-tight text-secondary font-semibold mb-2">
                                        <Link to='/dish-detail-single'> Chilli Chicken Pizza</Link>
                                    </h6>
                                    <div className='flex justify-between items-center gap-x-2'>
                                        <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="rgba(0,0,0,1)">
                                                <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                            </svg>
                                            <h4 className='text-xs mb-0 font-semibold'>
                                                100% <span className='text-[12px] font-normal'>(410)</span>
                                            </h4>
                                        </div>
                                        <h4 className='text-xl text-secondary font-semibold mb-0'>$ 17.99 </h4>
                                    </div>
                                    <div className='border-t pt-3 mt-2'>
                                        <div className='grid grid-cols-12 gap-x-2'>
                                            <div className='col-span-8'>
                                                <h4 className='text-[10px] text-headGray mb-0'>Earliest Delivery: </h4>
                                                <h5 className='text-[12px] text-secondary leading-tight mb-0'>Tomorrow at 1:00 PM </h5>
                                            </div>
                                            <div className='col-span-4 text-right my-auto'>
                                                <Link to='/dish-detail-single' className='bg-primary px-3 py-1 rounded-[4px] font-medium text-xs !text-white tracking-wide'> Detail</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default DishDetail;
