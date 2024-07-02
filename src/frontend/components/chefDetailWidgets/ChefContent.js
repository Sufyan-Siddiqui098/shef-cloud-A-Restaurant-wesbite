import React from 'react';
const ChefContent = ({chefAndDishes}) => {
   
    return (
        <>
            <div className='pb-16 pt-8 lg:px-2 px-4'>
                <div className='container mx-auto'>
                    <img src={chefAndDishes.cover_pic ? chefAndDishes.cover_pic :'/media/frontend/img/shef-detail/defaultImage.png'} className='object-top rounded-[16px] w-full object-cover h-[250px]' alt='Chef Cover' />
                    <div className='flex lg:flex-row flex-col gap-4 lg:mt-[-80px] mt-[-200px] px-3'>
                        <div className='lg:w-[270px] md:w-[35%] w-full'>
                            <img src={chefAndDishes.profile_pic ? chefAndDishes.profile_pic : '/media/frontend/img/banner/female-chef.png'} className='object-top rounded-[16px] w-full object-cover lg:h-full h-[260px] border-[5px] border-white' alt='Love Local Chef' />
                        </div>
                        <div className='w-full'>
                            <div className='flex lg:flex-row flex-col lg:items-center lg;justify-between lg:pt-[100px] md:pt-4 pt-2'>
                                <div className='flex items-center gap-x-2'>
                                    <h1 className='text-2xl font-semibold mb-0'>{chefAndDishes.first_name} {chefAndDishes.last_name }</h1>
                                    { chefAndDishes.email_verified_at &&  <div className='rounded-sm py-1 px-2 flex items-center gap-x-2'>
                                        <h2 className='text-xs mb-0'>Verified </h2>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(11,122,224,1)">
                                            <path d="M10.007 2.10377C8.60544 1.65006 7.08181 2.28116 6.41156 3.59306L5.60578 5.17023C5.51004 5.35763 5.35763 5.51004 5.17023 5.60578L3.59306 6.41156C2.28116 7.08181 1.65006 8.60544 2.10377 10.007L2.64923 11.692C2.71404 11.8922 2.71404 12.1078 2.64923 12.308L2.10377 13.993C1.65006 15.3946 2.28116 16.9182 3.59306 17.5885L5.17023 18.3942C5.35763 18.49 5.51004 18.6424 5.60578 18.8298L6.41156 20.407C7.08181 21.7189 8.60544 22.35 10.007 21.8963L11.692 21.3508C11.8922 21.286 12.1078 21.286 12.308 21.3508L13.993 21.8963C15.3946 22.35 16.9182 21.7189 17.5885 20.407L18.3942 18.8298C18.49 18.6424 18.6424 18.49 18.8298 18.3942L20.407 17.5885C21.7189 16.9182 22.35 15.3946 21.8963 13.993L21.3508 12.308C21.286 12.1078 21.286 11.8922 21.3508 11.692L21.8963 10.007C22.35 8.60544 21.7189 7.08181 20.407 6.41156L18.8298 5.60578C18.6424 5.51004 18.49 5.35763 18.3942 5.17023L17.5885 3.59306C16.9182 2.28116 15.3946 1.65006 13.993 2.10377L12.308 2.64923C12.1078 2.71403 11.8922 2.71404 11.692 2.64923L10.007 2.10377ZM6.75977 11.7573L8.17399 10.343L11.0024 13.1715L16.6593 7.51465L18.0735 8.92886L11.0024 15.9999L6.75977 11.7573Z"></path>
                                        </svg>
                                    </div>}
                                </div>

                                <div className='flex md:flex-nowrap flex-wrap gap-2'>
                                    {/* <div className='inline-flex items-center border border-primaryLight rounded px-2 py-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                            <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
                                        </svg>
                                        <h4 className='mb-0 text-sm pl-1'>Grove City, Ohio</h4>
                                    </div> */}
                                    <div className='inline-flex items-center border border-primaryLight rounded px-2 py-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#ec2044" preserveAspectRatio="xMidYMid meet" focusable="false">
                                            <path d="M12.9001 5.38615C12.9 4.8891 12.497 4.48623 11.9999 4.48633C11.5029 4.48642 11.1 4.88945 11.1001 5.3865L11.1003 6.54736C9.13052 6.70773 7.35212 7.39713 6.02837 8.55488C4.4961 9.895 3.60415 11.8376 3.7231 14.212C3.73643 14.4781 3.95606 14.687 4.22247 14.687H19.7783C20.0448 14.687 20.2644 14.478 20.2777 14.2119C20.3961 11.8375 19.5039 9.89497 17.9717 8.55488C16.648 7.39714 14.8698 6.70773 12.9003 6.54736L12.9001 5.38615Z"></path>
                                            <path d="M2.79815 15.7417C3.00016 15.5796 3.24761 15.5168 3.50006 15.5168H20.5001C20.7525 15.5168 21 15.5796 21.202 15.7417C21.4043 15.9041 21.5061 16.1221 21.5503 16.328C21.6329 16.7122 21.5374 17.1485 21.4224 17.494C21.1003 18.4601 20.195 19.1126 19.1762 19.1126H4.82393C3.80516 19.1126 2.89985 18.4603 2.57782 17.4942C2.46281 17.1487 2.36718 16.7122 2.44978 16.328C2.49405 16.1221 2.59582 15.9041 2.79815 15.7417Z"></path>
                                        </svg>
                                        <h4 className='mb-0 text-sm pl-1'>{chefAndDishes.menus?.length} Dishes</h4>
                                    </div>
                                    {/* <div className='inline-flex items-center border border-primaryLight rounded px-2 py-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="#f6be40">
                                            <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                                        </svg>
                                        <h4 className='mb-0 text-sm pl-1'>4.8 (255)</h4>
                                    </div> */}
                                </div>
                            </div>
                            <div className='w-full'>
                                <p className='mt-2'>
                                    {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                                    a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting. */}
                                    { chefAndDishes.bio }
                                </p>
                            </div>
                            <div className='flex lg:flex-nowrap flex-wrap gap-2'>
                                { chefAndDishes.food_handle_certificate && <div className='inline-flex cursor-pointer items-center bg-borderClr rounded px-2 py-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                        <path d="M12 1L20.2169 2.82598C20.6745 2.92766 21 3.33347 21 3.80217V13.7889C21 15.795 19.9974 17.6684 18.3282 18.7812L12 23L5.6718 18.7812C4.00261 17.6684 3 15.795 3 13.7889V3.80217C3 3.33347 3.32553 2.92766 3.78307 2.82598L12 1ZM16.4524 8.22183L11.5019 13.1709L8.67421 10.3431L7.25999 11.7574L11.5026 16L17.8666 9.63604L16.4524 8.22183Z"></path>
                                    </svg>
                                    <h4 className='mb-0 text-sm pl-1'>Certified</h4>
                                </div>}
                                {/* Follow button */}
                                {/* <div className='inline-flex cursor-pointer items-center bg-borderClr rounded px-2 py-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                        <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path>
                                    </svg>
                                    <h4 className='mb-0 text-sm pl-1'>Follow</h4>
                                </div> */}
                                {/* Message button */}
                                {/* <div className='inline-flex cursor-pointer items-center bg-borderClr rounded px-2 py-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1">
                                        <path d="M2 8.99374C2 5.68349 4.67654 3 8.00066 3H15.9993C19.3134 3 22 5.69478 22 8.99374V21H8.00066C4.68659 21 2 18.3052 2 15.0063V8.99374ZM14 11V13H16V11H14ZM8 11V13H10V11H8Z"></path>
                                    </svg>
                                    <h4 className='mb-0 text-sm pl-1'>Message</h4>
                                </div> */}
                                {/* Share button */}
                                {/* <div className='inline-flex cursor-pointer items-center bg-borderClr rounded px-2 py-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                        <path d="M13.5759 17.2714L8.46576 14.484C7.83312 15.112 6.96187 15.5 6 15.5C4.067 15.5 2.5 13.933 2.5 12C2.5 10.067 4.067 8.5 6 8.5C6.96181 8.5 7.83301 8.88796 8.46564 9.51593L13.5759 6.72855C13.5262 6.49354 13.5 6.24983 13.5 6C13.5 4.067 15.067 2.5 17 2.5C18.933 2.5 20.5 4.067 20.5 6C20.5 7.933 18.933 9.5 17 9.5C16.0381 9.5 15.1669 9.11201 14.5343 8.48399L9.42404 11.2713C9.47382 11.5064 9.5 11.7501 9.5 12C9.5 12.2498 9.47383 12.4935 9.42408 12.7285L14.5343 15.516C15.167 14.888 16.0382 14.5 17 14.5C18.933 14.5 20.5 16.067 20.5 18C20.5 19.933 18.933 21.5 17 21.5C15.067 21.5 13.5 19.933 13.5 18C13.5 17.7502 13.5262 17.5064 13.5759 17.2714Z"></path>
                                    </svg>
                                    <h4 className='mb-0 text-sm pl-1'>Share</h4>
                                </div> */}
                                {/* Website link */}
                                {/* <div className='inline-flex cursor-pointer items-center bg-borderClr rounded px-2 py-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                        <path d="M2.04932 12.9999H7.52725C7.70624 16.2688 8.7574 19.3053 10.452 21.8809C5.98761 21.1871 2.5001 17.5402 2.04932 12.9999ZM2.04932 10.9999C2.5001 6.45968 5.98761 2.81276 10.452 2.11902C8.7574 4.69456 7.70624 7.73111 7.52725 10.9999H2.04932ZM21.9506 10.9999H16.4726C16.2936 7.73111 15.2425 4.69456 13.5479 2.11902C18.0123 2.81276 21.4998 6.45968 21.9506 10.9999ZM21.9506 12.9999C21.4998 17.5402 18.0123 21.1871 13.5479 21.8809C15.2425 19.3053 16.2936 16.2688 16.4726 12.9999H21.9506ZM9.53068 12.9999H14.4692C14.2976 15.7828 13.4146 18.3732 11.9999 20.5915C10.5852 18.3732 9.70229 15.7828 9.53068 12.9999ZM9.53068 10.9999C9.70229 8.21709 10.5852 5.62672 11.9999 3.40841C13.4146 5.62672 14.2976 8.21709 14.4692 10.9999H9.53068Z"></path>
                                    </svg>
                                    <h4 className='mb-0 text-sm pl-1'>example.com</h4>
                                </div> */}
                                {/* Social media links */}
                                {/* <div className='inline-flex cursor-pointer items-center bg-borderClr rounded px-2 py-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                        <path d="M15.4024 21V14.0344H17.7347L18.0838 11.3265H15.4024V9.59765C15.4024 8.81364 15.62 8.27934 16.7443 8.27934L18.1783 8.27867V5.85676C17.9302 5.82382 17.0791 5.75006 16.0888 5.75006C14.0213 5.75006 12.606 7.01198 12.606 9.32952V11.3265H10.2677V14.0344H12.606V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15.4024Z"></path>
                                    </svg>
                                </div>
                                <div className='inline-flex cursor-pointer items-center bg-borderClr rounded px-2 py-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(236,32,68,1)">
                                        <path d="M13.0281 2.00073C14.1535 2.00259 14.7238 2.00855 15.2166 2.02322L15.4107 2.02956C15.6349 2.03753 15.8561 2.04753 16.1228 2.06003C17.1869 2.1092 17.9128 2.27753 18.5503 2.52503C19.2094 2.7792 19.7661 3.12253 20.3219 3.67837C20.8769 4.2342 21.2203 4.79253 21.4753 5.45003C21.7219 6.0867 21.8903 6.81337 21.9403 7.87753C21.9522 8.1442 21.9618 8.3654 21.9697 8.58964L21.976 8.78373C21.9906 9.27647 21.9973 9.84686 21.9994 10.9723L22.0002 11.7179C22.0003 11.809 22.0003 11.903 22.0003 12L22.0002 12.2821L21.9996 13.0278C21.9977 14.1532 21.9918 14.7236 21.9771 15.2163L21.9707 15.4104C21.9628 15.6347 21.9528 15.8559 21.9403 16.1225C21.8911 17.1867 21.7219 17.9125 21.4753 18.55C21.2211 19.2092 20.8769 19.7659 20.3219 20.3217C19.7661 20.8767 19.2069 21.22 18.5503 21.475C17.9128 21.7217 17.1869 21.89 16.1228 21.94C15.8561 21.9519 15.6349 21.9616 15.4107 21.9694L15.2166 21.9757C14.7238 21.9904 14.1535 21.997 13.0281 21.9992L12.2824 22C12.1913 22 12.0973 22 12.0003 22L11.7182 22L10.9725 21.9993C9.8471 21.9975 9.27672 21.9915 8.78397 21.9768L8.58989 21.9705C8.36564 21.9625 8.14444 21.9525 7.87778 21.94C6.81361 21.8909 6.08861 21.7217 5.45028 21.475C4.79194 21.2209 4.23444 20.8767 3.67861 20.3217C3.12278 19.7659 2.78028 19.2067 2.52528 18.55C2.27778 17.9125 2.11028 17.1867 2.06028 16.1225C2.0484 15.8559 2.03871 15.6347 2.03086 15.4104L2.02457 15.2163C2.00994 14.7236 2.00327 14.1532 2.00111 13.0278L2.00098 10.9723C2.00284 9.84686 2.00879 9.27647 2.02346 8.78373L2.02981 8.58964C2.03778 8.3654 2.04778 8.1442 2.06028 7.87753C2.10944 6.81253 2.27778 6.08753 2.52528 5.45003C2.77944 4.7917 3.12278 4.2342 3.67861 3.67837C4.23444 3.12253 4.79278 2.78003 5.45028 2.52503C6.08778 2.27753 6.81278 2.11003 7.87778 2.06003C8.14444 2.04816 8.36564 2.03847 8.58989 2.03062L8.78397 2.02433C9.27672 2.00969 9.8471 2.00302 10.9725 2.00086L13.0281 2.00073ZM12.0003 7.00003C9.23738 7.00003 7.00028 9.23956 7.00028 12C7.00028 14.7629 9.23981 17 12.0003 17C14.7632 17 17.0003 14.7605 17.0003 12C17.0003 9.23713 14.7607 7.00003 12.0003 7.00003ZM12.0003 9.00003C13.6572 9.00003 15.0003 10.3427 15.0003 12C15.0003 13.6569 13.6576 15 12.0003 15C10.3434 15 9.00028 13.6574 9.00028 12C9.00028 10.3431 10.3429 9.00003 12.0003 9.00003ZM17.2503 5.50003C16.561 5.50003 16.0003 6.05994 16.0003 6.74918C16.0003 7.43843 16.5602 7.9992 17.2503 7.9992C17.9395 7.9992 18.5003 7.4393 18.5003 6.74918C18.5003 6.05994 17.9386 5.49917 17.2503 5.50003Z"></path>
                                    </svg>
                                </div>
                                <div className='inline-flex cursor-pointer items-center bg-borderClr rounded px-2 py-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" fill="rgba(236,32,68,1)">
                                        <path d="M18.2048 2.25H21.5128L14.2858 10.51L22.7878 21.75H16.1308L10.9168 14.933L4.95084 21.75H1.64084L9.37084 12.915L1.21484 2.25H8.04084L12.7538 8.481L18.2048 2.25ZM17.0438 19.77H18.8768L7.04484 4.126H5.07784L17.0438 19.77Z"></path>
                                    </svg>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChefContent;
