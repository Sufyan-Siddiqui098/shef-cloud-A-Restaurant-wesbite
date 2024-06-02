

import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { handleGetPortionType } from '../../../services/shef';
import { toast } from 'react-toastify';
const MenuModal = ({ 
    isOpen, 
    onClose, 
    authToken, 
    portion_type_id,
    base_type_id,
    portion_size,  
    delivery_price, 
    platform_price,
    chef_earning_fee,  
    updateFields }) => {
    // Tabs Section Start
    const [activeTab, setActiveTab] = useState(1);
    const handleTabClick = (tabNumber) => {
        // Update the active tab when clicked
        setActiveTab(tabNumber);
        // base_type_id in ChefMenu
        updateFields({ base_type_id: tabNumber });
        // Reseting
        setTextualPortionSize("");
        setNumericPortionSize(0)
    };
    // Tabs Section End

    // Plus Minus Quantity Start - Numeric Portion Size
    const [numericPortionSize, setNumericPortionSize] = useState(0);

    const handleIncrement = () => {
        setNumericPortionSize((prev) => prev + 1);
        // Reset the textual portionsize
        if( textualPortionSize.length > 0 ) setTextualPortionSize("")
    };

    const handleDecrement = () => {
        setNumericPortionSize((prev) => (prev > 0 ? prev - 1 : 0));
        // Reset the textual portionsize
        if( textualPortionSize.length > 0 ) setTextualPortionSize("")
    };

    const handleNumericPortionSizeChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setNumericPortionSize(isNaN(value) ? 0 : value);
        // Reset the textual portionsize
        if( textualPortionSize.length > 0 ) setTextualPortionSize("")
    };
    // Plus Minus Quantity End

     //-- Textual portion size
     const [textualPortionSize, setTextualPortionSize] = useState("")

     const handleTextPortionSizeChange = (e) => {
         setTextualPortionSize(e.target.value);
         // Reset the numeric portionsize
         if(numericPortionSize>0) setNumericPortionSize(0);
     }

     //-- Base number of servings
     const [baseServing, setBaseServing] = useState("")
     const handleBaseServing = (e) => {
        // setBaseServing(e.target.value);
        const value = parseInt(e.target.value, 10);
        updateFields({ portion_type_id: isNaN(value) ? "" : value });
     }

     // -- Price Handling
    const [price, setPrice] = useState("")
    const hanldePriceChange = (e) => {
        // Regular expression to match only numbers and one dot
        const regex = /^[+-]?\d+(\.\d+)?$/; // Allows optional sign, numbers, one or more decimals
        let value = e.target.value;
      
        if (regex.test(value)) {
          const parsedValue = parseFloat(value);
          calculate(parsedValue)
          setPrice(parsedValue);
        } else {
            setPrice("")
            calculate(0)     
        }
    }

     const onCancel = ()=>{
        setNumericPortionSize(0); 
        setTextualPortionSize("");
        setPrice("");
        onClose();
     }

     const [portionTypes, setPortionTypes] = useState([]);
    const [chefEarning, setChefEarning ] = useState(0);
    const [platformRate, setPlatformRate] = useState({
        platform_percentage: 10,
        delivery_percentage: 20,
    })
    // need changes !!
    const calculate = (price) => {
        const deliveryCost = parseFloat((price * (platformRate.delivery_percentage/100)).toFixed(2));
        const platformCost = parseFloat((price * (platformRate.platform_percentage/100)).toFixed(2));
        const chefEarning = parseFloat((price - deliveryCost - platformCost).toFixed(2));

        // Update Delivery price & platform_price in Chef-Menu
        updateFields({ delivery_price: deliveryCost })
        updateFields({ platform_price: platformCost })
        updateFields({ chef_earning_fee: chefEarning })  // After minus delivery and platform cost
        setChefEarning(chefEarning)
    }
     //--- Handle Portion type -api 
     useEffect(()=>{
        (async()=>{
            try {
                const portionTypeResponse = await handleGetPortionType(authToken);
                setPortionTypes(portionTypeResponse);
                //  console.log("portion type response ", portionTypeResponse)
            } catch (error) {
                console.log("Error while fetching Portion Type \n", error)
            }
        })()
     }, [authToken]);

     //--- Handle data from Chef-Menu
     useEffect(()=>{
        // When Modal is open - Set the data fetched from chef-menu
        if(isOpen){
            if(typeof portion_size === "number") setNumericPortionSize(portion_size)
            if(typeof portion_size ==="string") setTextualPortionSize(portion_size)

            if(base_type_id) {
                setActiveTab(base_type_id)
            }
                // Need changes !!
            // Active Corresponding tab to portion_type_id
            // if(portionTypes.length>0) portionTypes.forEach((el, index)=> {
            //     // Set the active - When Id is matched with Chef-menu
            //     if(el.id === portion_type_id){
            //         setActiveTab(index+1)
            //     }
            // })

            // setBaseServing(portion_base_serving)
            if(delivery_price > 0 && platform_price > 0 && chef_earning_fee >0 ) {
                setChefEarning(chef_earning_fee)
                setPrice( delivery_price + platform_price + chef_earning_fee )

            }

            // ---Need changes end !!
        }
        //eslint-disable-next-line
     }, [isOpen])
     
     //--- On Submit - Done -- Need Review and Changes 
     const onSubmit = (e) =>{
        try {
            // Validation 
            if(activeTab === 1 || activeTab === 2){
                if(numericPortionSize ===0) {
                    toast.error("Portion Size is Required")
                    inputRefPortionSize.current.focus();
                    return;
                } 
                else if( price <1 || !price ) {
                    toast.error("Base Price is Required");
                    inputRefPrice.current.focus();
                    return ;
                } 
                // -- need changes !!
                else if(!portion_type_id ){
                    toast.error("Base Number of Serving is Required ");
                    inputRefBaseServing.current.focus();
                    return;
                }
                else {
                    updateFields({ portion_size: numericPortionSize });
                }
            }
            if(activeTab === 3) {
                if(textualPortionSize.length<1) {
                    toast.error("Portion Size is Required");
                    inputRefPortionSize.current.focus();
                    return;
                } 
                else if( price <1 || !price ) {
                    toast.error("Base Price is Required");
                    inputRefPrice.current.focus();
                    return ;
                } 
                else if(!portion_type_id ){
                    toast.error("Base Number of Serving is Required ");
                    inputRefBaseServing.current.focus();
                    return;
                }
                else {
                    updateFields({ portion_size: textualPortionSize })
                } 
            }

            // Update portion_type_id for - Create Menu
            updateFields({ portion_type_id: portionTypes[activeTab-1].id })  
            toast.success("Base Portion Added")
            onClose();

        } catch (error) {
            toast.error(error);
        }
     }

     // Reference input fields
     const inputRefPrice = useRef(null);
     const inputRefBaseServing = useRef(null);
     const inputRefPortionSize = useRef(null)

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="ServSizeModal"
        >
            {/* Modal content here */}
            <div className='flex items-center justify-between border-b pb-3 gap-3'>
                <h2 className='text-lg font-semibold mb-1 leading-tight mb-0'>Base serving size & price</h2>
                <button onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,1)">
                        <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                    </svg>
                </button>
            </div>

            <div className='pt-6'>
                <p>
                    Add portion and price information for the smallest serving you want to offer. Next you can add options for larger portion sizes.
                </p>
                <p className='font-semibold'>
                    We recommend setting 1 serving as the smallest portion for most dishes.
                </p>
                <div className='flex items-center border-b mb-3 gap-4 mt-6'>
                    <button
                        onClick={() => handleTabClick(1)}
                        className={`serviSizetab pb-1 ${activeTab === 1 ? 'active' : ''}`}
                    >
                        Container
                    </button>
                    <button
                        onClick={() => handleTabClick(2)}
                        className={`serviSizetab pb-1 ${activeTab === 2 ? 'active' : ''}`}
                    >
                        Pieces
                    </button>
                    <button
                        onClick={() => handleTabClick(3)}
                        className={`serviSizetab pb-1 ${activeTab === 3 ? 'active' : ''}`}
                    >
                        Other
                    </button>
                </div>

                <div>
                    {activeTab === 1 &&
                        <div>
                            <div className='bg-grayBg rounded-lg p-3 '>
                                <h3 className='text-base font-semibold mb-2 leading-tight'>Base portion size</h3>
                                <div className='bg-secondary py-2 px-3 rounded-lg flex md:flex-row flex-col justify-between md:items-center items-start gap-y-2'>
                                    <div className=''>
                                        <div className='flex items-center border-b gap-2'>
                                            <h3 className='text-base mb-0 text-white'>17 oz container</h3>
                                            <h3 className='text-base mb-0 text-white'>|</h3>
                                            <h3 className='text-base font-semibold mb-0 text-white'>$12.00</h3>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='text-[12px] mb-0 text-white'>Earn <span className='font-semibold text-primaryGreen'>$9.00</span> per sale</h3>
                                        </div>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <h4 className='text-[12px] bg-grayBg mb-0 px-2 rounded-[3px]'>
                                            3 servings
                                        </h4>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#fff">
                                                <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-2 mt-6'>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>Base portion size</h3>
                                    <p className='text-[12px] mb-1'>
                                        Dishes that are portioned as number of ounces.
                                    </p>
                                </div>
                                <div className='flex items-center justify-between md:w-[35%] w-[45%] bg-grayBg rounded-lg'>
                                    <button onClick={handleDecrement} className='w-[25%]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M5 11V13H19V11H5Z"></path></svg>
                                    </button>
                                    <div className='flex items-center w-[50%]'>
                                        <input className='text-center border-0 bg-transparent text-base px-1 focus:border-0 w-[60%]'
                                            required
                                            ref={inputRefPrice}
                                            placeholder='1'
                                            value={numericPortionSize}
                                            onChange={handleNumericPortionSizeChange}
                                        />
                                        <span className='w-[40%]'>oz</span>
                                    </div>
                                    <button onClick={handleIncrement} className='w-[25%]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div className='my-6 border-b'></div>
                            <div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>Base number of servings</h3>
                                    <p className='text-[12px]'>
                                        This should be your smallest serving for this dish. You can add larger options on the next page.
                                    </p>
                                </div>
                                <select ref={inputRefBaseServing} value={portion_type_id} onChange={handleBaseServing} id="selectOption">
                                    <option value="">Servings</option>
                                    {portionTypes.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                    {/* <option value="1 Serving">1 Serving</option>
                                    <option value="2 Serving">2 Serving</option>
                                    <option value="2-3 Serving">2-3 Serving</option>
                                    <option value="3 Serving">3 Serving</option>
                                    <option value="3-4 Serving">3-4 Serving</option> */}
                                </select>
                                <p className='text-[12px] my-1'>
                                    Similar sized dishes are usually 1-2 servings.
                                </p>
                            </div>
                            <div className='my-6 border-b'></div>
                            <div className='md:flex-row flex-col md:items-center items-start justify-between gap-2 mt-6'>
                                <div className='w-[80%]'>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>Base price for this portion</h3>
                                    <p className='text-[12px] mb-1'>
                                        We recommend setting a price that ends with either .49 or .99
                                    </p>
                                </div>
                                <div className='md:w-[20%] w-[45%] flex items-center justify-start border border-headGray rounded-lg px-2'>
                                    <span className='text-lg font-semibold mr-1 w-[10%]'>$</span>
                                    <input 
                                        required
                                        className='text-start border-0 bg-transparent text-base px-1 focus:border-0 w-[90%]'
                                        placeholder=''
                                        ref={inputRefPrice}
                                        type='number'
                                        min={0} 
                                        step={0.01}
                                        value={price}
                                        onChange={hanldePriceChange}
                                    />
                                </div>
                            </div>
                            <p className='bg-grayBg p-3 rounded-lg text-center mt-3'>
                                Similar dishes are usually priced between $9.99 and $13.99.
                            </p>
                            <div className='rounded-lg bg-grayBg p-4 mt-4'>
                                <div className='flex items-center gap-2'>
                                    <svg className="sc-jSgupP ckDfJz" height="17" width="20" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5,14.6875a1.27335,1.27335,0,0,0,.15625.5625l.53125.7813a1.10979,1.10979,0,0,0,.84375.4687H10.9375a1.10961,1.10961,0,0,0,.8437-.4687l.5313-.7813a1.2741,1.2741,0,0,0,.1563-.5625V13.5001H7.5ZM9.96875.50029a5.471,5.471,0,0,0-4.125,9.06234,9.00227,9.00227,0,0,1,1.625,2.875v.0312H12.5v-.0312a9.00321,9.00321,0,0,1,1.625-2.875A5.44565,5.44565,0,0,0,9.96875.50029ZM10,3.50024a2.46115,2.46115,0,0,0-2.5,2.4687.53769.53769,0,0,1-.5.5.51392.51392,0,0,1-.5-.5A3.48765,3.48765,0,0,1,10,2.50026a.51392.51392,0,0,1,.5.5A.53769.53769,0,0,1,10,3.50024ZM3.5,6.46893a.76043.76043,0,0,0-.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2A.74029.74029,0,0,0,3.5,6.46893Zm15.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2a.74032.74032,0,0,0,.75-.75A.76046.76046,0,0,0,19.25,5.719ZM4.09375,2.219l-1.75-1a.721.721,0,0,0-.75-.03125.77077.77077,0,0,0-.375.65624.76171.76171,0,0,0,.375.65624l1.75,1a.718.718,0,0,0,.75.03125.84919.84919,0,0,0,.375-.65624A.7617.7617,0,0,0,4.09375,2.219ZM18.375,10.4689l-1.75-1a.718.718,0,0,0-.75-.03125.84934.84934,0,0,0-.375.65627.7618.7618,0,0,0,.375.6562l1.75,1a.70107.70107,0,0,0,1-.2813A.71605.71605,0,0,0,18.375,10.4689Zm-15.03125-1-1.75,1a.7617.7617,0,0,0-.375.6562.77064.77064,0,0,0,.375.6562.72112.72112,0,0,0,.75-.0312l1.75-1a.7437.7437,0,0,0,.25-1A.701.701,0,0,0,3.34375,9.46888ZM16.2812,3.594a.83208.83208,0,0,0,.375-.09375l1.7188-1a.72269.72269,0,0,0,.25-1,.701.701,0,0,0-1-.28125l-1.7187,1a.7569.7569,0,0,0-.375.84374A.77938.77938,0,0,0,16.2812,3.594Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <span className='text-base font-semibold'>Tips</span>
                                </div>
                                <ul className='mb-0 mt-2 pl-5'>
                                    <li className='list-disc leading-tight mb-1'>
                                        Single serving mains and 1 or 1-2 serving sides are our most popular dishes.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        Your base serving price will be what customers see most often. Make sure it's priced as competitively as possible.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        You can use the price recommendation provided as a guide, we’ve based it off of other top selling dishes in your city.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        Lower-priced dishes with a generous portion size typically sell best, especially for new dishes.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        When dishes are priced too high, customers tend to opt for other items—setting higher prices does not mean that you’ll make more money.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        If you do choose to set your prices above these recommendations, we recommend you make the value clear to your customer.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    {activeTab === 2 &&
                        <div>
                            <div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-2 mt-6'>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>Base portion size</h3>
                                    <p className='text-[12px] mb-1'>
                                        Dishes that are portioned as number of ounces.
                                    </p>
                                </div>
                                <div className='flex items-center justify-between md:w-[35%] w-[60%] bg-grayBg rounded-lg'>
                                    <button onClick={handleDecrement} className='w-[25%]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M5 11V13H19V11H5Z"></path></svg>
                                    </button>
                                    <div className='flex items-center w-[50%]'>
                                        <input 
                                            required
                                            ref={inputRefPortionSize}
                                            className='text-center border-0 bg-transparent text-base px-1 focus:border-0 w-[60%]'
                                            placeholder='1'
                                            value={numericPortionSize}
                                            onChange={handleNumericPortionSizeChange}
                                        />
                                        <span className='w-[50%]'>Pieces</span>
                                    </div>
                                    <button onClick={handleIncrement} className='w-[25%]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div className='my-6 border-b'></div>
                            <div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>Base number of servings</h3>
                                    <p className='text-[12px]'>
                                        This should be your smallest serving for this dish. You can add larger options on the next page.
                                    </p>
                                </div>
                                <select ref={inputRefBaseServing} value={portion_type_id} onChange={handleBaseServing} id="selectOption">
                                    <option value="">Servings</option>
                                    {portionTypes.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                    {/* <option value="1 Serving">1 Serving</option>
                                    <option value="1-2 Serving">1-2 Serving</option>
                                    <option value="2 Serving">2 Serving</option>
                                    <option value="2-3 Serving">2-3 Serving</option>
                                    <option value="3 Serving">3 Serving</option>
                                    <option value="3-4 Serving">3-4 Serving</option> */}
                                </select>
                                <p className='text-[12px] my-1'>
                                    Similar sized dishes are usually 1-2 servings.
                                </p>
                            </div>
                            <div className='my-6 border-b'></div>
                            <div className='md:flex-row flex-col md:items-center items-start justify-between gap-2 mt-6'>
                                <div className='w-[80%]'>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>Base price for this portion</h3>
                                    <p className='text-[12px] mb-1'>
                                        We recommend setting a price that ends with either .49 or .99
                                    </p>
                                </div>
                                <div className='md:w-[20%] w-[45%] flex items-center justify-start border border-headGray rounded-lg px-2'>
                                    <span className='text-lg font-semibold mr-1 w-[10%]'>$</span>
                                    <input 
                                        required
                                        className='text-start border-0 bg-transparent text-base px-1 focus:border-0 w-[90%]'
                                        placeholder=''
                                        ref={inputRefPrice}
                                        type='number'
                                        min={0} 
                                        step={0.01}
                                        value={price}
                                        onChange={hanldePriceChange}
                                    />
                                </div>
                            </div>
                            <p className='bg-grayBg p-3 rounded-lg text-center mt-3'>
                                Similar dishes are usually priced between $9.99 and $13.99.
                            </p>
                            <div className='rounded-lg bg-grayBg p-4 mt-4'>
                                <div className='flex items-center gap-2'>
                                    <svg className="sc-jSgupP ckDfJz" height="17" width="20" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5,14.6875a1.27335,1.27335,0,0,0,.15625.5625l.53125.7813a1.10979,1.10979,0,0,0,.84375.4687H10.9375a1.10961,1.10961,0,0,0,.8437-.4687l.5313-.7813a1.2741,1.2741,0,0,0,.1563-.5625V13.5001H7.5ZM9.96875.50029a5.471,5.471,0,0,0-4.125,9.06234,9.00227,9.00227,0,0,1,1.625,2.875v.0312H12.5v-.0312a9.00321,9.00321,0,0,1,1.625-2.875A5.44565,5.44565,0,0,0,9.96875.50029ZM10,3.50024a2.46115,2.46115,0,0,0-2.5,2.4687.53769.53769,0,0,1-.5.5.51392.51392,0,0,1-.5-.5A3.48765,3.48765,0,0,1,10,2.50026a.51392.51392,0,0,1,.5.5A.53769.53769,0,0,1,10,3.50024ZM3.5,6.46893a.76043.76043,0,0,0-.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2A.74029.74029,0,0,0,3.5,6.46893Zm15.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2a.74032.74032,0,0,0,.75-.75A.76046.76046,0,0,0,19.25,5.719ZM4.09375,2.219l-1.75-1a.721.721,0,0,0-.75-.03125.77077.77077,0,0,0-.375.65624.76171.76171,0,0,0,.375.65624l1.75,1a.718.718,0,0,0,.75.03125.84919.84919,0,0,0,.375-.65624A.7617.7617,0,0,0,4.09375,2.219ZM18.375,10.4689l-1.75-1a.718.718,0,0,0-.75-.03125.84934.84934,0,0,0-.375.65627.7618.7618,0,0,0,.375.6562l1.75,1a.70107.70107,0,0,0,1-.2813A.71605.71605,0,0,0,18.375,10.4689Zm-15.03125-1-1.75,1a.7617.7617,0,0,0-.375.6562.77064.77064,0,0,0,.375.6562.72112.72112,0,0,0,.75-.0312l1.75-1a.7437.7437,0,0,0,.25-1A.701.701,0,0,0,3.34375,9.46888ZM16.2812,3.594a.83208.83208,0,0,0,.375-.09375l1.7188-1a.72269.72269,0,0,0,.25-1,.701.701,0,0,0-1-.28125l-1.7187,1a.7569.7569,0,0,0-.375.84374A.77938.77938,0,0,0,16.2812,3.594Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <span className='text-base font-semibold'>Tips</span>
                                </div>
                                <ul className='mb-0 mt-2 pl-5'>
                                    <li className='list-disc leading-tight mb-1'>
                                        Single serving mains and 1 or 1-2 serving sides are our most popular dishes.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        Your base serving price will be what customers see most often. Make sure it's priced as competitively as possible.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        You can use the price recommendation provided as a guide, we’ve based it off of other top selling dishes in your city.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        Lower-priced dishes with a generous portion size typically sell best, especially for new dishes.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        When dishes are priced too high, customers tend to opt for other items—setting higher prices does not mean that you’ll make more money.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        If you do choose to set your prices above these recommendations, we recommend you make the value clear to your customer.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    {activeTab === 3 &&
                        <div>
                            <div className='mt-6'>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>Base portion size</h3>
                                    <p className='text-[12px] mb-2'>
                                        Dishes that are portioned as number of ounces.
                                    </p>
                                </div>
                                <div className=''>
                                    <input 
                                        required
                                        ref={inputRefPortionSize}
                                        className='text-start text-base px-3 '
                                        placeholder='500gm + 2 pieces roti + salad'
                                        value={textualPortionSize}
                                        onChange={handleTextPortionSizeChange}
                                    />
                                </div>
                            </div>
                            <div className='my-6 border-b'></div>
                            <div>
                                <div>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>Base number of servings</h3>
                                    <p className='text-[12px]'>
                                        This should be your smallest serving for this dish. You can add larger options on the next page.
                                    </p>
                                </div>
                                <select ref={inputRefBaseServing} value={portion_type_id} onChange={handleBaseServing} id="selectOption">
                                    <option value="">Servings</option>
                                    {portionTypes.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                    {/* <option value="1 Serving">1 Serving</option>
                                    <option value="1-2 Serving">1-2 Serving</option>
                                    <option value="2 Serving">2 Serving</option>
                                    <option value="2-3 Serving">2-3 Serving</option>
                                    <option value="3 Serving">3 Serving</option>
                                    <option value="3-4 Serving">3-4 Serving</option> */}
                                </select>
                                <p className='text-[12px] my-1'>
                                    Similar sized dishes are usually 1-2 servings.
                                </p>
                            </div>
                            <div className='my-6 border-b'></div>
                            <div className='md:flex-row flex-col md:items-center items-start justify-between gap-2 mt-6'>
                                <div className='w-[80%]'>
                                    <h3 className='text-lg font-semibold mb-1 leading-tight'>Base price for this portion</h3>
                                    <p className='text-[12px] mb-1'>
                                        We recommend setting a price that ends with either .49 or .99
                                    </p>
                                </div>
                                <div className='md:w-[20%] w-[45%] flex items-center justify-start border border-headGray rounded-lg px-2'>
                                    <span className='text-lg font-semibold mr-1 w-[10%]'>$</span>
                                    <input 
                                        required
                                        className='text-start border-0 bg-transparent text-base px-1 focus:border-0 w-[90%]'
                                        placeholder=''
                                        ref={inputRefPrice}
                                        type='number'
                                        min={0}
                                        step={0.01}
                                        value={price}
                                        onChange={hanldePriceChange}
                                    />
                                </div>
                            </div>
                            <p className='bg-grayBg p-3 rounded-lg text-center mt-3'>
                                Similar dishes are usually priced between $9.99 and $13.99.
                            </p>
                            <div className='rounded-lg bg-grayBg p-4 mt-4'>
                                <div className='flex items-center gap-2'>
                                    <svg className="sc-jSgupP ckDfJz" height="17" width="20" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5,14.6875a1.27335,1.27335,0,0,0,.15625.5625l.53125.7813a1.10979,1.10979,0,0,0,.84375.4687H10.9375a1.10961,1.10961,0,0,0,.8437-.4687l.5313-.7813a1.2741,1.2741,0,0,0,.1563-.5625V13.5001H7.5ZM9.96875.50029a5.471,5.471,0,0,0-4.125,9.06234,9.00227,9.00227,0,0,1,1.625,2.875v.0312H12.5v-.0312a9.00321,9.00321,0,0,1,1.625-2.875A5.44565,5.44565,0,0,0,9.96875.50029ZM10,3.50024a2.46115,2.46115,0,0,0-2.5,2.4687.53769.53769,0,0,1-.5.5.51392.51392,0,0,1-.5-.5A3.48765,3.48765,0,0,1,10,2.50026a.51392.51392,0,0,1,.5.5A.53769.53769,0,0,1,10,3.50024ZM3.5,6.46893a.76043.76043,0,0,0-.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2A.74029.74029,0,0,0,3.5,6.46893Zm15.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2a.74032.74032,0,0,0,.75-.75A.76046.76046,0,0,0,19.25,5.719ZM4.09375,2.219l-1.75-1a.721.721,0,0,0-.75-.03125.77077.77077,0,0,0-.375.65624.76171.76171,0,0,0,.375.65624l1.75,1a.718.718,0,0,0,.75.03125.84919.84919,0,0,0,.375-.65624A.7617.7617,0,0,0,4.09375,2.219ZM18.375,10.4689l-1.75-1a.718.718,0,0,0-.75-.03125.84934.84934,0,0,0-.375.65627.7618.7618,0,0,0,.375.6562l1.75,1a.70107.70107,0,0,0,1-.2813A.71605.71605,0,0,0,18.375,10.4689Zm-15.03125-1-1.75,1a.7617.7617,0,0,0-.375.6562.77064.77064,0,0,0,.375.6562.72112.72112,0,0,0,.75-.0312l1.75-1a.7437.7437,0,0,0,.25-1A.701.701,0,0,0,3.34375,9.46888ZM16.2812,3.594a.83208.83208,0,0,0,.375-.09375l1.7188-1a.72269.72269,0,0,0,.25-1,.701.701,0,0,0-1-.28125l-1.7187,1a.7569.7569,0,0,0-.375.84374A.77938.77938,0,0,0,16.2812,3.594Z" className="sc-iBPRYJ brBpOV"></path>
                                    </svg>
                                    <span className='text-base font-semibold'>Tips</span>
                                </div>
                                <ul className='mb-0 mt-2 pl-5'>
                                    <li className='list-disc leading-tight mb-1'>
                                        Single serving mains and 1 or 1-2 serving sides are our most popular dishes.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        Your base serving price will be what customers see most often. Make sure it's priced as competitively as possible.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        You can use the price recommendation provided as a guide, we’ve based it off of other top selling dishes in your city.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        Lower-priced dishes with a generous portion size typically sell best, especially for new dishes.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        When dishes are priced too high, customers tend to opt for other items—setting higher prices does not mean that you’ll make more money.
                                    </li>
                                    <li className='list-disc leading-tight mb-1'>
                                        If you do choose to set your prices above these recommendations, we recommend you make the value clear to your customer.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    <div className='my-6 pt-2 border-b'></div>
                    <div>
                        <div className=''>
                            <h3 className='text-xl font-semibold mb-1 leading-tight'>
                                Price Breakdown
                            </h3>
                            <div className='flex items-center rounded-lg overflow-hidden my-3'>
                                <div className='w-[80%] py-2 bg-primaryGreen'></div>
                                <div className='w-[8%] py-2 bg-red-300'></div>
                                <div className='w-[12%] py-2 bg-[#30abaf]'></div>
                            </div>
                            <ul className='mb-0 mt-2 pl-5'>
                                <li className='text-lg leading-tight mb-3 '>
                                    <div className='flex items-center gap-x-2'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#48bb4e">
                                                <path d="M12 21.9967C6.47715 21.9967 2 17.5196 2 11.9967C2 6.47386 6.47715 1.9967 12 1.9967C17.5228 1.9967 22 6.47386 22 11.9967C22 17.5196 17.5228 21.9967 12 21.9967ZM12 19.9967C16.4183 19.9967 20 16.415 20 11.9967C20 7.57843 16.4183 3.9967 12 3.9967C7.58172 3.9967 4 7.57843 4 11.9967C4 16.415 7.58172 19.9967 12 19.9967ZM12 17.9967V5.9967C15.3137 5.9967 18 8.683 18 11.9967C18 15.3104 15.3137 17.9967 12 17.9967Z"></path>
                                            </svg>
                                        </span>
                                        <span>You earn <span className='text-primaryGreen font-semibold'>${chefEarning}</span> from each dish sold!</span>
                                    </div>
                                </li>
                                <li className='text-lg leading-tight mb-3 '>
                                    <div className='flex items-center gap-x-2'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#fca5a5">
                                                <path d="M12 21.9967C6.47715 21.9967 2 17.5196 2 11.9967C2 6.47386 6.47715 1.9967 12 1.9967C17.5228 1.9967 22 6.47386 22 11.9967C22 17.5196 17.5228 21.9967 12 21.9967ZM12 19.9967C16.4183 19.9967 20 16.415 20 11.9967C20 7.57843 16.4183 3.9967 12 3.9967C7.58172 3.9967 4 7.57843 4 11.9967C4 16.415 7.58172 19.9967 12 19.9967ZM12 17.9967V5.9967C15.3137 5.9967 18 8.683 18 11.9967C18 15.3104 15.3137 17.9967 12 17.9967Z"></path>
                                            </svg>
                                        </span>
                                        <span>
                                            {/* {((platformRate.platform_percentage/100)*price).toFixed(2)} */}
                                            {/* Platform collects --> might be !! */}
                                            Shef collects <span className='text-[#fca5a5] font-semibold'>{platformRate.platform_percentage}%</span> to cover marketing, customer support and software development
                                        </span>
                                    </div>
                                </li>
                                <li className='text-lg leading-tight mb-3 '>
                                    <div className='flex items-center gap-x-2'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#30abaf">
                                                <path d="M12 21.9967C6.47715 21.9967 2 17.5196 2 11.9967C2 6.47386 6.47715 1.9967 12 1.9967C17.5228 1.9967 22 6.47386 22 11.9967C22 17.5196 17.5228 21.9967 12 21.9967ZM12 19.9967C16.4183 19.9967 20 16.415 20 11.9967C20 7.57843 16.4183 3.9967 12 3.9967C7.58172 3.9967 4 7.57843 4 11.9967C4 16.415 7.58172 19.9967 12 19.9967ZM12 17.9967V5.9967C15.3137 5.9967 18 8.683 18 11.9967C18 15.3104 15.3137 17.9967 12 17.9967Z"></path>
                                            </svg>
                                        </span>
                                        <span>
                                            Separately,<span className='text-[#30abaf] font-semibold'> ${((platformRate.delivery_percentage/100)*price).toFixed(2)}</span> goes towards operations and delivery costs.
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex items-center justify-end mt-4 gap-2'>
                        <button type='button' onClick={onCancel} className='shefBtnBorder'>Cancel</button>
                        <button onClick={onSubmit} type='submit' className='text-lg font-bold bg-primaryDark px-[22px] py-[6px] uppercase text-white rounded-[6px] disabled:opacity-60'>Submit</button>
                    </div>
                </div>
            </div>

        </Modal>
    );
};

export default MenuModal;
