import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { Helmet } from 'react-helmet';
import '../assets/css/dash-style.css';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../store/slice/user';
import { toast } from 'react-toastify';
import { emptyCart } from '../../store/slice/cart';
import isValidURL from '../../ValidateUrl';

export const Header = () => {
    const [isSubMenuVisible, setSubMenuVisible] = useState(false);
    const toggleBox = () => {
        setSubMenuVisible(!isSubMenuVisible);
    };
    const [isMobMenuVisible, setMobMenuVisible] = useState(false);
    const toggleMobBox = () => {
        setMobMenuVisible(!isMobMenuVisible);
    };

    // User from redux
    const { userInfo } = useSelector(state => state.user)
    //Logout
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = ()=>{
        dispatch(signOutUser()); 
        dispatch(emptyCart());
        toast.success("Logout Successfully ")
        navigate('/login')
    }

    return (
        <>
            <Helmet>
                <title>Shef Dashboard | Shef Cloud</title>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" rel="stylesheet"></link>
            </Helmet>
            <div className='border-b border-borderClr bg-grayBg '>
                <div className='px-5'>
                    <header className='py-3 '>
                        <div className='grid grid-cols-12'>
                            <div className='lg:col-span-10 col-span-8 my-auto'>
                                {/* Desktop View  */}
                                <ul className='lg:flex items-center hidden my-auto'>
                                    <li className='lg:inline-block shefD_nav mr-8 h-full'>
                                        <NavLink to='/'>
                                            <img src="/media/frontend/img/logo/line-logo.jpg" width='' className="img-fluid h-[40px]" alt="Logo" />
                                            {/* <span className='text-2xl font-bold'>Logo</span> */}
                                        </NavLink>
                                    </li>
                                    <li className='lg:inline-block shefD_nav mr-5'>
                                        <NavLink to="/shef/dashboard" className="text-lg font-semibold !text-secondary hover:!text-primary">Dashboard</NavLink>
                                    </li>
                                    <li className='lg:inline-block shefD_nav mr-5'>
                                        <NavLink to="/shef/my-menu" className="text-lg font-semibold !text-secondary hover:!text-primary">My Menu</NavLink>
                                    </li>
                                    <li className='lg:inline-block shefD_nav mr-5 relative'>
                                        <NavLink onClick={toggleBox} className="text-lg font-semibold !text-secondary hover:!text-primary flex items-center gap-x-3 ">
                                            <span>Reports</span>
                                            {isSubMenuVisible
                                                ?
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,1)">
                                                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,1)">
                                                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                                                </svg>
                                            }

                                        </NavLink>
                                        {/* Open Menu Box */}
                                        {isSubMenuVisible && (
                                            <ul className='absolute left-0 top-9 bg-white w-[200px] p-3 rounded-md border border-borderClr'>
                                                <li className='block border-b border-borderClr mb-2 pb-2'>
                                                    <NavLink to="/shef/order" className="text-lg font-semibold !text-secondary hover:!text-primary">Order </NavLink>
                                                </li>
                                                <li className='block border-b border-borderClr mb-2 pb-2'>
                                                    <NavLink to="/shef/sales-statment" className="text-lg font-semibold !text-secondary hover:!text-primary">Sales Statement </NavLink>
                                                </li>
                                                <li className='block border-b border-borderClr mb-2 pb-2'>
                                                    <NavLink to="/shef/coupon" className="text-lg font-semibold !text-secondary hover:!text-primary">Coupon </NavLink>
                                                </li>
                                                <li className='block'>
                                                    <NavLink to="/shef/order-review" className="text-lg font-semibold !text-secondary hover:!text-primary">Order Reviews  </NavLink>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                                {/* Mobile View */}
                                <div className='flex items-center md:gap-x-3 gap-x-2 lg:hidden block'>
                                    <div onClick={toggleMobBox}>
                                        {isMobMenuVisible
                                            ?
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
                                                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
                                                <path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path>
                                            </svg>
                                        }
                                    </div>
                                    <div>
                                        {isMobMenuVisible && (
                                            <ul className='absolute left-0 top-16 z-10 bg-borderClr w-full p-6 border border-borderClr'>
                                                <li className='block border-b border-borderClr mb-2 pb-2'>
                                                    <NavLink to="/shef/dashboard" className="text-lg font-semibold !text-secondary hover:!text-primary">Dashboard</NavLink>
                                                </li>
                                                <li className='block border-b border-borderClr mb-2 pb-2'>
                                                    <NavLink to="/shef/my-menu" className="text-lg font-semibold !text-secondary hover:!text-primary">My Menu</NavLink>
                                                </li>
                                                <li className='block border-b border-borderClr mb-2 pb-2'>
                                                    <NavLink to="/shef/order" className="text-lg font-semibold !text-secondary hover:!text-primary">Order </NavLink>
                                                </li>
                                                <li className='block border-b border-borderClr mb-2 pb-2'>
                                                    <NavLink to="/shef/sales-statment" className="text-lg font-semibold !text-secondary hover:!text-primary">Sales Statement </NavLink>
                                                </li>
                                                <li className='block border-b border-borderClr mb-2 pb-2'>
                                                    <NavLink to="/shef/coupon" className="text-lg font-semibold !text-secondary hover:!text-primary">Coupon </NavLink>
                                                </li>
                                                <li className='block'>
                                                    <NavLink to="/shef/order-review" className="text-lg font-semibold !text-secondary hover:!text-primary">Order Reviews  </NavLink>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                    <NavLink>
                                        <img src="/media/frontend/img/logo/line-logo.jpg" width='' className="img-fluid h-[30px]" alt="Logo" />
                                    </NavLink>
                                </div>
                            </div>
                            <div className="lg:col-span-2 col-span-4 flex justify-between items-center gap-2 w-max group relative">
                                <NavLink to="/shef/profile">
                                    <div className='flex items-center justify-end gap-2 '>
                                        <img src={(userInfo.profile_pic && isValidURL(userInfo.profile_pic)) ? 
                                            userInfo.profile_pic : 
                                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                            } 
                                            width='' 
                                            className="img-fluid border h-[40px]" 
                                            alt="Logo" 
                                        />
                                        <span className='font-semibold text-lg md:block hidden'>
                                            Hi, { userInfo.first_name }
                                        </span>
                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </div>
                                </NavLink>
                                
                                <div 
                                    className='absolute hidden p-1 px-2 right-0 w-max md:w-[150px] shadow-sm rounded border bg-white top-[100%] min-h-16 justify-center items-center group-hover:flex'
                                >
                                    <button 
                                        onClick={handleSignOut} 
                                        className='rounded p-1 w-full border bg-gray-50  border-black text-primary hover:text-white hover:bg-primary'
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        </>
    )
}
export default Header