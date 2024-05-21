import React from 'react';
const Subscriber = () => {
    return (
        <>
            <div className='subscribeBanner'>
                    <div className='container mx-auto lg:px-0 px-4'>
                        <div className='py-20 text-center'>
                            <h1 className='font-semibold md:text-5xl text-3xl uppercase text-white tracking-wider tracking-widest'>
                                To Get Regular Update
                            </h1>
                            <div className='w-[80px] h-[2px] bg-primary mx-auto my-6'></div>
                            <h3 className='alexBrush text-4xl text-headGray'>
                                Subscribe
                            </h3>
                            <div className='lg:w-2/4 sm:w-1/2 w-full mx-auto'>
                                <div className='bnrSearchBar flex gap-x-2'>
                                    <input type='email' className='py-2 h-[45px] border border-headGray text-base focus:border-primary' placeholder='Enter your Email' required/>
                                    <button className='rounded-md py-2 px-4 text-base font-semibold whitespace-nowrap bg-primary text-white hover:text-green-400 uppercase tracking-wider'>Submit</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>    
                </div>
        </>
    );
};

export default Subscriber;
