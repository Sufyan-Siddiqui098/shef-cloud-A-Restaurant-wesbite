import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import isValidURL from "../../ValidateUrl";

export const CartPage = () => {
  const { cartItem } = useSelector((state) => state.cart);
  return (
    <>
      <Header />
      <div className="container mx-auto py-12">
        <div className="lg:text-start text-center">
          <h1 className="font-semibold text-3xl uppercase text-secondary tracking-widest">
            Your cart
          </h1>
          <div className="w-[60px] h-[2px] bg-primary my-6 lg:mx-0 mx-auto"></div>
        </div>
        {/* Checkout ALl */}
        {cartItem && cartItem.length > 1 && (
          <div className="flex justify-end px-2 my-2 mb-5">
            <Link to="/checkout-all" className="flex justify-center items-center gap-x-3 bg-primary rounded-md py-2 px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="rgba(255,255,255,1)"
              >
                <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
              </svg>
              <span className="text-white text-xl font-semibold">
                {/* View Cart */}
                Checkout All
              </span>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-12 gap-4">
          {cartItem &&
            cartItem.length > 0 &&
            cartItem.map((chef, chefIndex) => (
              //   chef.menu.map((menu, menuIndex) => (
              <div
                key={chefIndex}
                className="lg:col-span-4 md:col-span-6 col-span-12"
              >
                <div className="p-3 rounded-lg border border-primaryLight bxShadow">
                  <div className="flex justify-between gap-3">
                    <div className="flex items-center gap-x-4">
                      <img
                        src={
                          chef.profile_pic
                            ? chef.profile_pic
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        className="object-top rounded-lg w-[80px] object-cover h-[80px]"
                        alt="title"
                      />
                      {/* <img
                        src={
                          chef.profile_pic && chef.profile_pic[0] !== "p"
                            ? chef.profile_pic
                            : "./media/frontend/img/banner/female-chef.png"
                        }
                        className="object-top rounded-lg w-[80px] object-cover h-[80px]"
                        alt="title"
                      /> */}
                      <div className="block">
                        <h2 className="!text-secondary text-2xl font-semibold leading-tight mb-1">
                          {`${chef.first_name} ${chef.last_name}`}
                        </h2>
                        {/* <h3 className='bg-greenLight py-1 px-3 rounded-[5px] text-secondary font-medium text-[12px] mb-0 inline-block leading-tight'>Mexican</h3> */}
                      </div>
                    </div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
                                                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                                            </svg> */}
                  </div>

                  <div className="flex justify-between gap-3 mt-6 px-3">
                    <h2 className="mb-1 text-lg font-semibold leading-tight">
                      Items{" "}
                    </h2>
                    <h2 className="mb-1 text-lg font-semibold leading-tight">
                      Qty{" "}
                    </h2>
                  </div>
                  {chef.menu.map((menu, menuIndex) => (
                    <div
                      key={menuIndex}
                      className="flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4"
                    >
                      <div className="flex items-center gap-x-2 w-[80%]">
                        <img
                          src={
                            menu.logo 
                              ? menu.logo
                              : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                          }
                          className="object-top rounded-lg w-[70px] object-cover h-[60px]"
                          alt="ef"
                        />
                        {/* <img
                          src="./media/frontend/img/restaurants/255x104/order-2.jpg"
                          className="object-top rounded-lg w-[70px] object-cover h-[60px]"
                          alt="ef"
                        /> */}
                        {/* <h3 className='mb-1 text-lg font-semibold leading-tight'>Guajillo Grilled Shrimps </h3> */}
                        <h3 className="mb-1 text-lg font-semibold leading-tight">
                          {menu.name}
                        </h3>
                      </div>
                      {/* <h6 className='text-lg font-semibold leading-tight w-[20%] text-right mb-0 pr-2'>1x</h6> */}
                      <h6 className="text-lg font-semibold leading-tight w-[20%] text-right mb-0 pr-2">
                        {menu.quantity}x
                      </h6>
                    </div>
                  ))}
                  {/* <div className='flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4'>
                                            <div className='flex items-center gap-x-2 w-[80%]'>
                                                <img src='./media/frontend/img/restaurants/255x104/order-2.jpg' className='object-top rounded-lg w-[70px] object-cover h-[60px]' alt='ef' />
                                                <h3 className='mb-1 text-lg font-semibold leading-tight'>Carne En Su Jugo </h3>
                                            </div>
                                            <h6 className='text-lg font-semibold leading-tight w-[20%] text-right mb-0 pr-2'>2x</h6>
                                        </div> */}
                  <div className="mt-8 text-center">
                    {/* <div className='gap-1 rounded-full border border-secondary inline-flex mb-3 px-3 py-1 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" fill="#323232"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                                <Link className='text-center block mb-0 text-base font-medium !text-secondary'>1 More Dish</Link>
                                            </div> */}

                    <Link
                      to={`/checkout/${chef.id}`}
                      className="flex justify-center items-center gap-x-3 bg-primary rounded-lg py-3 px-3 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="rgba(255,255,255,1)"
                      >
                        <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
                      </svg>
                      <span className="text-white text-xl font-semibold">
                        {/* View Cart */}
                        To Checkout
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          {(!cartItem || cartItem.length < 1) && (
            <div className="lg:col-span-4 col-span-12 bg-[#f7f7f7]">
              {/*********  When Data is Empty Un Comment  *************/}
              <div className="pt-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-3"
                  viewBox="0 0 24 24"
                  width="96"
                  height="96"
                  fill="#dcdcdc"
                >
                  <path d="M6.50488 2H17.5049C17.8196 2 18.116 2.14819 18.3049 2.4L21.0049 6V21C21.0049 21.5523 20.5572 22 20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V6L5.70488 2.4C5.89374 2.14819 6.19013 2 6.50488 2ZM19.0049 8H5.00488V20H19.0049V8ZM18.5049 6L17.0049 4H7.00488L5.50488 6H18.5049ZM9.00488 10V12C9.00488 13.6569 10.348 15 12.0049 15C13.6617 15 15.0049 13.6569 15.0049 12V10H17.0049V12C17.0049 14.7614 14.7663 17 12.0049 17C9.24346 17 7.00488 14.7614 7.00488 12V10H9.00488Z"></path>
                </svg>
                <h2 className="text-lg text-center text-secondary">
                  Your cart is empty <br /> Add items to get started
                </h2>
              </div>
            </div>
          )}

          {/* <div className='lg:col-span-4 md:col-span-6 col-span-12'>
                        <div className='p-3 rounded-lg border border-primaryLight bxShadow'>
                            <div className='flex justify-between gap-3'>
                                <div className='flex items-center gap-x-4'>
                                    <img src='./media/frontend/img/banner/chef-8.webp' className='object-top rounded-lg w-[80px] object-cover h-[80px]' alt='title' />
                                    <div className='block'>
                                        <h2 className='!text-secondary text-2xl font-semibold leading-tight mb-1'> Shef Shereen</h2>
                                        <h3 className='bg-greenLight py-1 px-3 rounded-[5px] text-secondary font-medium text-[12px] mb-0 inline-block leading-tight'>Baked Goods · Desserts</h3>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                                </svg>
                            </div>
                            <div className='flex justify-between gap-3 mt-6 px-3'>
                                <h2 className='mb-1 text-lg font-semibold leading-tight'>Items </h2>
                                <h2 className='mb-1 text-lg font-semibold leading-tight'>Qty </h2>
                            </div>
                            <div className='flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4'>
                                <div className='flex items-center gap-x-2 w-[80%]'>
                                    <img src='./media/frontend/img/restaurants/255x104/order-2.jpg' className='object-top rounded-lg w-[70px] object-cover h-[60px]' alt='ef' />
                                    <h3 className='mb-1 text-lg font-semibold leading-tight'>Lemon Loaf Cake </h3>
                                </div>
                                <h6 className='text-lg font-semibold leading-tight w-[20%] text-right mb-0 pr-2'>1x</h6>
                            </div>
                            <div className='flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4'>
                                <div className='flex items-center gap-x-2 w-[80%]'>
                                    <img src='./media/frontend/img/restaurants/255x104/order-2.jpg' className='object-top rounded-lg w-[70px] object-cover h-[60px]' alt='ef' />
                                    <h3 className='mb-1 text-lg font-semibold leading-tight'>M&M Sugar Cookies </h3>
                                </div>
                                <h6 className='text-lg font-semibold leading-tight w-[20%] text-right mb-0 pr-2'>2x</h6>
                            </div>
                            <div className='mt-8 text-center'>
                                <div className='gap-1 rounded-full border border-secondary inline-flex mb-3 px-3 py-1 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" fill="#323232"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                    <Link className='text-center block mb-0 text-base font-medium !text-secondary'>1 More Dish</Link>
                                </div>
                                
                                <Link className='flex justify-center items-center gap-x-3 bg-primary rounded-lg py-3 px-3 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,1)"><path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path></svg>
                                    <span className='text-white text-xl font-semibold'>View Cart</span>
                                </Link>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CartPage;
