import React from 'react';
import { Link } from 'react-router-dom';
const MeetChef = () => {
    return (
        <>
            <div className='meetChef bg-primaryLight'>
                <div className='py-16'>
                    <div className='container mx-auto lg:px-2 px-4'>
                        <div className='grid grid-cols-12'>
                            <div className='lg:col-span-6 col-span-12'>
                                <div className='lg:py-12 lg:pr-12 lg:text-start text-center'>
                                    <h1 className='font-semibold text-3xl uppercase text-secondary tracking-wider tracking-widest'>
                                        Meet the shefs
                                    </h1>
                                    <div className='w-[60px] h-[2px] bg-primary my-6 lg:mx-0 mx-auto'></div>
                                    <h3 className='alexBrush text-3xl text-headGray'>
                                        Our Experts
                                    </h3>
                                    <div className='mt-8 mb-6'>
                                        <div className='lg:w-4/5 w-full'>
                                            <p className='mb-0 text-lg text-headGray'>
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                                                Fuga, animi assumenda! Mollitia nemo dicta ad, veniam ab iste 
                                                omnis ipsa magni sapiente quas sed fuga, nulla ducimus 
                                                laboriosam repellat id.
                                            </p>
                                        </div>
                                    </div>
                                    <Link to='/all-chef' className='rounded-md py-2 px-6 text-base tracking-wider uppercase font-semibold whitespace-nowrap bg-primary py-3 !text-white border border-transparent hover:border-primaryGreen hover:!text-green-400 '>All Chefs</Link>
                                    {/* <Link to='/all-chef' className='rounded-md py-2 px-6 text-base tracking-wider uppercase font-semibold whitespace-nowrap bg-primary py-3 !text-white border border-transparent hover:border-primaryGreen hover:!text-green-400 '>Read More</Link> */}
                                </div>
                            </div>
                            {/* <div className='lg:col-span-6 col-span-12'>
                                <div className='grid lg:grid-cols-3 md:grid-cols-4 grid-cols-2 gap-5 lg:mt-0 mt-8'>
                                    <div className='border border-primary border-dashed p-2 rounded-lg'>
                                        <img src='./media/frontend/img/banner/chef-1.webp' className='rounded-lg w-full h-[140px] object-top object-cover shadow-xl' alt='Chef' />
                                    </div>
                                    <div className='border border-primary border-dashed p-2 rounded-lg'>
                                        <img src='./media/frontend/img/banner/chef-2.webp' className='rounded-lg w-full h-[140px] object-top object-cover shadow-xl' alt='Chef' />
                                    </div>
                                    <div className='border border-primary border-dashed p-2 rounded-lg'>
                                        <img src='./media/frontend/img/banner/chef-3.webp' className='rounded-lg w-full h-[140px] object-top object-cover shadow-xl' alt='Chef' />
                                    </div>
                                    <div className='border border-primary border-dashed p-2 rounded-lg'>
                                        <img src='./media/frontend/img/banner/chef-4.webp' className='rounded-lg w-full h-[140px] object-top object-cover shadow-xl' alt='Chef' />
                                    </div>
                                    <div className='border border-primary border-dashed p-2 rounded-lg'>
                                        <img src='./media/frontend/img/banner/chef-5.webp' className='rounded-lg w-full h-[140px] object-top object-cover shadow-xl' alt='Chef' />
                                    </div>
                                    <div className='border border-primary border-dashed p-2 rounded-lg'>
                                        <img src='./media/frontend/img/banner/chef-6.webp' className='rounded-lg w-full h-[140px] object-top object-cover shadow-xl' alt='Chef' />
                                    </div>
                                    <div className='border border-primary border-dashed p-2 rounded-lg'>
                                        <img src='./media/frontend/img/banner/chef-7.webp' className='rounded-lg w-full h-[140px] object-top object-cover shadow-xl' alt='Chef' />
                                    </div>
                                    <div className='border border-primary border-dashed p-2 rounded-lg'>
                                        <img src='./media/frontend/img/banner/chef-8.webp' className='rounded-lg w-full h-[140px] object-top object-cover shadow-xl' alt='Chef' />
                                    </div>
                                    <div className='border border-primary border-dashed p-2 rounded-lg'>
                                        <img src='./media/frontend/img/banner/chef-4.webp' className='rounded-lg w-full h-[140px] object-top object-cover shadow-xl' alt='Chef' />
                                    </div>
                                    
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>    
            </div>
        </>
    );
};

export default MeetChef;
