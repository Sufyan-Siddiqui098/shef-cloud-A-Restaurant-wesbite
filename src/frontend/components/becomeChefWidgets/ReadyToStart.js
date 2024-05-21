import React from 'react';
import { Link } from 'react-router-dom'
const ReadyToStart = () => {
    return (
        <>
            <div className='ready_toStart'>
                <div className='py-16 lg:px-2 px-4'>
                    <div className='container mx-auto'>
                        <div className='lg:w-[60%] md:[80%] w-full mx-auto text-center'>
                            <h1 className='font-semibold sm:text-4xl text-secondary text-4xl md:leading-tight leading-snug uppercase tracking-widest'>
                                Ready to start cooking?
                            </h1>
                            <div className='w-[80px] h-[2px] bg-primary mx-auto my-6'></div>
                            <div className='w-full'>
                                <p className='text-xl text-black mb-8 mt-5'>
                                    Join a community of shefs cooking in your neighborhood.
                                </p>
                                <div className='w-full text-center'>
                                    <Link className='rounded-md py-3 px-6 text-lg font-semibold whitespace-nowrap bg-primary !text-white hover:text-green-400'>Get Started</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReadyToStart;
