import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export const HomeFoodDelivery = () => {
    const pageBnrImg = {
        position: 'relative',
        backgroundImage: `url('./media/frontend/img/about/blog/1920x700/banner-3.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };
    return (
        <>
            <Header />
            <section className='lg:px-2 px-4'>
                <div className='pageBanr py-20' style={pageBnrImg}>
                    <div className='container mx-auto relative z-[1] text-center'>
                        <div className='text-center lg:px-0 px-4'>
                            <h1 className='font-semibold sm:text-5xl text-4xl md:leading-none leading-snug uppercase text-white tracking-wider tracking-widest'>
                                Where Does Shef Deliver?
                            </h1>
                            <div className='w-[80px] h-[2px] bg-primary mx-auto my-6'></div>
                            <h3 className='alexBrush text-3xl text-headGray'>
                                Food delivery
                            </h3>
                            <div className='lg:w-2/5 sm:w-1/2 w-full mx-auto'>
                                <div className='bnrSearchBar flex gap-x-2'>
                                    <input type='search' className='py-2 h-[45px] border border-headGray text-base focus:border-primary' placeholder='Enter your ZIP code' />
                                    <button className='rounded-md py-2 px-4 text-base font-semibold whitespace-nowrap bg-primary text-white hover:text-green-400'>Find Food</button>
                                </div>
                                <p className='text-base text-white mb-4 mt-4 lg:px-16'>
                                    Already have an account? <Link to='/login' className='hover:underline font-semibold'>Log in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='container mx-auto py-16'>
                        <div className="text-center mb-8">
                            <h2 className="font-semibold text-3xl uppercase tracking-wider tracking-widest">Where Shef Cooks & Delivers Homemade Food!</h2>
                            <div className="w-[60px] h-[2px] bg-primary my-4 mx-auto"> </div>
                        </div>
                        <div className='lg:w-2/3 mx-auto text-center border rounded-lg bg-grayBg p-5'>
                            <p className='text-base mb-2  italic'>
                                "Food for us comes from our relatives, whether they have wings or fins or roots. 
                                That is how we consider food. Food has a culture. It has a history. It has a story. 
                                It has relationships."
                            </p>
                            <p className='text-base mb-0 font-semibold'>
                                - Winona LaDuke
                            </p>
                        </div>
                        <div className='mt-8'>
                            <p className='text-lg mb-4 text-center'>
                            Shef is a chef-to-consumer marketplace that connects talented local cooks with customers looking for healthy, homemade meals. Shef is a great alternative to fast food or takeout, as it provides a healthier, more personalized food delivery experience. Plus, with the ability to filter by dietary preferences and ingredients, Shef makes it easy for customers to find dishes that fit their specific needs and preferences. Whether you're looking for a quick lunchtime meal or a hearty dinner for the whole family, Shef has something for everyone.
                            </p>
                            <p className='text-lg mb-4 text-center'>
                                Have you ever dreamt of recreating an authentic dish you love from another culture? Sourcing hard-to-find ingredients for the perfect Pad Thai, a fabulous Fatoush, or a mouthwatering Mole can be a challenge. Getting the flavors and traditional techniques right takes a lifetime of first-hand experience.
                                Reconnecting with the globally inspired dishes you’ve been missing isn’t just about finding ingredients and following recipes. It goes deeper than that. It’s about tapping into culinary wisdom passed down through generations.
                                Shef connects you to the international community of talented cooks in your area, bringing the dishes you crave right to your doorstep. From the furthest reaches of the globe to your kitchen table, there’s a world of taste and tradition waiting to be discovered.
                            </p>
                            <p className='text-lg mb-4 text-center'>
                                Shef is flavor that takes you places.
                            </p>
                        </div>
                        <div className='border-t mt-8 pt-8'>
                            <div className='mb-8'>
                                <h2 className='text-xl font-bold mb-5 uppercase'>Top Cities</h2>
                                <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3'>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Karachi</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Islamabad</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Punjab</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Balochishtan</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>KPK</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Punjab</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Karachi</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Islamabad</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Punjab</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Balochishtan</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>KPK</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Punjab</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Karachi</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Islamabad</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Punjab</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Balochishtan</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>KPK</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>Punjab</h6>
                                </div>
                            </div>
                            <div>
                                <h2 className='text-xl font-bold mb-5 uppercase'>Top Zip Codes</h2>
                                <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3'>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00001</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00002</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00003</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00004</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00005</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00006</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00001</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00002</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00003</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00004</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00005</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00006</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00001</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00002</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00003</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00004</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00005</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00006</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00001</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00002</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00003</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00004</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00005</h6>
                                    <h6 className='text-center border rounded-lg bg-grayBg p-3 text-lg font-semibold mb-0'>00006</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-grayBg py-16'>
                    <div className='container mx-auto'>
                        <div className="text-center mb-8">
                            <h2 className="font-semibold text-3xl uppercase tracking-wider">
                                Authentically Homemade Cooked Meals Delivered
                            </h2>
                            <div className="w-[60px] h-[2px] bg-primary my-4 mx-auto"> </div>
                        </div>
                        <div className='grid lg:grid-cols-1 gap-4'>
                            <div className='bg-white rounded-lg px-5 py-8 h-full'>
                                <h6 className='mb-4 mt-2 text-xl font-semibold uppercase text-center md:px-4 px-0 leading-5'>
                                    The Story of Homemade
                                </h6>
                                <p className='text-lg mb-0 text-center'>
                                    Not only is homemade better for you, but we believe that it tastes better too.
                                    Let’s explore how homemade meals from our community of shefs compare to restaurant food in 
                                    terms of health benefits, taste, and more.
                                </p>
                            </div>
                            <div className='bg-white rounded-lg px-5 py-8 h-full'>
                                <h6 className='mb-4 mt-2 text-xl font-semibold uppercase text-center md:px-4 px-0 leading-5'>
                                    Food Safety
                                </h6>
                                <p className='text-lg mb-0 text-center'>
                                    Our community of shefs care deeply about the people they’re cooking for. The majority of shefs are moms that have spent years cooking for their own families, with their wellbeing front of mind. That being said, your trust is our #1 priority, so we’ve implemented strict food safety protocols to give you extra peace of mind. Read more about our 
                                    food safety policy here.
                                </p>
                            </div>
                            <div className='bg-white rounded-lg px-5 py-8 h-full'>
                                <h6 className='mb-4 mt-2 text-xl font-semibold uppercase text-center md:px-4 px-0 leading-tight'>
                                    Why Authentic is Hard to Find!
                                </h6>
                                <p className='text-lg mb-0 text-center'>
                                    As a nation, the United States is a melting pot of global cultures. So why is it that you find the same dishes in Italian restaurants and Indian restaurants no matter where you are? While there are many reasons why authentic food is hard to find, there are a few prevalent reasons. Let’s explore them, shall we?As a nation, the United States is a melting pot of global cultures. So why is it that you find the same dishes in Italian restaurants and Indian restaurants no matter where you are? While there are many reasons why authentic food is hard to find, there are a few prevalent reasons. 
                                    Let’s explore them, shall we?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
export default HomeFoodDelivery