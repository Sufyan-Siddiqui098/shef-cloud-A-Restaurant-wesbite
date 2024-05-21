import React, { useState } from 'react';
import { Link } from 'react-router-dom'
const TopBanner = () => {
    const [formData, setFormData] = useState({
        first_name: "", 
        last_name: "", 
        email: "", 
        password: "", 
        zip_code: "", 
        phone: ""
    })

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <>
            <div className='become_aChef'>
                <div className='py-16 lg:px-2 px-4'>
                    <div className='container mx-auto'>
                        <form>
                            <div className='grid grid-cols-12 md:gap-x-10 gap-x-0'>
                                
                                <div className='lg:col-span-7 col-span-12 lg:order-1 order-2'>
                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-2 '>
                                        <div className="form-group">
                                            <input value={formData.first_name} onChange={handleChange} required type="text" name="first_name" className="" placeholder="First Name"/>
                                        </div>
                                        <div className="form-group">
                                            <input value={formData.last_name} onChange={handleChange} required type="text" name="last_name" className="" placeholder="Last Name"/>
                                        </div>
                                        <div className="form-group">
                                            <input value={formData.email} onChange={handleChange} required type="email" name="email" className="" placeholder="Email"/>
                                        </div>
                                        <div className="form-group">
                                            <input value={formData.password} onChange={handleChange} required type="password" name="password" className="" placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                            <input value={formData.zip_code} onChange={handleChange} required type="text" name="zip_code" className="" placeholder="Zip Code"/>
                                        </div>
                                        <div className="form-group">
                                            <input value={formData.phone} onChange={handleChange} required type="text" name="phone" className="" placeholder="Mobile Number"/>
                                        </div>
                                    </div>
                                    <div className='flex mt-3'>
                                        <div className='w-[7%]'>
                                            <input className='mt-1 mr-2' type="checkbox" required />
                                        </div>
                                        <div className='w-[93%]'>
                                            <p className='text-white '>
                                                I agree to Shef's&nbsp;
                                                <Link to='/terms-of-servies' className='!underline'>Terms of Service</Link>,&nbsp;
                                                and to receive marketing text messages.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex mt-3'>
                                        <div className='w-[7%]'>
                                            <input className='mt-1 mr-2' type="checkbox" required />
                                        </div>
                                        <div className='w-[93%]'>
                                            <p className='text-white'>
                                                I acknowledge and agree that I am an independent business and authorized to earn income in the United States.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <button className="grid-row-s rounded-md py-2 px-8 text-base font-semibold whitespace-nowrap bg-primary text-white hover:text-green-400 uppercase tracking-wider">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <div className='lg:col-span-5 col-span-12 my-auto lg:order-2 order-1'>
                                    <div className='lg:text-start text-center'>
                                        <h1 className='font-semibold sm:text-5xl text-4xl md:leading-tight leading-snug uppercase text-white tracking-wider tracking-widest'>
                                            Make money doing what you love
                                        </h1>
                                        <div className='w-[80px] h-[2px] bg-primary my-6 lg:mx-0 mx-auto'></div>
                                        <h3 className='alexBrush text-3xl text-headGray hidden'>
                                            Start your experience
                                        </h3>
                                        <div className='w-full'>
                                            <p className='text-xl text-white lg:mb-4 mb-8 mt-5'>
                                                We give you the tools to run your own food business, on your terms.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopBanner;
