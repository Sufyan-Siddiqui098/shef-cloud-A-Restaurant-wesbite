import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export const Checkout = () => {
const [activeButton, setActiveButton] = useState(null);
const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
};
    return (
        <>
           
            <div className='container mx-auto my-8 realtive'>
                <div className='mb-3'>
                    <Link className='!text-black font-semibold flex items-center gap-2' to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,1)">
                            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                        </svg>
                        <span>Back to Menu</span>
                    </Link>
                </div>
                <div className='lg:text-start text-center'>
                    <h1 className='font-semibold text-3xl uppercase text-secondary tracking-widest'>
                        Chechout
                    </h1>
                    <div className='w-[60px] h-[2px] bg-primary my-4 lg:mx-0 mx-auto'></div>
                </div>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='lg:col-span-7 col-span-12'>
                        <form>
                            <div className='border border-primary border-dashed rounded-lg p-4'>
                                <h2 className='font-semibold text-xl uppercase text-secondary tracking-widest'>
                                    Delivery information
                                </h2>
                                <div className='border-b border-primary border-dashed pb-5 mb-4'>
                                    <h4 className='text-base font-semibold mb-1'>Phone <span className='text-primary'>*</span></h4>
                                    <input className='border rounded-md w-1/2' name='' placeholder='Enter Phone' />
                                </div>
                                <div className='border-b border-primary border-dashed pb-5 mb-4'>
                                    <h4 className='text-base font-semibold mb-1'>Name <span className='text-primary'>*</span></h4>
                                    <input className='border rounded-md w-full' name='' placeholder='Enter Phone' />
                                </div>
                                <div className='border-b border-primary border-dashed pb-5 mb-4'>
                                    <h4 className='text-base font-semibold mb-1'>Address <span className='text-primary'>*</span></h4>
                                    <input className='border rounded-md w-full' name='' placeholder='Apartment, suite, unit, building, floor, etc.' />
                                    <h4 className='text-base font-semibold mb-1 mt-3'>Address Line 2 <span className='text-primary'>*</span></h4>
                                    <input className='border rounded-md w-full' name='' placeholder="Apartment, suite, unit, building, floor, etc." />
                                </div>
                                <div className='border-b border-primary border-dashed pb-5 mb-4'>
                                    <h4 className='text-base font-semibold mb-1'>Delivery Instruction <span className='text-primary'>*</span></h4>
                                    <textarea className='border rounded-md w-full h-[100px]' placeholder='Type Query...'></textarea>
                                </div>
                                <div className='border-b border-primary border-dashed pb-5 mb-4'>
                                    <h4 className='text-base font-semibold mb-1'>Delivery time <span className='text-primary'>*</span></h4>
                                    <input className='border rounded-md w-full' name='' placeholder="" value='Monday Feb 12, 4:00 pm - 6:00 pm' readOnly />
                                </div>
                                <div className='border-b border-primary border-dashed pb-5 mb-4'>
                                    <h4 className='text-base font-semibold mb-1'>Promo code or Gift card <span className='text-primary'>*</span></h4>
                                    <div className='relative'>
                                        <input className='border rounded-md w-full' name='' placeholder="Promo Code" />
                                        <button className='text-[10px] font-semobold bg-primary px-2 py-1 text-white rounded-md absolute right-2 top-[50%] translate-y-[-50%]'>Submit</button>
                                    </div>
                                </div>
                                <div className='mt-8 border-b border-primary border-dashed pb-2'>
                                    <div className='flex items-center justify-between'>
                                        <h2 className='font-semibold text-xl uppercase text-secondary tracking-widest'>
                                            Tip Shef Carla:
                                        </h2>
                                        <h2 className='font-semibold text-2xl uppercase text-primary tracking-widest'>
                                            $5.99
                                        </h2>
                                    </div>
                                    <div className='grid lg:grid-cols-8 md:grid-cols-8 grid-cols-4 gap-3 mb-4'>
                                        <div className={`chefDateBtn ${activeButton === 'btn1' ? 'active' : ''}`}
                                            onClick={() => handleButtonClick('btn1')}
                                        >
                                            <h4 className='text-[14px] font-semibold mb-0 leading-tight'>No Tip</h4>
                                        </div>
                                        <div className={`chefDateBtn ${activeButton === 'btn2' ? 'active' : ''}`}
                                            onClick={() => handleButtonClick('btn2')}
                                        >
                                            <h4 className='text-[14px] font-semibold mb-0 leading-tight'>10%</h4>
                                        </div>
                                        <div className={`chefDateBtn ${activeButton === 'btn3' ? 'active' : ''}`}
                                            onClick={() => handleButtonClick('btn3')}
                                        >
                                            <h4 className='text-[14px] font-semibold mb-0 leading-tight'>15%</h4>
                                        </div>
                                        <div className={`chefDateBtn ${activeButton === 'btn4' ? 'active' : ''}`}
                                            onClick={() => handleButtonClick('btn4')}
                                        >
                                            <h4 className='text-[14px] font-semibold mb-0 leading-tight'>20%</h4>
                                        </div>
                                        <div className={`chefDateBtn ${activeButton === 'btn5' ? 'active' : ''}`}
                                            onClick={() => handleButtonClick('btn5')}
                                        >
                                        <h4 className='text-[14px] font-semibold mb-0 leading-tight'>25%</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-8'>
                                    <h2 className='font-semibold text-2xl uppercase text-secondary tracking-widest'>
                                        Make it a recurring order and save!
                                    </h2>
                                    <div className="block w-[280px] mt-2">
                                        <label className="flex items-center cursor-pointer mb-3">
                                            <input type="radio" className="form-radio text-primary w-[15px] h-[15px]" name="radioGroup" value="option1" />
                                            <span className="ml-3 text-base font-medium">Order once</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer mb-3">
                                            <input type="radio" className="form-radio text-primary w-[15px] h-[15px]" name="radioGroup" value="option2" />
                                            <span className="ml-3 text-base font-medium">Every other week <span className='font-bold'>--5% off</span> </span>
                                        </label>
                                        <label className="flex items-center cursor-pointer mb-3">
                                            <input type="radio" className="form-radio text-primary w-[15px] h-[15px]" name="radioGroup" value="option3" />
                                            <span className="ml-3 text-base font-medium">Every week <span className='font-bold'>--10% off</span></span>
                                        </label>
                                    </div>
                                    <p>
                                        By placing your order, you agree to Shef’s updated <Link to='/terms-of-servies'>Terms of Service</Link>, <Link to='/privacy-policy'>Privacy Policy</Link>, and to receive order updates and marketing text messages.
                                    </p>
                                </div>
                            </div>
                            <div className='border border-primary border-dashed rounded-lg p-4 mt-8'>
                                <h2 className='font-semibold text-xl uppercase text-secondary tracking-widest'>
                                    Payment details
                                </h2>
                                <p>
                                    All transactions are secure and encrypted.
                                </p>
                                {/* BANK API */}
                            </div>
                            <div className='mt-4 text-center'>
                                <button type='button' className='bg-primary text-white text-lg w-full uppercase px-6 py-2 font-semibold rounded-lg'>Place Order</button>
                            </div>
                        </form>
                    </div>
                    <div className='lg:col-span-5 col-span-12'>
                        <div className='md:p-4 p-3 bg-primaryLight rounded-lg sticky top-0'>
                            <h3 className='mb-6 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest'>Your order for delivery on Monday, February 12</h3>
                            <div>
                                <div className='flex items-center gap-x-2 bg-primaryLight p-2 rounded-lg'>
                                    <img src='./media/frontend/img/banner/female-chef.png' className='object-top rounded-full w-[30px] object-cover h-[30px]' alt='ef' />
                                    <Link className='!underline !text-secondary text-base font-semibold'> Shef Swarnamali</Link>
                                </div>
                                {/* Order Box */}
                                <div className='flex items-center justify-between border border-primary border-dashed rounded-lg p-2 gap-x-2 mt-4'>
                                    <div className='flex items-center gap-x-2 w-[65%]'>
                                        <img src='./media/frontend/img/restaurants/255x104/order-2.jpg' className='object-top rounded-lg w-[60px] object-cover h-[60px]' alt='ef' />
                                        <div>
                                            <h3 className='mb-1 text-base font-semibold leading-tight'>Guajillo Grilled Shrimps </h3>
                                            <div className='flex items-center gap-x-3'>
                                                <div className='flex items-center justify-between w-[55%] bg-primaryLight rounded-lg'>
                                                    <button className='w-[25%]'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="15" height="15" fill="rgba(0,0,0,1)"><path d="M5 11V13H19V11H5Z"></path></svg>
                                                    </button>
                                                    <input className='w-[50%] text-center border-0 bg-transparent text-xs px-1 h-[30px]' placeholder='1' />
                                                    <button className='w-[25%]'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="15" height="15" fill="rgba(0,0,0,1)"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                                    </button>
                                                </div>
                                                <h4 className='text-lg fontsemibold mb-0'>x $13.99</h4>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className='cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
                                            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d:p-4 p-3 bg-primaryLight rounded-lg mt-6'>
                            <h3 className='mb-6 border-b border-primary border-dashed pb-2 font-semibold text-xl uppercase text-secondary tracking-widest'>Order Summary</h3>
                            <div className='flex justify-between gap-2 mb-3'>
                                <h3 className='text-lg font-bold mb-0'>Subtotal</h3>
                                <h4 className='text-lg font-bold mb-0'>$44.97</h4>
                            </div>
                            <div className='flex justify-between gap-2 mb-1'>
                                <h3 className='text-lg font-medium mb-0'>Delivery Fee</h3>
                                <h4 className='text-lg font-medium mb-0'>$2.49</h4>
                            </div>
                            <div className='flex justify-between gap-2 mb-1'>
                                <h3 className='text-lg font-medium mb-0'>Fees & Taxes</h3>
                                <h4 className='text-lg font-medium mb-0'>$6.86</h4>
                            </div>
                            <div className='flex justify-between gap-2 mb-1'>
                                <h3 className='text-lg font-medium mb-0'>Shef Tip</h3>
                                <h4 className='text-lg font-medium mb-0'>$6.74</h4>
                            </div>
                            <div className='flex justify-between gap-2 mb-1 bg-primaryLight py-2 px-3 rounded-md'>
                                <h3 className='text-lg font-bold mb-0'>Total</h3>
                                <h4 className='text-lg font-bold mb-0'>$61.06</h4>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Checkout