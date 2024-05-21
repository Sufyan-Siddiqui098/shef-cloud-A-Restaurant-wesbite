import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export const About = () => {
    const pageBnrImg = {
        position: 'relative',
        backgroundImage: `url('./media/frontend/img/about/blog/1920x700/banner-1.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };
    return (
        <>
            <Header />
            <section>
                <div className='pageBanr py-20' style={pageBnrImg}>
                    <div className='container mx-auto relative z-[1] text-center'>
                        <h2 className="font-semibold text-3xl text-white uppercase text-secondary tracking-wider tracking-widest">
                            About Us
                        </h2>
                        <ul className='inline-block text-white mb-0'>
                            <li className='inline-block text-lg'>
                                <Link to='/' className='!text-white hover:!text-primary'>Home</Link>
                            </li>
                            <li className='inline-block px-3'>/</li>
                            <li className='inline-block text-lg font-semibold text-primary'>About Us</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="aboutus section-padding">
                <div className="container mx-auto lg:px-2 px-4">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 align-items-center">
                        <div className="my-auto">
                            <div className="history-title mb-md-40">
                                <h1 className="font-semibold text-3xl uppercase text-secondary tracking-wider tracking-widest lg:text-start text-center">
                                    A History Has Written For Munchbox Explore more Our Story
                                </h1>
                                <div className="w-[60px] h-[2px] bg-primary my-6 lg:mx-0 mx-auto"></div>
                                <p className="mb-0 text-lg text-headGray lg:text-start text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                                </p>
                                <p className="mb-0 text-lg text-headGray lg:text-start text-center">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.
                                </p> 
                            </div>
                        </div>
                        <div className="">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="my-auto">
                                    <div className="histry-img mb-xs-20">
                                        <img src="./media/frontend/img/about/blog/255x200/about-section-3.jpg" className="img-fluid full-width" alt="Histry" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="histry-img">
                                        <img src="./media/frontend/img/about/blog/255x200/about-section-1.jpg" className="img-fluid full-width" alt="Histry"/>
                                    </div>
                                    <div className="histry-img">
                                        <img src="./media/frontend/img/about/blog/255x200/about-section-2.jpg" className="img-fluid full-width" alt="Histry"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-padding how-it-works bg-light-theme">
                <div className="container mx-auto lg:px-2 px-4">
                    <div className="text-center mb-8">
                        <h2 className="font-semibold text-3xl uppercase tracking-wider tracking-widest">How Does It Work</h2>
                        <div className="w-[60px] h-[2px] bg-primary my-4 mx-auto"></div>
                        <h3 className="alexBrush text-3xl capitalize text-headGray">Our Process</h3>
                    </div>
                    
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div className="">
                            <div className="how-it-works-box arrow-1">
                                <div className="how-it-works-box-inner"> 
                                    <div className="icon-box">
                                        <img src="./media/frontend/img/001-search.png" alt="icon"/>
                                        <span className="number-box">01</span>
                                    </div>
                                    <h6 className='font-semibold text-xl uppercase !mb-2'>Search</h6>
                                    <p className='mb-0 text-lg text-headGray'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="how-it-works-box arrow-2">
                                <div className="how-it-works-box-inner"> 
                                    <div className="icon-box">
                                        <img src="./media/frontend/img/004-shopping-bag.png" alt="icon"/>
                                        <span className="number-box">02</span>
                                    </div>
                                    <h6 className='font-semibold text-xl uppercase !mb-2'>Select</h6>
                                    <p className='mb-0 text-lg text-headGray'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="how-it-works-box arrow-1">
                                <div className="how-it-works-box-inner"> 
                                    <div className="icon-box">
                                        <img src="./media/frontend/img/002-stopwatch.png" alt="icon"/>
                                        <span className="number-box">03</span>
                                    </div>
                                    <h6 className='font-semibold text-xl uppercase !mb-2'>Order</h6>
                                    <p className='mb-0 text-lg text-headGray'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="how-it-works-box">
                                <div className="how-it-works-box-inner"> 
                                    <div className="icon-box">
                                        <img src="./media/frontend/img/003-placeholder.png" alt="icon"/>
                                        <span className="number-box">04</span>
                                    </div>
                                    <h6 className='font-semibold text-xl uppercase !mb-2'>Enjoy</h6>
                                    <p className='mb-0 text-lg text-headGray'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="our-blog restaurent-ad">
                <div className="">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="ad-img p-relative py-24">
                                <div className="container mx-auto lg:px-2 px-4">
                                    <div className="history-title relative z-10">
                                        <h2 className="lg:text-start text-center font-semibold text-2xl text-white uppercase text-secondary tracking-wider tracking-widest">
                                            Shef Cloud
                                        </h2>
                                        <div className="w-[60px] h-[2px] bg-primary my-6 lg:mx-0 mx-auto"></div>
                                        <h3 className="lg:text-start text-center font-semibold text-4xl text-white uppercase text-secondary tracking-wider tracking-widest">
                                            More than 3000 Dishes
                                        </h3>
                                        <p className="lg:text-start text-center mb-6 text-lg text-white text-headGray">
                                            Book a dish easly at the best price
                                        </p>
                                        <div className='lg:text-start text-center '>
                                            <Link to='/all-dish-detail' className="rounded-md py-2 px-6 text-base tracking-wider uppercase font-semibold whitespace-nowrap bg-primary py-3 !text-white border border-transparent hover:border-primaryGreen hover:!text-green-400 ">
                                                View All
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
export default About