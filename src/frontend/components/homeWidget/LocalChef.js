import React from 'react';
const LocalChef = () => {
    return (
        <>
            <div className='loveLocalChef'>
                <div className=''>
                    <div className=''>
                        <div className='grid grid-cols-12'>
                            <div className='lg:col-span-6 col-span-12'>
                                <img src='./media/frontend/img/banner/local-chef.jpg' className='lg:w-full sm:w-1/2 w-full mx-auto lg:mt-0 sm:mt-12 mt-0' alt='Love Local Chef' />
                            </div>
                            <div className='lg:col-span-6 col-span-12 my-auto'>
                                <div className='p-12 lg:text-start text-center'>
                                    <h1 className='font-semibold text-3xl uppercase text-white  tracking-widest'>
                                        Made with love, by your local shefs
                                    </h1>
                                    <div className='w-[60px] h-[2px] bg-primary my-6 lg:mx-0 mx-auto'></div>
                                    <h3 className='alexBrush text-3xl text-headGray'>
                                        Quality first
                                    </h3>
                                    <div className='mt-8 mb-6'>
                                        <h2 className='text-semibold text-xl text-white mb-2'>Healthy, authentic meals</h2>
                                        <div className='lg:w-4/5 sm:w-2/3 w-full lg:mx-0 mx-auto'>
                                            <p className='mb-0 text-base text-headGray'>
                                                Discover 1000’s of nutritious homemade meals,
                                                the type of dishes that separate mom’s cooking from everything else.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='mt-8 mb-6'>
                                        <h2 className='text-semibold text-xl text-white mb-2'>Handcrafted locally</h2>
                                        <div className='lg:w-4/5 sm:w-2/3 w-full lg:mx-0 mx-auto'>
                                            <p className='mb-0 text-base text-headGray'>
                                                Locally crafted with fresh, quality ingredients in small
                                                batches by your shef - never shipped, mass produced or frozen.
                                            </p>
                                        </div>

                                    </div>
                                    <div className='mt-8 mb-6'>
                                        <h2 className='text-semibold text-xl text-white mb-2'>Higher quality for less</h2>
                                        <div className='lg:w-4/5 sm:w-2/3 w-full lg:mx-0 mx-auto'>
                                            <p className='mb-0 text-base text-headGray'>
                                                Freshly prepared, chilled and delivered to your doorstep,
                                                starting at just Pkr 900 per meal.
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

export default LocalChef;
