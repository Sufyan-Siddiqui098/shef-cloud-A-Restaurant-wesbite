import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { handleGetPopularChefWithDishes } from "../../../services/get_without_auth";
import isValidURL from "../../../ValidateUrl";

const MostLoveChef = () => {
  const [mostLoveChef, setMostLovedChef] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const city = JSON.parse(localStorage.getItem("region"));
        if (!city?.id) return;
        const lovedChef = await handleGetPopularChefWithDishes(city.id);
        setMostLovedChef(lovedChef);
        console.log("loved chef response ", lovedChef);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (mostLoveChef?.length < 1) return <div></div>;

  return (
    <>
      <div className="mostLoveChef py-16">
        <div>
          <div className="text-center mb-8 px-2">
            <h1 className="font-semibold text-3xl uppercase tracking-wider tracking-widest">
              Most loved shefs
            </h1>
            <div className="w-[60px] h-[2px] bg-primary my-4 mx-auto"></div>
            <h3 className="alexBrush text-3xl capitalize text-headGray">
              Culinary Specialties
            </h3>
          </div>
          <Swiper
            // slidesPerView={2}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              769: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={30}
            centeredSlides={true}
            mousewheel={true}
            // Loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="loveChef"
          >
            {mostLoveChef?.map((chef, index) => (
              <SwiperSlide key={index}>
                <div>
                  <div className="chefSlidInner p-5">
                    <div className="grid grid-cols-12 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4">
                      <div className="md:col-span-5 col-span-12 relative">
                        <img
                          src={
                            chef.profile_pic
                              ? chef.profile_pic
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                          className="object-top rounded-lg w-full object-cover h-[190px]"
                          alt="Love Local Chef"
                        />
                        {/* <img
                          src={
                            chef.profile_pic && isValidURL(chef.profile_pic)
                              ? chef.profile_pic
                              : "./media/frontend/img/banner/female-chef.png"
                          }
                          className="object-top rounded-lg w-full object-cover h-[190px]"
                          alt="Love Local Chef"
                        /> */}
                        {/* Verified tag */}
                        {chef?.email_verified_at && (
                          <div className="absolute bottom-3 right-3 bg-white rounded-sm py-1 px-2 flex items-center gap-x-2">
                            <h2 className="text-xs mb-0">Verified </h2>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="18"
                              height="18"
                              fill="rgba(11,122,224,1)"
                            >
                              <path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-7 col-span-12">
                        <h2 className="text-xl font-semibold mb-0">{`${chef.first_name} ${chef.last_name}`}</h2>
                        {/* <h3 className='text-base font-medium text-headGray'>Sri Lankan, Thai</h3> */}
                        {/* Rating */}
                        {/* <div className='inline-flex items-center gap-x-2 bg-[#f6be404a] rounded px-2 py-1'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="#f6be40">
                                                            <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                                        </svg>
                                                        <h4 className='mb-0 text-sm pr-1'>4.8 (255)</h4>
                        </div> */}
                        {/* <p className='mt-4'>
                                                        Amazing food! As a Sri Lankan (who can't cook but knows good food) this is very
                                                        authentic! You have a regular customer from us.
                        </p> */}
                        <p className="mt-4">
                          {chef?.bio?.length > 200
                            ? `${chef?.bio?.substring(0, 200)}...`
                            : chef?.bio}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4 mt-6">
                      {chef?.menus?.map((dish) => (
                        <div className="lg:col-span-6 sm:col-span-6 col-span-12">
                          <div className="product-box mb-md-20">
                            <div className="product-img">
                              {/* <a href="restaurant.html"> */}
                              <Link to={`/dish-detail-single/${dish.id}`}>
                                <img
                                  src={
                                    dish.logo 
                                      ? dish.logo
                                      : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                                  }
                                  className="img-fluid object-cover max-h-36 full-width"
                                  alt="product-img"
                                />
                                {/* <img  
                                    src={(dish.logo && dish.logo[0] !== 'p')? `${process.env.REACT_APP_baseURL}/addded_images/menus/${dish.logo}` :"./media/frontend/img/restaurants/255x104/order-1.jpg" }
                                    className="img-fluid object-cover max-h-36 full-width" alt="product-img" 
                                                                    /> 
                                */}
                              </Link>

                              {/* </a> */}
                            </div>
                            <div className="p-4">
                              <h6 className="text-base text-secondary font-semibold mb-1">
                                <Link to={`/dish-detail-single/${dish.id}`}>
                                  {" "}
                                  {dish.name}{" "}
                                </Link>
                              </h6>
                              <p className="whitespace-normal text-xs">
                                {/* This salmon bowl is perfect for work lunch or dinner which includes... */}
                                {dish.description?.length > 70
                                  ? `${dish.description?.substring(0, 70)}...`
                                  : dish.description}
                              </p>
                              <ul className="block-inline mt-2">
                                <li className="inline-block mr-2 mb-2">
                                  <div className="inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]">
                                    {/* <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="10"
                                      height="10"
                                      fill="rgba(0,0,0,1)"
                                    >
                                      <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                    </svg> */}
                                    {/* Star SVG */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="12"
                                      height="12"
                                      fill="#323232"
                                    >
                                      <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                    </svg>
                                    <h4 className="text-xs mb-0 font-semibold">
                                      {/* 100%{" "} */}
                                      {dish?.average_rating
                                        ? parseFloat(
                                            dish.average_rating
                                          ).toFixed(1)
                                        : 0}{" "}
                                      <span className="text-[12px] font-normal">
                                        ({dish?.total_reviews})
                                      </span>
                                    </h4>
                                  </div>
                                </li>
                                {/* <li className="inline-block mr-2 mb-2">
                                  <h4 className="bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0">
                                    Good for lunch
                                  </h4>
                                </li>
                                <li className="inline-block mr-2 mb-2">
                                  <h4 className="bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0">
                                    Healthy
                                  </h4>
                                </li>
                                <li className="inline-block mr-2 mb-2">
                                  <h4 className="bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0">
                                    Authentic taste
                                  </h4>
                                </li> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* <div className='lg:col-span-6 sm:col-span-6 col-span-12'>
                                                    <div className="product-box mb-md-20">
                                                        <div className="product-img">
                                                            <a href="restaurant.html">
                                                                <img src="./media/frontend/img/restaurants/255x104/order-2.jpg" className="img-fluid full-width" alt="product-img" />
                                                            </a>
                                                        </div>
                                                        <div className="p-4">
                                                            <h6 className="text-base text-secondary font-semibold mb-1">
                                                                <Link to="/dish-detail-single"> Pad Grapraw Gai</Link>
                                                            </h6>
                                                            <p className='whitespace-normal text-xs'>
                                                                A mouthwatering slow-cooked pork dish is one of my favorites and pairs really...
                                                            </p>
                                                            <ul className='block-inline mt-2'>
                                                                <li className='inline-block mr-2 mb-2'>
                                                                    <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="rgba(0,0,0,1)">
                                                                            <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                                        </svg>
                                                                        <h4 className='text-xs mb-0 font-semibold'>
                                                                            100% <span className='text-[12px] font-normal'>(30)</span>
                                                                        </h4>
                                                                    </div>
                                                                </li>
                                                                <li className='inline-block mr-2 mb-2'>
                                                                    <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Very tasty</h4>
                                                                </li>
                                                                <li className='inline-block mr-2 mb-2'>
                                                                    <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Authentic taste</h4>
                                                                </li>
                                                                <li className='inline-block mr-2 mb-2'>
                                                                    <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Healthy </h4>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* <SwiperSlide>
                            <div>
                                <div className='chefSlidInner p-5'>
                                    <div className='grid grid-cols-12 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4'>
                                        <div className='md:col-span-5 col-span-12 relative'>
                                            <img src='./media/frontend/img/banner/chef-avatar.jpg' className='object-top rounded-lg w-full object-cover h-[190px]' alt='Love Local Chef' />
                                            <div className='absolute bottom-3 right-3 bg-white rounded-sm py-1 px-2 flex items-center gap-x-2'>
                                                <h2 className='text-xs mb-0'>Verified </h2>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(11,122,224,1)">
                                                    <path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className='md:col-span-7 col-span-12'>
                                            <h2 className='text-xl font-semibold mb-0'>Shef Andrew</h2>
                                            <h3 className='text-base font-medium text-headGray'>Chinese</h3>
                                            <div className='inline-flex items-center gap-x-2 bg-[#f6be404a] rounded px-2 py-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="#f6be40">
                                                    <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                                </svg>
                                                <h4 className='mb-0 text-sm pr-1'>3.8 (145)</h4>
                                            </div>
                                            <p className='mt-4'>
                                                Amazing food! As a Sri Lankan (who can't cook but knows good food) this is very
                                                authentic! You have a regular customer from us.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4 mt-6'>
                                        <div className='lg:col-span-6 sm:col-span-6 col-span-12'>
                                            <div className="product-box mb-md-20">
                                                <div className="product-img">
                                                    <a href="restaurant.html">
                                                        <img src="./media/frontend/img/restaurants/255x104/order-3.jpg" className="img-fluid full-width" alt="product-img" />
                                                    </a>
                                                </div>
                                                <div className="p-4">
                                                    <h6 className="text-base text-secondary font-semibold mb-1">
                                                        <Link to="/dish-detail-single"> Slow Braised Pork Rib</Link>
                                                    </h6>
                                                    <p className='whitespace-normal text-xs'>
                                                        This salmon bowl is perfect for work lunch or dinner which includes...
                                                    </p>
                                                    <ul className='block-inline mt-2'>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="rgba(0,0,0,1)">
                                                                    <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                                </svg>
                                                                <h4 className='text-xs mb-0 font-semibold'>
                                                                    100% <span className='text-[12px] font-normal'>(230)</span>
                                                                </h4>
                                                            </div>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Good for lunch</h4>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Healthy</h4>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Authentic taste</h4>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-6 sm:col-span-6 col-span-12'>
                                            <div className="product-box mb-md-20">
                                                <div className="product-img">
                                                    <a href="restaurant.html">
                                                        <img src="./media/frontend/img/restaurants/255x104/order-4.jpg" className="img-fluid full-width" alt="product-img" />
                                                    </a>
                                                </div>
                                                <div className="p-4">
                                                    <h6 className="text-base text-secondary font-semibold mb-1">
                                                        <Link to="/dish-detail-single"> Mapo Tofu</Link>
                                                    </h6>
                                                    <p className='whitespace-normal text-xs'>
                                                        A mouthwatering slow-cooked pork dish is one of my favorites and pairs really...
                                                    </p>
                                                    <ul className='block-inline mt-2'>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="rgba(0,0,0,1)">
                                                                    <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                                </svg>
                                                                <h4 className='text-xs mb-0 font-semibold'>
                                                                    100% <span className='text-[12px] font-normal'>(30)</span>
                                                                </h4>
                                                            </div>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Very tasty</h4>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Authentic taste</h4>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Healthy </h4>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div>
                                <div className='chefSlidInner p-5'>
                                    <div className='grid grid-cols-12 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4'>
                                        <div className='md:col-span-5 col-span-12 relative'>
                                            <img src='./media/frontend/img/banner/female-chef.png' className='object-top rounded-lg w-full object-cover h-[190px]' alt='Love Local Chef' />
                                            <div className='absolute bottom-3 right-3 bg-white rounded-sm py-1 px-2 flex items-center gap-x-2'>
                                                <h2 className='text-xs mb-0'>Verified </h2>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(11,122,224,1)">
                                                    <path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className='md:col-span-7 col-span-12'>
                                            <h2 className='text-xl font-semibold mb-0'>Shef Swarnamali</h2>
                                            <h3 className='text-base font-medium text-headGray'>Sri Lankan, Thai</h3>
                                            <div className='inline-flex items-center gap-x-2 bg-[#f6be404a] rounded px-2 py-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="#f6be40">
                                                    <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                                </svg>
                                                <h4 className='mb-0 text-sm pr-1'>4.8 (255)</h4>
                                            </div>
                                            <p className='mt-4'>
                                                Amazing food! As a Sri Lankan (who can't cook but knows good food) this is very
                                                authentic! You have a regular customer from us.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-12 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4 mt-6'>
                                        <div className='lg:col-span-6 sm:col-span-6 col-span-12'>
                                            <div className="product-box mb-md-20">
                                                <div className="product-img">
                                                    <a href="restaurant.html">
                                                        <img src="./media/frontend/img/restaurants/255x104/order-1.jpg" className="img-fluid full-width" alt="product-img" />
                                                    </a>
                                                </div>
                                                <div className="p-4">
                                                    <h6 className="text-base text-secondary font-semibold mb-1">
                                                        <Link to="/dish-detail-single"> Chilli Chicken Pizza</Link>
                                                    </h6>
                                                    <p className='whitespace-normal text-xs'>
                                                        This salmon bowl is perfect for work lunch or dinner which includes...
                                                    </p>
                                                    <ul className='block-inline mt-2'>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="rgba(0,0,0,1)">
                                                                    <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                                </svg>
                                                                <h4 className='text-xs mb-0 font-semibold'>
                                                                    100% <span className='text-[12px] font-normal'>(230)</span>
                                                                </h4>
                                                            </div>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Good for lunch</h4>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Healthy</h4>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Authentic taste</h4>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-6 sm:col-span-6 col-span-12'>
                                            <div className="product-box mb-md-20">
                                                <div className="product-img">
                                                    <a href="restaurant.html">
                                                        <img src="./media/frontend/img/restaurants/255x104/order-2.jpg" className="img-fluid full-width" alt="product-img" />
                                                    </a>
                                                </div>
                                                <div className="p-4">
                                                    <h6 className="text-base text-secondary font-semibold mb-1">
                                                        <Link to="/dish-detail-single"> Pad Grapraw Gai</Link>
                                                    </h6>
                                                    <p className='whitespace-normal text-xs'>
                                                        A mouthwatering slow-cooked pork dish is one of my favorites and pairs really...
                                                    </p>
                                                    <ul className='block-inline mt-2'>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="10" height="10" fill="rgba(0,0,0,1)">
                                                                    <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                                                                </svg>
                                                                <h4 className='text-xs mb-0 font-semibold'>
                                                                    100% <span className='text-[12px] font-normal'>(30)</span>
                                                                </h4>
                                                            </div>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Very tasty</h4>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Authentic taste</h4>
                                                        </li>
                                                        <li className='inline-block mr-2 mb-2'>
                                                            <h4 className='bg-primaryLight px-2 py-1 text-xs rounded-[4px] inline-block mb-0'>Healthy </h4>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default MostLoveChef;
