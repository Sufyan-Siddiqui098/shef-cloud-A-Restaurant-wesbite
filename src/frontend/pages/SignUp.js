import React, { useEffect, useState } from 'react'
import '../assets/css/main-style.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { handleUserSignUp } from '../auth/Auth'
import { toast } from 'react-toastify'

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        email: "", 
        password: "", 
        phone: "",
        first_name: "",
        last_name: ""
    })
    const [isPending, setIsPending] = useState(false);
    
    const {userInfo} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    
    // Input field - OnChnage
    const handleChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    // Form submit
    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            setIsPending(true);
            const res = await handleUserSignUp(credentials);
            // if(res.email) {
                toast.success(res.message || "Register Successfully")
                navigate('/login')
            // }
        }catch(error){
            toast.error(error.message);
        } finally{
            setIsPending(false);
        }
    }

    useEffect(()=>{
        if(userInfo) navigate("/")
    }, [userInfo, navigate])

    const backgroundStyle = {
        backgroundImage: 'url("./media/frontend/img/banner/collection-1.jpg")',
    }; 
    return (
        <>
            <div className='position-relative h-[97vh] md:px-2 px-4'>
                <div className='lg:w-2/3 w-full mx-auto h-full flex items-center my-auto py-5'>
                    <div className="authForm">
                        <div className='grid grid-cols-12'>
                            <div className='md:col-span-6 col-span-12 md:order-1 order-2'>
                                <div className="form-container md:p-12 p-6 text-center">
                                    <h1 className='genHead text-center mb-4'>Sign up</h1>
                                    <div className='w-[40px] h-[2px] bg-primary mx-auto mb-6'></div>
                                    <form action="#" onSubmit={handleSubmit}>
                                        <input className='mb-3' value={credentials.email} onChange={handleChange} name="email" type="email" placeholder="Email" required/>
                                        <input className='mb-3' value={credentials.first_name} onChange={handleChange} name="first_name" type="text" placeholder="First Name" required />
                                        <input className='mb-3' value={credentials.last_name} onChange={handleChange} name="last_name" type="text" placeholder="Last Name" required />
                                        <input className='mb-3' value={credentials.phone} onChange={handleChange} name="phone" type="text" placeholder="Phone" required />
                                        <input className='mb-3' value={credentials.password} onChange={handleChange} name="password" type="password" placeholder="Password" required />
                                        <div className='term'>
                                            <input className='mb-3' type="checkbox" required/>
                                            <p>
                                                By selecting "Sign up" you agree to Shef's&nbsp;
                                                <Link to="/terms-of-servies">Terms of Service</Link>,&nbsp;
                                                <Link to="/privacy-policy">Privacy Policy</Link>,
                                                and to receive text messages
                                            </p>
                                        </div>
                                        <div className='forgotTxt'>
                                            Already have an account? &nbsp;
                                            <Link className='font-semibold' to='/login'>Sign in</Link>
                                        </div>
                                        <button disabled={isPending} className='mt-3 fillBtn disabled:cursor-not-disabled:opacity-60' type=''>Submit</button>
                                    </form>
                                </div>
                            </div>
                            <div className='md:col-span-6 col-span-12 md:order-2 order-1'>
                                <div className="authImgSide lg:py-0 py-24" style={backgroundStyle}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp