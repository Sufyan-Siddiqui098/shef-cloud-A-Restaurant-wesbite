import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export const TermsOfServices = () => {
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
                            Terms of Services
                        </h2>
                        <ul className='inline-block text-white mb-0'>
                            <li className='inline-block text-lg'>
                                <Link to='/' className='!text-white hover:!text-primary'>Home</Link>
                            </li>
                            <li className='inline-block px-3'>/</li>
                            <li className='inline-block text-lg font-semibold text-primary'> Terms of Services</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="TermsOfServicesus section-padding">
                <div className="container mx-auto lg:px-2 px-4">
                    <div className='lg:w-3/4 w-full mx-auto'>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase uppercase'>Introduction</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>Description of the Service</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>Access to the Service</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>Conditions of Use; Acceptable Use</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>User Representations & Warranties</h2>
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
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>Sellers additionally represent and warrant that:</h2>
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
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>Third Party Distribution Channels</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>Media Release</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>Licensing and Intellectual Property Rights.</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>Third Party Websites</h2>
                            <p className='mb-0 text-base text-headGray'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices 
                                gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                            </p>
                        </div>
                        <div className='mb-6'>
                            <h2 className='text-primary font-semibold mb-2 text-xl uppercase'>Third Party Websites</h2>
                            <p className='mb-3 text-base text-headGray'>
                                Please contact us at legal@shef_cloud.com to report any violations of these Terms of Service or 
                                to pose any questions regarding this Terms of Service or the Service.
                            </p>
                            <p className='mb-0 text-base text-headGray'>
                                Date of Last Revision: December 16, 2024
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
export default TermsOfServices