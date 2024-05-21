import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export const OrderSummary = () => {
    return (
        <>
            <Header />
            <div className='container mx-auto'>
                <div className="my-12">
                    <div className="border border-borderClr !rounded-xl p-6">
                        <div className="tracking-details p-relative text-center">
                            <h5 className="text-light-black fw-600">Guajillo Grilled Shrimps</h5>
                            <span className="text-light-white">Estimated Delivery time</span>
                            <h2 className="text-light-black fw-700 no-margin">9:00pm-9:10pm</h2>
                            <div id="add-listing-tab" className="step-app">
                                <ul className="step-steps">
                                    <li className="done">
                                        <Link> <span className="number"></span>
                                            <span className="step-name">Order sent<br/>8:38pm</span>
                                        </Link>
                                    </li>
                                    <li className="active">
                                        <Link> <span className="number"></span>
                                            <span className="step-name">In the works</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link> <span className="number"></span>
                                            <span className="step-name">Out of delivery</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link> <span className="number"></span>
                                            <span className="step-name">Delivered</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="recipt-name title full-width !justify-center">
                                <div className="countdown-box">
                                    <div className="time-box block">
                                        <span className='text-3xl font-bold'>01</span>
                                        <span className='text-xs mt-1 font-medium'>Hour</span>
                                    </div>
                                    <div className="time-box block">
                                        <span className='text-3xl font-bold'>05</span>
                                        <span className='text-xs mt-1 font-medium'>Minutes</span>
                                    </div>
                                    <div className="time-box block">
                                        <span className='text-3xl font-bold'>45</span>
                                        <span className='text-xs mt-1 font-medium'>Seconds</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- recipt --> */}
                    <div className="recipt-sec padding-20 mt-4 !rounded-xl">
                        <div className="">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="md:col-span-6 col-span-12">
                                    <div className="recipt-name full-width">
                                        <h5 className="mb-3 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest">Delivery (ASAP) to:</h5>
                                        <span className="text-light-white ">Jhon Deo</span>
                                        <span className="text-light-white ">Home</span>
                                        <span className="text-light-white ">314 79th St</span>
                                        <span className="text-light-white ">Rite Aid, Brooklyn, NY, 11209</span>
                                        <p className="text-light-white ">(347) 123456789</p>
                                    </div>
                                    <div className="recipt-name full-width padding-tb-10 pt-0">
                                        <h5 className="mb-3 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest">Delivery instructions</h5>
                                        <p className="text-light-white ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua consectetur adipiscing elit.</p>
                                    </div>
                                    {/* Subtotal Payment */}
                                    <div className="payment-method mb-md-40">
                                        <div className=''>
                                            <h3 className='mb-3 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest'>Order Summary</h3>
                                            <div className='flex justify-between gap-2 mb-3'>
                                                <h3 className='text-lg font-bold mb-0'>Subtotal</h3>
                                                <h4 className='text-lg font-bold mb-0'>$44.97</h4>
                                            </div>
                                            <div className='flex justify-between gap-2 mb-1'>
                                                <h3 className='text-lg font-medium mb-0'>Delivery Fee</h3>
                                                <h4 className='text-lg font-medium mb-0'>$2.49</h4>
                                            </div>
                                            <div className='flex justify-between gap-2 mb-1'>
                                                <h3 className='text-lg font-medium mb-0'>Fees & Taxes</h3>
                                                <h4 className='text-lg font-medium mb-0'>$6.86</h4>
                                            </div>
                                            <div className='flex justify-between gap-2 mb-1'>
                                                <h3 className='text-lg font-medium mb-0'>Shef Tip</h3>
                                                <h4 className='text-lg font-medium mb-0'>$6.74</h4>
                                            </div>
                                            <div className='flex justify-between gap-2 mb-1 bg-primaryLight py-2 px-3 rounded-md'>
                                                <h3 className='text-lg font-bold mb-0'>Total</h3>
                                                <h4 className='text-lg font-bold mb-0'>$61.06</h4>
                                            </div>
                                        </div>
                                        <div className="mt-2"> 
                                            <Link className="btn-first white-btn fw-600 help-btn">Need Help?</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-6 col-span-12">
                                    <div className="col-lg-12">
                                        <h5 className="mb-3 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest">
                                            Your Order 
                                            <span>
                                                <Link className="fs-12">Print recipt</Link>
                                            </span>
                                        </h5>
                                        <p className="title text-light-white">
                                            Nov 15, 2015 8:38pm <span className="text-light-black">Order #123456789012345</span>
                                        </p>
                                    </div>
                                    {/* Chef #1 Order */}
                                    <div className='bg-primaryLight p-4 rounded-lg mt-4'>
                                        <div className='flex items-center gap-x-2 bg-primaryLight p-2 rounded-lg'>
                                            <img src='./media/frontend/img/banner/female-chef.png' className='object-top rounded-full w-[30px] object-cover h-[30px]' alt='title' />
                                            <Link className='!underline !text-secondary text-base font-semibold'> Shef Swarnamali</Link>
                                        </div>
                                        {/* Order Box */}
                                        <div className='flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4'>
                                            <div className='flex items-center gap-x-2 w-[65%]'>
                                                <img src='./media/frontend/img/restaurants/255x104/order-2.jpg' className='object-top rounded-lg w-[60px] object-cover h-[60px]' alt='title' />
                                                <div>
                                                    <h3 className='mb-1 text-base font-semibold leading-tight'>Guajillo Grilled Shrimps </h3>
                                                    <h4 className='text-lg fontsemibold mb-0'>x $13.99</h4>
                                                </div>
                                            </div>
                                            <div className='text-lg font-semibold pr-2'> x1  </div>
                                        </div>
                                    </div>
                                    {/* Chef #2 Order */}
                                    <div className='bg-primaryLight p-4 rounded-lg mt-4'>
                                        <div className='flex items-center gap-x-2 bg-primaryLight p-2 rounded-lg'>
                                            <img src='./media/frontend/img/banner/chef-8.webp' className='object-top rounded-full w-[30px] object-cover h-[30px]' alt='title' />
                                            <Link className='!underline !text-secondary text-base font-semibold'> Shef Carla</Link>
                                        </div>
                                        {/* Order Box */}
                                        <div className='flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4'>
                                            <div className='flex items-center gap-x-2 w-[65%]'>
                                                <img src='./media/frontend/img/restaurants/255x104/order-1.jpg' className='object-top rounded-lg w-[60px] object-cover h-[60px]' alt='title' />
                                                <div>
                                                    <h3 className='mb-1 text-base font-semibold leading-tight'>Lemon Loaf Cake </h3>
                                                    <h4 className='text-lg fontsemibold mb-0'>x $17.99</h4>
                                                </div>
                                            </div>
                                            <div className='text-lg font-semibold pr-2'> x2  </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default OrderSummary