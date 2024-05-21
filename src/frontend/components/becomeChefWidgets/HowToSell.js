import React from 'react';
import { Link } from 'react-router-dom'
const HowToSell = () => {
    return (
        <>
            <div className='how_toSell bg-primaryLight'>
                <div className='py-16 lg:px-2 px-4'>
                    <div className='container mx-auto'>
                        <div className='mb-12'>
                            <h1 className='font-semibold text-3xl uppercase tracking-widest text-center '>
                                How to sell on Shef
                            </h1>
                            <div className='w-[60px] h-[2px] bg-primary my-4 mx-auto'></div>
                        </div>
                        <div className='flex flex-wrap gap-5 justify-center'>
                            <div className='lg:w-[30%] md:w-[45%] w-full'>
                                <div className='p-6 border border-borderClr rounded-[20px] hover:bg-primaryLight h-full relative'>
                                    <h2 className='absolute right-0 top-1 font-bold text-primary opacity-5 text-[120px] leading-[100%]'>01</h2>
                                    <div className=''>
                                        <h2 className='text-xl uppercase font-bold'>Get approved to cook</h2>
                                        <div className='w-[85%]'>
                                            <p className='text-lg mb-0 leading-tight'>
                                                <Link to='/login' className='font-medium'>Sign up</Link> and create your personal menu of dishes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-[30%] md:w-[45%] w-full'>
                                <div className='p-6 border border-borderClr rounded-[20px] hover:bg-primaryLight h-full relative'>
                                    <h2 className='absolute right-0 top-1 font-bold text-primary opacity-5 text-[120px] leading-[100%]'>02</h2>
                                    <div className=''>
                                        <h2 className='text-xl uppercase font-bold'>Pick your schedule</h2>
                                        <div className='w-[85%]'>
                                            <p className='text-lg mb-0 leading-tight'>
                                                Choose the days you’d like to cook. As little or as much as you’d like.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-[30%] md:w-[45%] w-full'>
                                <div className='p-6 border border-borderClr rounded-[20px] hover:bg-primaryLight h-full relative'>
                                    <h2 className='absolute right-0 top-1 font-bold text-primary opacity-5 text-[120px] leading-[100%]'>03</h2>
                                    <div className=''>
                                        <h2 className='text-xl uppercase font-bold'>Prepare your orders</h2>
                                        <div className='w-[85%]'>
                                            <p className='text-lg mb-0 leading-tight'>
                                                Customers can start ordering from you on Shef. They’ll order at least a
                                                day in advance so you have enough time to get ingredients and prepare their dishes.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-[30%] md:w-[45%] w-full'>
                                <div className='p-6 border border-borderClr rounded-[20px] hover:bg-primaryLight h-full relative'>
                                    <h2 className='absolute right-0 top-1 font-bold text-primary opacity-5 text-[120px] leading-[100%]'>04</h2>
                                    <div className=''>
                                        <h2 className='text-xl uppercase font-bold'>Cool your dishes</h2>
                                        <div className='w-[85%]'>
                                            <p className='text-lg mb-0 leading-tight'>
                                                Once you’ve finished cooking, safely cool your dishes and prepare them for delivery.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-[30%] md:w-[45%] w-full'>
                                <div className='p-6 border border-borderClr rounded-[20px] hover:bg-primaryLight h-full relative'>
                                    <h2 className='absolute right-0 top-1 font-bold text-primary opacity-5 text-[120px] leading-[100%]'>05</h2>
                                    <div className=''>
                                        <h2 className='text-xl uppercase font-bold'>Serve your customers</h2>
                                        <div className='w-[85%]'>
                                            <p className='text-lg mb-0 leading-tight'>
                                                We’ll help you identify the best delivery method available so your customers can get their food safely and on time.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowToSell;
