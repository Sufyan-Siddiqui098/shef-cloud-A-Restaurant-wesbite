import React from 'react'
import { useSelector } from 'react-redux'
import isValidURL from '../../../ValidateUrl';

export const ProfileDetail = () => {
    const { userInfo } = useSelector(state => state.user);
    return (
        <div>
            <div className='p-5 rounded-xl border border-borderClr mb-6'>
                <div className='flex md:flex-row flex-col items-center gap-4'>
                    <img 
                        src={userInfo?.profile_pic ?
                         userInfo.profile_pic :  
                         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                         } 
                         className="img-fluid !w-[200px] h-[210px] object-cover object-top rounded-lg" 
                         alt="Logo" 
                    />
                    <div className='sm:text-start text-center'>
                        <h2 className='text-xl font-bold mb-0'>
                            {`${userInfo?.first_name} ${userInfo.last_name}`}
                            {/* Max Smith */}
                        </h2>
                        <div className='flex items-center sm:justify-start justify-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#a0a3a7">
                                <path d="M2.24283 6.85435L11.4895 1.3086C11.8062 1.11865 12.2019 1.11872 12.5185 1.30878L21.7573 6.85433C21.9079 6.9447 22 7.10743 22 7.28303V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7.28315C2 7.10748 2.09218 6.94471 2.24283 6.85435ZM4 8.13261V19H20V8.13214L12.0037 3.33237L4 8.13261ZM12.0597 13.6983L17.3556 9.23532L18.6444 10.7647L12.074 16.3017L5.36401 10.7717L6.63599 9.2283L12.0597 13.6983Z"></path>
                            </svg>
                            <h3 className='text-lg font-medium text-headGray mb-0'>
                                {/* maxsmith@mail.com */}
                                {userInfo.email}
                            </h3>
                        </div>
                        <div className='flex items-center sm:justify-start justify-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#a0a3a7">
                                <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path>
                            </svg>
                            <h3 className='text-lg font-medium text-headGray mb-0'>
                                {/* 0300 0000 000 */}
                                {userInfo.phone}
                            </h3>
                        </div>

                        <div className='grid sm:grid-cols-3 grid-cols-2 gap-4 mt-4'>
                            <div className='sm:p-4 p-3 rounded-lg border border-borderClr lg:w-[160px] sm:w-[145px] w-full h-full'>
                                <h2 className='text-xl font-bold mb-0'>$2400</h2>
                                <p className='lg:text-base sm:text-[12px] font-medium text-headGray mb-0'>Earning</p>
                            </div>
                            <div className='sm:p-4 p-3 rounded-lg border border-borderClr lg:w-[160px] sm:w-[145px] w-full h-full'>
                                <h2 className='text-xl font-bold mb-0'>87</h2>
                                <p className='lg:text-base sm:text-[12px] font-medium text-headGray mb-0'>Dishes</p>
                            </div>
                            <div className='sm:p-4 p-3 rounded-lg border border-borderClr lg:w-[160px] sm:w-[145px] w-full h-full'>
                                <h2 className='text-xl font-bold mb-0'>80%</h2>
                                <p className='lg:text-base sm:text-[12px] font-medium text-headGray mb-0'>Success Review</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileDetail