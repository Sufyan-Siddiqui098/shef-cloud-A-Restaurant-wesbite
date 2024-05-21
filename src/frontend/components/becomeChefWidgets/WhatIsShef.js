import React from 'react';
// import { Link } from 'react-router-dom'
const whatIsShef = () => {
    return (
        <>
            <div className='what_isShef'>
                <div className='py-16 lg:px-2 px-4'>
                    <div className='container mx-auto'>
                        <div className='text-center mb-8'>
                            <h1 className='font-semibold text-3xl uppercase tracking-widest'>
                                What is Shef Cloud?
                            </h1>
                            <div className='w-[60px] h-[2px] bg-primary my-4 mx-auto'></div>
                            <h3 className='alexBrush text-3xl capitalize text-headGray'>
                                Shef Cloud Talent
                            </h3>
                            <p className='text-lg'>
                                Shef connects talented cooks with local customers.
                            </p>
                            <p className='text-lg mt-3'>
                                We believe in providing the shefs in our community — individuals who have always
                                dreamt of building their own food business — the opportunity to make a meaningful
                                income by doing what they love! We also believe that every person should have access
                                to a wholesome, homemade meal at an affordable price. Building a community devoted
                                to economic empowerment and cultural inclusivity — that’s why we started Shef Cloud.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default whatIsShef;
