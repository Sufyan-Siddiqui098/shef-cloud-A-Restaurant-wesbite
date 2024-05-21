import React, { useState } from 'react';
import { handleUserSignUp } from '../../auth/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const HeroBanner = () => {

    const [credentials, setCredentials] = useState({
        email: "", 
        password: "", 
        phone: "",
        first_name: "",
        last_name: ""
    })

    const navigate = useNavigate();

     // Input field - OnChnage
     const handleChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    // Form submit
    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            const res = await handleUserSignUp(credentials);
            if(res.email) {
                toast.success("Register Successfully")
                navigate('/login')
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className='heroBanner'>
                    <div className='container mx-auto'>
                        <div className='md:py-20 py-12 lg:px-0 px-4'>
                            <div className='grid grid-cols-12 gap-4'>
                                <div className='lg:col-span-4 col-span-12 lg:order-1 order-2'>
                                    <div className="content-wrapper bg-white rounded-lg px-6 py-8">
                                        <div className="content-box text-center">
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group mb-4">
                                                    <input onChange={handleChange} value={credentials.email} type="email" name="email" className="" placeholder="Email" required/>
                                                </div>
                                                <div className="form-group mb-4">
                                                    <input onChange={handleChange} value={credentials.first_name} type="text" name="first_name" className="" placeholder="First Name" required />
                                                </div>
                                                <div className="form-group mb-4">
                                                    <input onChange={handleChange} value={credentials.last_name} type="text" name="last_name" className="" placeholder="Last Name" required />
                                                </div>
                                                <div className="form-group mb-4">
                                                    <input onChange={handleChange} value={credentials.phone} type="text" name="phone" className="" placeholder="Mobile Number" required />
                                                </div>
                                                <div className="form-group mb-8">
                                                    <input onChange={handleChange} value={credentials.password} type="password" name="password" className="" placeholder="Password" required />
                                                </div>
                                                <div className="form-group">
                                                <button className="rounded-md py-2 px-4 text-base font-semibold whitespace-nowrap bg-primary text-white hover:text-green-400 uppercase tracking-wider">Get Started</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='lg:col-span-8 col-span-12 my-auto lg:order-2 order-1'>
                                    <div className='lg:pl-10 lg:text-start text-center'>
                                        <h1 className='font-semibold sm:text-5xl text-4xl md:leading-tight leading-snug uppercase text-white tracking-widest'>
                                            Finest Culinary Delights
                                        </h1>
                                        <div className='w-[80px] h-[2px] bg-primary lg:mx-0 mx-auto my-6'></div>
                                        <h3 className='alexBrush text-3xl text-headGray mb-0'>
                                            Start your experience
                                        </h3>
                                        <div className='lg:w-1/2 w-full lg:mx-0 mx-auto'>
                                            <p className='text-base text-white mb-4 mt-5'>
                                                Explore quality, authentic meals - directly from local 
                                                trusted chefs to your doorstep.
                                            </p>
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

export default HeroBanner;
