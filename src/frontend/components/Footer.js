import React from 'react';
import { Link, NavLink } from 'react-router-dom'
const Footer = () => {
    return (
        <>
            {/* <!-- footer --> */}

            <footer className="bg-light-theme pt-0 u-line bg-white">
                <div className="u-line instagram-slider swiper-container px-4 py-12 relative" id='footerImgSide'>
                    <ul className="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 gap-4">
                        <li className="bgImg">
                            <img src="/media/frontend/img/restaurants/250x200/insta-3.jpg" alt="instagram" />
                        </li>
                        <li className="bgImg">
                            <img src="/media/frontend/img/restaurants/250x200/insta-1.jpg" alt="instagram" />
                        </li>
                        <li className="bgImg">
                            <img src="/media/frontend/img/restaurants/250x200/insta-2.jpg" alt="instagram" />
                        </li>
                        <li className="bgImg">
                            <img src="/media/frontend/img/restaurants/250x200/insta-4.jpg" alt="instagram" />
                        </li>
                        <li className="bgImg">
                            <img src="/media/frontend/img/restaurants/250x200/insta-5.jpg" alt="instagram" />
                        </li>
                        <li className="bgImg">
                            <img src="/media/frontend/img/restaurants/250x200/insta-6.jpg" alt="instagram" />
                        </li>
                        <li className="bgImg">
                            <img src="/media/frontend/img/restaurants/250x200/insta-7.jpg" alt="instagram" />
                        </li>
                        <li className="bgImg">
                            <img src="/media/frontend/img/restaurants/250x200/insta-8.jpg" alt="instagram" />
                        </li>
                    </ul>
                    <div className="footerChefBx">
                        <div className='text-center mb-12'>
                            <h2 className='font-semibold text-2xl uppercase tracking-wider tracking-widest'>
                                Helping local food makers thrive
                            </h2>
                            <div className='w-[60px] h-[2px] bg-primary my-4 mx-auto'></div>
                        </div>
                        <div className="flex md:flex-row flex-col md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4 justify-center">
                            <NavLink to="/become-a-chef" className="footerChefBxBtn !text-[#323232]">
                                <img src="/media/frontend/img/chef-icon.svg" alt="Become A Chef" />
                                <button type='submit'>Become A Chef</button>
                            </NavLink>
                            <div className="footerChefBxBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(236,32,68,1)"><path d="M8 1.5C8 0.947715 7.55228 0.5 7 0.5C6.44772 0.5 6 0.947715 6 1.5V2.5C6 2.50686 6.00042 2.51285 6.00081 2.51843C6.00385 2.56193 6.00516 2.58063 5.79289 2.79289L5.77277 2.81298C5.50599 3.07912 5 3.58391 5 4.5V5.5C5 6.05228 5.44772 6.5 6 6.5C6.55228 6.5 7 6.05228 7 5.5V4.5C7 4.49314 6.99958 4.48715 6.99919 4.48157C6.99615 4.43807 6.99484 4.41937 7.20711 4.20711L7.22723 4.18702C7.49401 3.92088 8 3.41609 8 2.5V1.5ZM19 1.5C19 0.947715 18.5523 0.5 18 0.5C17.4477 0.5 17 0.947715 17 1.5V2.5C17 2.50686 17.0004 2.51285 17.0008 2.51843C17.0038 2.56193 17.0052 2.58063 16.7929 2.79289L16.7728 2.81298C16.506 3.07912 16 3.58391 16 4.5V5.5C16 6.05228 16.4477 6.5 17 6.5C17.5523 6.5 18 6.05228 18 5.5V4.5C18 4.49314 17.9996 4.48715 17.9992 4.48157C17.9962 4.43807 17.9948 4.41937 18.2071 4.20711L18.2272 4.18702C18.494 3.92088 19 3.41609 19 2.5V1.5ZM12.5 0.5C13.0523 0.5 13.5 0.947715 13.5 1.5V2.5C13.5 3.41609 12.994 3.92088 12.7272 4.18702L12.7071 4.20711C12.4948 4.41937 12.4962 4.43807 12.4992 4.48157C12.4996 4.48715 12.5 4.49314 12.5 4.5V5.5C12.5 6.05228 12.0523 6.5 11.5 6.5C10.9477 6.5 10.5 6.05228 10.5 5.5V4.5C10.5 3.58391 11.006 3.07912 11.2728 2.81298L11.2929 2.79289C11.5052 2.58063 11.5038 2.56193 11.5008 2.51843C11.5004 2.51285 11.5 2.50686 11.5 2.5V1.5C11.5 0.947715 11.9477 0.5 12.5 0.5ZM4 10H20C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10ZM3 8C2.44772 8 2 8.44771 2 9V10C2 14.1006 4.46819 17.6248 8 19.1679V20C8 20.5523 8.44772 21 9 21H15C15.5523 21 16 20.5523 16 20V19.1679C19.5318 17.6248 22 14.1006 22 10V9C22 8.44772 21.5523 8 21 8H3Z"></path></svg>
                                <button type='submit'>Order Food</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='lg:px-2 px-4'>
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 lg:gap-y-0 gap-y-6 py-12">
                            <div className='lg:col-span-5 col-span-12'>
                                <div className="footer-contact lg:pe-6">
                                    <div className="logo mainNavCol">
                                        <Link to="/">
                                            <img src="/media/frontend/img/logo/logo.jpg" className="w-[120px] img-fluid" alt="Logo" />
                                        </Link>
                                    </div>
                                    <div className='lg:w-full md:w-2/3 w-full'>
                                        <p className='my-3'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                            Necessitatibus quasi fuga culpa, illum possimus.
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className='lg:col-span-7 col-span-12'>
                                <div className='grid grid-cols-12 lg:gap-y-0 gap-y-6 pt-6'>
                                    <div className="md:col-span-4 col-span-12">
                                        <div className="footer-links">
                                            <h6 className="">Get to Know Us</h6>
                                            <ul>
                                                <li>
                                                    <Link to='/about' className='text-light-white fs-14'>About Us</Link>
                                                </li>
                                                <li>
                                                    <Link to='/terms-of-servies'  className='text-light-white fs-14'>Terms of Servies</Link>
                                                </li>
                                                <li>
                                                    <Link to='/privacy-policy'  className='text-light-white fs-14'>Privacy Policy</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="md:col-span-4 col-span-12">
                                        <div className="footer-links">
                                            <h6 className="">Doing Business</h6>
                                            <ul>
                                                <li>
                                                    <Link to='/become-a-chef' className='text-light-white fs-14'>Become a Shef</Link>
                                                </li>
                                                <li>
                                                    <Link to='/homemade-food-delivery' className='text-light-white fs-14'>Home food Delivery</Link>
                                                </li>
                                                <li>
                                                    <Link to='/faqs' className='text-light-white fs-14'>Faqs</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="md:col-span-4 col-span-12">
                                        <div className="footer-links">
                                            <h6 className="">Customer Support</h6>
                                            <ul>
                                                <li>
                                                    <Link to='tel:+920000000000' rel="noopener" className='text-light-white fs-14'>
                                                       <div className='flex justify-start items-center gap-x-2'>
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="rgba(0,0,0,1)"><path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path></svg>
                                                            </span>
                                                            <span>
                                                                +92 000 0000 000
                                                            </span>
                                                       </div>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='mailto:support@shef_cloud.com' className='text-light-white fs-14'>
                                                        <div className='flex justify-start items-center gap-x-2'>
                                                            <span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="rgba(0,0,0,1)"><path d="M2 5.5V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5ZM0 10H5V12H0V10ZM0 15H8V17H0V15Z"></path></svg>
                                                            </span>
                                                            <span>
                                                                support@shef_cloud.com
                                                            </span>
                                                       </div>
                                                        
                                                    </Link>
                                                </li>
                                                <li>
                                                <div className="ft-social-media">
                                                    {/* <div className='footer-links'>
                                                        <h6 className="">Follow us</h6>
                                                    </div> */}
                                                    <ul className='mt-3'>
                                                        <li>
                                                            <Link>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(236,32,68,1)">
                                                                    <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"></path>
                                                                </svg>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(251,251,251,1)">
                                                                    <path d="M8 2H1L9.26086 13.0145L1.44995 21.9999H4.09998L10.4883 14.651L16 22H23L14.3917 10.5223L21.8001 2H19.1501L13.1643 8.88578L8 2ZM17 20L5 4H7L19 20H17Z"></path>
                                                                </svg>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(0,0,0,1)">
                                                                <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"></path>
                                                                </svg>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(248,248,248,1)">
                                                                    <path d="M8.49161 19.1912C8.51535 18.8546 8.56306 18.5199 8.63456 18.1897C8.69754 17.8951 8.88867 17.0596 9.16872 15.8498L9.17581 15.8191C9.29895 15.2872 9.43089 14.7192 9.56283 14.1525C9.64199 13.8124 9.70356 13.5484 9.74438 13.4602C9.55012 13.0123 9.45298 12.5263 9.45969 12.0373C9.45969 10.6999 10.2157 9.66359 11.1958 9.6636C11.5555 9.65809 11.8996 9.81388 12.1383 10.09C12.3764 10.3655 12.4863 10.7335 12.4404 11.086C12.4404 11.5385 12.3548 11.8844 11.9865 13.1212C11.9158 13.3587 11.8674 13.5254 11.8215 13.692C11.7696 13.8799 11.7261 14.0503 11.6887 14.2136C11.5928 14.6003 11.6811 15.011 11.9262 15.3195C12.1707 15.6272 12.5421 15.7966 12.9319 15.7762C14.4242 15.7762 15.5321 13.7911 15.5321 11.2277C15.5321 9.25804 14.2412 7.95424 12.1 7.95416C11.0224 7.91127 9.97466 8.32523 9.20095 9.09986C8.42664 9.87508 7.99452 10.9437 8.00559 12.0614C7.98214 12.6633 8.17064 13.2536 8.51804 13.7053C8.69915 13.8441 8.76869 14.0885 8.69262 14.2941C8.65157 14.4632 8.55259 14.8473 8.51649 14.9755C8.49464 15.1032 8.41497 15.2131 8.30126 15.2715C8.18678 15.3303 8.05172 15.3297 7.94618 15.2737C6.78507 14.7954 6.14967 13.4963 6.14967 11.8349C6.14967 8.84907 8.64129 6.2497 12.3417 6.2497C15.4772 6.2497 17.8231 8.57864 17.8231 11.3896C17.8231 14.922 15.8911 17.4942 13.1337 17.4942C12.3393 17.5202 11.5838 17.162 11.087 16.535L11.044 16.712C10.9499 17.0992 10.9028 17.2928 10.8368 17.5638L10.8349 17.5715C10.6887 18.1717 10.5867 18.5885 10.5471 18.7452C10.4412 19.0998 10.307 19.448 10.1471 19.7841C10.7421 19.9253 11.3628 20 12.001 20C16.4193 20 20.001 16.4183 20.001 12C20.001 7.58172 16.4193 4 12.001 4C7.5827 4 4.00098 7.58172 4.00098 12C4.00098 15.1594 5.83244 17.8911 8.49161 19.1912ZM12.001 22C6.47813 22 2.00098 17.5228 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22Z"></path>
                                                                </svg>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden">
                                <div className="footer-contact">
                                    <h6 className="">Newsletter</h6>
                                    <form className="subscribe_form">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-submit" name="email" placeholder="Enter your email" />
                                            <span className="input-group-btn">
                                                <button className="btn btn-second btn-submit" type="button"><i className="fas fa-paper-plane"></i></button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copyright lg:!px-2 !px-4 md:py-3 py-1">
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 gag-2">
                        <div className="md:col-span-6 col-span-12">
                            <div className='md:flex gap-x-6 md:justify-start justify-center items-center'>
                                <div className='flex gap-x-4 lg:justify-start justify-center md:mt-0 mt-3'>
                                    <div className="appimg">
                                        <Link>
                                            <img src="/media/frontend/img/appstore.jpg" className="img-fluid" alt="app logo" />
                                        </Link>
                                    </div>
                                    <div className="appimg">
                                        <Link>
                                            <img src="/media/frontend/img/playstore.jpg" className="img-fluid" alt="app logo" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-6 col-span-12 md:text-end text-center md:mt-0 mt-2">
                            <div className="text-light-white fs-14">
                                Shef, Inc. 2024. All Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- footer --></div> */}
        </>
    );
};

export default Footer;
