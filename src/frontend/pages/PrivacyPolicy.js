import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export const PrivacyPolicy = () => {
    const pageBnrImg = {
        position: 'relative',
        backgroundImage: `url('./media/frontend/img/about/blog/1920x700/banner-2.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      };
    return (
        <>
            <Header />
            <section>
                <div className='pageBanr py-20' style={pageBnrImg}>
                    <div className='container mx-auto relative z-[1] text-center'>
                        <h2 className="font-semibold text-3xl text-white uppercase text-secondary tracking-wider tracking-widest">
                            Privacy Policy
                        </h2>
                        <ul className='inline-block text-white mb-0'>
                            <li className='inline-block text-lg'>
                                <Link to='/' className='!text-white hover:!text-primary'>Home</Link>
                            </li>
                            <li className='inline-block px-3'>/</li>
                            <li className='inline-block text-lg font-semibold text-primary'> Privacy Policy</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="privacyPolicy section-padding">
                <div className="container mx-auto lg:px-2 px-4">
                    <div className='lg:w-3/4 w-full mx-auto'>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>INFORMATION WE COLLECT</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>HOW WE USE INFORMATION</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                            <ul className='pl-6'>
                                <li className='list-disc mb-1 text-base text-headGray'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </li>
                                <li className='list-disc mb-1 text-base text-headGray'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </li>
                                <li className='list-disc mb-1 text-base text-headGray'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </li>
                                <li className='list-disc mb-1 text-base text-headGray'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </li>
                                <li className='list-disc mb-1 text-base text-headGray'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </li>
                            </ul>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'> SHARING AND DISCLOSURE OF INFORMATION</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>YOUR RIGHTS AND CHOICES</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>DATA RETENTION AND DELETION</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>UPDATE YOUR INFORMATION</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>

                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>CHILDREN</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>LINKS TO OTHER WEBSITES</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>SECURITY</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'> CHANGES TO THE PRIVACY POLICY</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>CONTACT US</h2>
                            <p className='mb-0 text-base text-headGray'>
                                If you have any questions about our Privacy Policy or information practices, please feel free to contact us at privacy@shef_cloud.com.
                            </p>
                            <p className='mb-0 text-base text-headGray'>
                            This Privacy Policy has been designed to be accessible to people with disabilities. If you experience any difficulties accessing the information here, please contact us at privacy@shef_cloud.com.
                            </p>
                        </div>
                        
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
export default PrivacyPolicy