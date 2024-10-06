import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../shef_dashboard/components/Header'
export const Dashboard = () => {
    return (
        <div className=''>
            <div className=''>
                <Header />
                <div className='container mx-auto'>
                    <div className='grid grid-cols-12 gap-4 p-5 mt-5'>
                        <div className='col-span-12'>
                            <div className='rounded-xl p-5 border border-borderClr'>
                                <div className='flex justify-between items-center gap-x-2'>
                                    <div className='flex items-center gap-3'>
                                        <div className='bg-grayBg p-3 rounded-lg inline-block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                                <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 13V15H6V13H8ZM13 13V15H11V13H13ZM18 13V15H16V13H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
                                            </svg>
                                        </div>
                                        <h2 className='sm:text-xl text-lg leading-tight font-semibold uppercase mb-0'>Your Upcoming Orders</h2>
                                    </div>
                                    <NavLink to="/shef/order">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                                        </svg>
                                    </NavLink>
                                </div>
                                {/* <div className='lg:w-[80%] w-full mx-auto'>
                                    <div className='mt-5 grid md:grid-cols-7 grid-cols-4 gap-3'>
                                        <NavLink to="/shef/order" className="text-center bg-grayBg p-3 rounded-lg">
                                            <h4 className='text-base font-semibold mb-0'>Mon</h4>
                                            <h3 className='md:text-4xl text-2xl font-semibold leading-tight mb-0'>20</h3>
                                        </NavLink>
                                        <NavLink to="/shef/order" className="text-center bg-grayBg p-3 rounded-lg">
                                            <h4 className='text-base font-semibold mb-0'>Tue</h4>
                                            <h3 className='md:text-4xl text-2xl font-semibold leading-tight mb-0'>21</h3>
                                        </NavLink>
                                        <NavLink to="/shef/order" className="text-center bg-grayBg p-3 rounded-lg">
                                            <h4 className='text-base font-semibold mb-0'>Wed</h4>
                                            <h3 className='md:text-4xl text-2xl font-semibold leading-tight mb-0'>22</h3>
                                        </NavLink>
                                        <NavLink to="/shef/order" className="text-center bg-grayBg p-3 rounded-lg">
                                            <h4 className='text-base font-semibold mb-0'>Thu</h4>
                                            <h3 className='md:text-4xl text-2xl font-semibold leading-tight mb-0'>23</h3>
                                        </NavLink>
                                        <NavLink to="/shef/order" className="text-center bg-grayBg p-3 rounded-lg">
                                            <h4 className='text-base font-semibold mb-0'>Fri</h4>
                                            <h3 className='md:text-4xl text-2xl font-semibold leading-tight mb-0'>24</h3>
                                        </NavLink>
                                        <NavLink to="/shef/order" className="text-center bg-grayBg p-3 rounded-lg">
                                            <h4 className='text-base font-semibold mb-0'>Sat</h4>
                                            <h3 className='md:text-4xl text-2xl font-semibold leading-tight mb-0'>25</h3>
                                        </NavLink>
                                        <NavLink to="/shef/order" className="text-center bg-grayBg p-3 rounded-lg">
                                            <h4 className='text-base font-semibold mb-0'>Sun</h4>
                                            <h3 className='md:text-4xl text-2xl font-semibold leading-tight mb-0'>26</h3>
                                        </NavLink>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className='md:col-span-6 col-span-12'>
                            <div className='rounded-xl p-5 border border-borderClr h-full'>
                                <div className='flex justify-between items-center gap-x-2'>
                                    <div className='flex items-center gap-3'>
                                        <div className='bg-grayBg p-3 rounded-lg inline-block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                                <path d="M8 1.5C8 0.947715 7.55228 0.5 7 0.5C6.44772 0.5 6 0.947715 6 1.5V2.5C6 2.50686 6.00042 2.51285 6.00081 2.51843C6.00385 2.56193 6.00516 2.58063 5.79289 2.79289L5.77277 2.81298C5.50599 3.07912 5 3.58391 5 4.5V5.5C5 6.05228 5.44772 6.5 6 6.5C6.55228 6.5 7 6.05228 7 5.5V4.5C7 4.49314 6.99958 4.48715 6.99919 4.48157C6.99615 4.43807 6.99484 4.41937 7.20711 4.20711L7.22723 4.18702C7.49401 3.92088 8 3.41609 8 2.5V1.5ZM19 1.5C19 0.947715 18.5523 0.5 18 0.5C17.4477 0.5 17 0.947715 17 1.5V2.5C17 2.50686 17.0004 2.51285 17.0008 2.51843C17.0038 2.56193 17.0052 2.58063 16.7929 2.79289L16.7728 2.81298C16.506 3.07912 16 3.58391 16 4.5V5.5C16 6.05228 16.4477 6.5 17 6.5C17.5523 6.5 18 6.05228 18 5.5V4.5C18 4.49314 17.9996 4.48715 17.9992 4.48157C17.9962 4.43807 17.9948 4.41937 18.2071 4.20711L18.2272 4.18702C18.494 3.92088 19 3.41609 19 2.5V1.5ZM12.5 0.5C13.0523 0.5 13.5 0.947715 13.5 1.5V2.5C13.5 3.41609 12.994 3.92088 12.7272 4.18702L12.7071 4.20711C12.4948 4.41937 12.4962 4.43807 12.4992 4.48157C12.4996 4.48715 12.5 4.49314 12.5 4.5V5.5C12.5 6.05228 12.0523 6.5 11.5 6.5C10.9477 6.5 10.5 6.05228 10.5 5.5V4.5C10.5 3.58391 11.006 3.07912 11.2728 2.81298L11.2929 2.79289C11.5052 2.58063 11.5038 2.56193 11.5008 2.51843C11.5004 2.51285 11.5 2.50686 11.5 2.5V1.5C11.5 0.947715 11.9477 0.5 12.5 0.5ZM4 10H20C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10ZM3 8C2.44772 8 2 8.44771 2 9V10C2 14.1006 4.46819 17.6248 8 19.1679V20C8 20.5523 8.44772 21 9 21H15C15.5523 21 16 20.5523 16 20V19.1679C19.5318 17.6248 22 14.1006 22 10V9C22 8.44772 21.5523 8 21 8H3Z"></path>
                                            </svg>
                                        </div>
                                        <h2 className='sm:text-xl text-lg leading-tight font-semibold uppercase mb-0'>Menu</h2>
                                    </div>
                                    <NavLink to="/shef/my-menu">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                                        </svg>
                                    </NavLink>
                                </div>
                                <div className='grid grid-cols-2 gap-2 mt-5'>
                                    <h6 className='bg-primaryLight px-2 py-1 rounded-md text-secondary  mb-0'>(0) Main</h6>
                                    <h6 className='bg-primaryLight px-2 py-1 rounded-md text-secondary  mb-0'>(0) Side Menu</h6>
                                    <h6 className='bg-primaryLight px-2 py-1 rounded-md text-secondary  mb-0'>(0) Appetizer</h6>
                                    <h6 className='bg-primaryLight px-2 py-1 rounded-md text-secondary  mb-0'>(0) Dessert</h6>
                                </div>
                            </div>
                        </div>
                        {/* Wallet - temporary commented */}
                        {/* <div className='md:col-span-6 col-span-12'>
                            <div className='rounded-xl p-5 border border-borderClr h-full'>
                                <div className='flex justify-between items-center gap-x-2'>
                                    <div className='flex items-center gap-3'>
                                        <div className='bg-grayBg p-3 rounded-lg inline-block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                                <path d="M18.0049 6.99979H21.0049C21.5572 6.99979 22.0049 7.4475 22.0049 7.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979H18.0049V6.99979ZM4.00488 8.99979V18.9998H20.0049V8.99979H4.00488ZM4.00488 4.99979V6.99979H16.0049V4.99979H4.00488ZM15.0049 12.9998H18.0049V14.9998H15.0049V12.9998Z"></path>
                                            </svg>
                                        </div>
                                        <h2 className='sm:text-xl text-lg leading-tight font-semibold uppercase mb-0'>Wallet</h2>
                                    </div>
                                    <NavLink to="/shef/sales-statment">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                                        </svg>
                                    </NavLink>
                                </div>
                                <div className='mt-5 text-center'>
                                    <h4 className='text-5xl font-bold mb-0'>0<span className='text-base'>Rs.</span></h4>
                                    <h5 className='sm:text-lg text-base font-semibold leading-tight mt-2 mb-0' >WALLET BALANCE</h5>
                                </div>
                            </div>
                        </div> */}
                        <div className='md:col-span-6 col-span-12'>
                            <NavLink to="/shef/profile">
                                <div className='rounded-xl p-5 border border-borderClr h-full'>
                                    <div className='flex justify-between items-center gap-x-2'>
                                        <div className='bg-grayBg p-3 rounded-lg inline-block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                                <path d="M21.0082 3C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM20 5H4V19H20V5ZM18 15V17H6V15H18ZM12 7V13H6V7H12ZM18 11V13H14V11H18ZM10 9H8V11H10V9ZM18 7V9H14V7H18Z"></path>
                                            </svg>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                                        </svg>
                                    </div>
                                    <h2 className='sm:text-xl text-lg leading-tight font-semibold uppercase mt-5 mb-0'>Your Profile</h2>
                                    <p className='mb-0 font-medium'>
                                        Update your Profile!
                                    </p>
                                </div>
                            </NavLink>
                        </div>
                        <div className='md:col-span-6 col-span-12'>
                            <NavLink to="/shef/order-review">
                                <div className='rounded-xl p-5 border border-borderClr h-full'>
                                    <div className='flex justify-between items-center gap-x-2'>
                                        <div className='bg-grayBg p-3 rounded-lg inline-block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                                <path d="M21 6.75736L19 8.75736V4H10V9H5V20H19V17.2426L21 15.2426V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5501 3 20.9932V8L9.00319 2H19.9978C20.5513 2 21 2.45531 21 2.9918V6.75736ZM21.7782 8.80761L23.1924 10.2218L15.4142 18L13.9979 17.9979L14 16.5858L21.7782 8.80761Z"></path>
                                            </svg>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(0,0,0,1)">
                                            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                                        </svg>
                                    </div>
                                    <h2 className='sm:text-xl text-lg leading-tight font-semibold uppercase mt-5 mb-0'>Your Order Review</h2>
                                    <p className='mb-0'>
                                        See your Order Review!
                                    </p>
                                </div>
                            </NavLink>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Dashboard