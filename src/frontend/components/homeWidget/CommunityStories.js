import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
const CommunityStories = () => {
    return (
        <>
            <div className='meetChef'>
                <div className='py-16 lg:px-2 px-4'>
                    <div className='container mx-auto'>
                        <div className='text-center'>
                            <h1 className='font-semibold text-3xl uppercase text-secondary tracking-wider tracking-widest'>
                                Community stories
                            </h1>
                            <div className='w-[60px] h-[2px] bg-primary mx-auto my-6'></div>
                            <h3 className='alexBrush text-3xl text-headGray mb-0'>
                                Start your experience
                            </h3>
                        </div>
                        <div className=''>
                            <Swiper 
                                pagination={{
                                    clickable: true,
                                }}
                                spaceBetween={30}
                                modules={[Pagination]} 
                                className="meetChef_slide"
                            >
                                <SwiperSlide className='py-12'> 
                                    <div className='grid grid-cols-12 gap-4 storeisBx border border-primaryLight rounded-2xl md:p-12 p-6'>
                                        <div className='lg:col-span-6 col-span-12'>
                                            <div className='flex flex-col justify-between h-full'>
                                                <div className='lg:text-start text-center'>
                                                    <h3 className='text-xl text-secondary rounded-[6px] mb-6 bg-primaryLight px-4 py-2 inline-block '>
                                                        Maxican Food
                                                    </h3>
                                                    <h2 className='font-semibold md:text-3xl text-2xl capitalize text-secondary tracking-wider tracking-widest'>
                                                        Meet Chef hagar
                                                    </h2>
                                                    <div className='mt-4 mb-6'>
                                                        <div className='w-full lg:pr-8'>
                                                            <p className='mb-0 text-base text-headGray'>
                                                                I believe that food is one of the greatest pleasures in life. Preparing food or 
                                                                trying a new recipe is the ultimate happiness for me. I realized that food has 
                                                                been one of my passions since I was 12 years old. I used to go to the kitchen 
                                                                and pretend that I'm cooking and acting like a chef. Being born and raised in 
                                                                Egypt where food is an essential part of life made it easier for me to grow my 
                                                                skills and gave me a chance to explore and learn more. So whenever we had a 
                                                                family gathering or any event.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className='font-semibold text-xl uppercase text-secondary tracking-wider tracking-widest md:mt-16 mt-8'>
                                                        Specialities
                                                    </h2>
                                                    <div className=''>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Dessert</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Dairy Free</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Vegan</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Good for Lunch</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Paleo</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Chicken</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-4 col-span-8'>
                                            <img src='./media/frontend/img/banner/female-chef.png' className=' mb-3 rounded-lg w-full object-top object-cover shadow-xl meetChefImg' alt='Chef' />
                                        </div>
                                        <div className='lg:col-span-2 col-span-4'>
                                            <div className='border border-primary border-dashed p-2 rounded-lg mb-3'>
                                                <img src='./media/frontend/img/blog/426x311/blog-3.jpg' className='rounded-lg w-full object-top object-cover shadow-xl' alt='Chef' />
                                            </div>
                                            <div className='border border-primary border-dashed p-2 rounded-lg mb-3'>
                                                <img src='./media/frontend/img/blog/426x311/blog-7.jpg' className='rounded-lg w-full object-top object-cover shadow-xl' alt='Chef' />
                                            </div>
                                            <div className='border border-primary border-dashed p-2 rounded-lg'>
                                                <img src='./media/frontend/img/blog/426x311/blog-6.jpg' className='rounded-lg w-full object-top object-cover shadow-xl' alt='Chef' />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='py-12'> 
                                    <div className='grid grid-cols-12 gap-4 storeisBx border border-primaryLight rounded-2xl md:p-12 p-6'>
                                        <div className='lg:col-span-6 col-span-12'>
                                            <div className='flex flex-col justify-between h-full'>
                                                <div className='lg:text-start text-center'>
                                                    <h3 className='text-xl text-secondary rounded-[6px] mb-6 bg-primaryLight px-4 py-2 inline-block '>
                                                        Italian Food
                                                    </h3>
                                                    <h2 className='font-semibold md:text-3xl text-2xl capitalize text-secondary tracking-wider tracking-widest'>
                                                        Meet Chef Tania
                                                    </h2>
                                                    <div className='mt-4 mb-6'>
                                                        <div className='w-full lg:pr-8'>
                                                            <p className='mb-0 text-base text-headGray'>
                                                                I believe that food is one of the greatest pleasures in life. Preparing food or 
                                                                trying a new recipe is the ultimate happiness for me. I realized that food has 
                                                                been one of my passions since I was 12 years old. I used to go to the kitchen 
                                                                and pretend that I'm cooking and acting like a chef. Being born and raised in 
                                                                Egypt where food is an essential part of life made it easier for me to grow my 
                                                                skills and gave me a chance to explore and learn more. So whenever we had a 
                                                                family gathering or any event.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className='font-semibold text-xl uppercase text-secondary tracking-wider tracking-widest md:mt-16 mt-8'>
                                                        Specialities
                                                    </h2>
                                                    <div className=''>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Dessert</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Dairy Free</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Vegan</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Good for Lunch</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Paleo</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Chicken</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-4 col-span-8'>
                                            <img src='./media/frontend/img/banner/chef-7.webp' className=' mb-3 rounded-lg w-full object-top object-cover shadow-xl meetChefImg' alt='Chef' />
                                        </div>
                                        <div className='lg:col-span-2 col-span-4'>
                                            <div className='border border-primary border-dashed p-2 rounded-lg mb-3'>
                                                <img src='./media/frontend/img/blog/426x311/blog-3.jpg' className='rounded-lg w-full object-top object-cover shadow-xl' alt='Chef' />
                                            </div>
                                            <div className='border border-primary border-dashed p-2 rounded-lg mb-3'>
                                                <img src='./media/frontend/img/blog/426x311/blog-7.jpg' className='rounded-lg w-full object-top object-cover shadow-xl' alt='Chef' />
                                            </div>
                                            <div className='border border-primary border-dashed p-2 rounded-lg'>
                                                <img src='./media/frontend/img/blog/426x311/blog-6.jpg' className='rounded-lg w-full object-top object-cover shadow-xl' alt='Chef' />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className='py-12'> 
                                    <div className='grid grid-cols-12 gap-4 storeisBx border border-primaryLight rounded-2xl md:p-12 p-6'>
                                        <div className='lg:col-span-6 col-span-12'>
                                            <div className='flex flex-col justify-between h-full'>
                                                <div className='lg:text-start text-center'>
                                                    <h3 className='text-xl text-secondary rounded-[6px] mb-6 bg-primaryLight px-4 py-2 inline-block '>
                                                        Maxican Food
                                                    </h3>
                                                    <h2 className='font-semibold md:text-3xl text-2xl capitalize text-secondary tracking-wider tracking-widest'>
                                                        Meet Chef Shereen
                                                    </h2>
                                                    <div className='mt-4 mb-6'>
                                                        <div className='w-full lg:pr-8'>
                                                            <p className='mb-0 text-base text-headGray'>
                                                                I believe that food is one of the greatest pleasures in life. Preparing food or 
                                                                trying a new recipe is the ultimate happiness for me. I realized that food has 
                                                                been one of my passions since I was 12 years old. I used to go to the kitchen 
                                                                and pretend that I'm cooking and acting like a chef. Being born and raised in 
                                                                Egypt where food is an essential part of life made it easier for me to grow my 
                                                                skills and gave me a chance to explore and learn more. So whenever we had a 
                                                                family gathering or any event.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className='font-semibold text-xl uppercase text-secondary tracking-wider tracking-widest md:mt-16 mt-8'>
                                                        Specialities
                                                    </h2>
                                                    <div className=''>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Dessert</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Dairy Free</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Vegan</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Good for Lunch</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Paleo</h6>
                                                        <h6 className='bg-primaryLight px-2 py-1 text-[12px] text-medium rounded-[3px] inline-block mr-2 mb-2 capitalize'>Chicken</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-4 col-span-8'>
                                            <img src='./media/frontend/img/banner/chef-8.webp' className=' mb-3 rounded-lg w-full object-top object-cover shadow-xl meetChefImg' alt='Chef' />
                                        </div>
                                        <div className='lg:col-span-2 col-span-4'>
                                            <div className='border border-primary border-dashed p-2 rounded-lg mb-3'>
                                                <img src='./media/frontend/img/blog/426x311/blog-3.jpg' className='rounded-lg w-full object-top object-cover shadow-xl' alt='Chef' />
                                            </div>
                                            <div className='border border-primary border-dashed p-2 rounded-lg mb-3'>
                                                <img src='./media/frontend/img/blog/426x311/blog-7.jpg' className='rounded-lg w-full object-top object-cover shadow-xl' alt='Chef' />
                                            </div>
                                            <div className='border border-primary border-dashed p-2 rounded-lg'>
                                                <img src='./media/frontend/img/blog/426x311/blog-6.jpg' className='rounded-lg w-full object-top object-cover shadow-xl' alt='Chef' />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>    
            </div>
        </>
    );
};

export default CommunityStories;
