// Modal.js
import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const CartModal = ({ isOpen, onRequestClose }) => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
    };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="cartModal"
    >
        <button className='absolute top-3 right-4 z-10 bg-white p-1 rounded-[6px]' onClick={onRequestClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
            </svg>
        </button>
      <div className=''>
        
        <img src="./media/frontend/img/restaurants/255x104/order-1.jpg" className="w-full h-[300px] img-fluid object-cover sticky top-0" alt="product-img" />
        <div className='relative p-4 bg-white'>
            <div>
                <h2 className='bg-greenLight py-1 px-3 rounded-[5px] text-secondary font-medium text-[12px] mb-0 inline-block leading-tight'>
                    Mexican
                    by <Link className='font-semibold !underline !text-secondary'>Michel</Link>
                </h2> 
            </div>
            <h6 className="text-lg text-secondary font-bold lg:mb-1 mb-3 lg:mt-0 mt-3">
                <Link> Guajillo Grilled Shrimps </Link>
            </h6>
            <div className='flex md:flex-nowrap flex-wrap items-center gap-3'>
                <div className='inline-flex gap-x-2 items-center bg-[#ffc00047] px-2 py-1 rounded-[4px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="rgba(0,0,0,1)">
                        <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                    </svg>
                    <h4 className='text-sm mb-0 font-semibold'>
                        100% <span className='text-[12px] font-normal'>(20)</span>
                    </h4>
                </div>
                <h4 className='bg-primaryLight px-3 py-1 text-sm rounded-[4px] inline-block mb-0'>Dairy Free</h4>
                <h4 className='bg-primaryLight px-3 py-1 text-sm rounded-[4px] inline-block mb-0'>Gluten Free</h4>
            </div>
            <div className='mt-5'>
                <div className='flex gap-3 mb-3'>
                    <div
                        onClick={() => handleTabClick(1)}
                        className={ activeTab === 1 ? '!border-b-2 !border-primary cursor-pointer font-semibold text-base' : 'cursor-pointer text-base' }
                    >
                    Description
                    </div>
                    <div
                        onClick={() => handleTabClick(2)}
                        className={ activeTab === 2 ? '!border-b-2 !border-primary cursor-pointer font-semibold text-base' : 'cursor-pointer text-base' }
                    >
                    Main ingredients
                    </div>
                </div>
                <div>
                    {activeTab === 1 && 
                        <p className='text-base'>
                            Juicy, sweet and rich Air Fried Chicken Breast and Steamed Cilantro Rice. 
                            This dish ties with the General Tso Chicken. Both a dedication to a 
                            childhood Chinese Carryout that happens to no longer be with us serving 
                            the Shaw-Howard Community. This dish is garnished with green onions and 
                            orange slices.
                        </p>
                    }
                    {activeTab === 2 && 
                        <p className='text-base'>
                            Orange juice, sugar, rice vinegar, soy sauce, ginger, garlic powder, 
                            red chili flakes, orange zest, corn starch, water, green onion, boneless 
                            chicken, cilantro, rice, orange slices, extra virgin olive oil
                        </p>
                    }
                </div>
                <div>
                    <div className="block w-full mt-6">
                        <h3 className='text-base font-bold'>Serving Count <span className='text-[11px] font-medium ml-3 bg-primaryLight text-secondary px-2 py-[3px] leading-tight rounded-[3px]'>Required</span></h3>
                        <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 mb-4 prtionRadio">
                            <div>
                                <span className="text-base font-medium mr-2">$16.99 16 oz container</span>
                                <span className='text-[12px]'>(1 serving)</span>
                            </div>
                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="radioGroup" value="option1" />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 mb-4 prtionRadio">
                            <div className='flex justify-between items-center w-full'>
                                <div>
                                    <span className="text-base font-medium mr-2">$40.99 16 oz container</span>
                                    <span className='text-[12px]'>(3 serving)</span>
                                </div>
                                <h6 className='text-[10px] text-primary mb-0 mr-3'>save 18%</h6>
                            </div>
                            <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="radioGroup" value="option2" />
                        </label>
                    </div>
                    {/* <div className='pb-12'></div>  */}
                </div>
                
                <div className='flex gap-4 sticky bottom-0 w-full left-0 z-10 bg-white'>
                    
                    <div className='flex items-center justify-between w-1/2 bg-primaryLight rounded-lg'>
                        <button className='w-[25%]'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M5 11V13H19V11H5Z"></path></svg>
                        </button>
                        <input className='w-[50%] text-center border-0 bg-transparent text-xs px-1' placeholder='1' />
                        <button className='w-[25%]'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                        </button>
                    </div>
                    <Link to="/cart" className='w-1/2 flex justify-center items-center gap-x-3 bg-primary rounded-lg py-3 px-3 '>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,1)"><path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path></svg>
                        <span className='text-white text-lg'>View Cart</span>
                    </Link>
                    
                </div>
            </div>
        </div>
      </div>
      
    </Modal>
  );
};

export default CartModal;
