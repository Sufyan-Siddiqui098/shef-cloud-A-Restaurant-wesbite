import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import ServingSizeModal from './ServingSizeModal';
import { handleGetFoodType, handleGetSpiceLevel } from '../../../services/shef';
import { useSelector } from 'react-redux';

const DetailStep = ({
    name, 
    food_type_id, 
    side_item, 
    tags, 
    portion_size, 
    portion_base_serving, 
    portion_type_id, 
    chef_earning_fee,
    platform_price,
    delivery_price,
    updateFields}) => {
    // Dish cuisine tags Start
    const [cusineSelectedOptions, setcusineSelectedOptions] = useState([]);
    const options = [
        { value: 'Mexican', label: 'Mexican' },
        { value: 'North Macedonian', label: 'North Macedonian' },
        { value: 'Swedish', label: 'Swedish' },
        { value: 'American', label: 'American' },
        { value: 'Persion', label: 'Persion' },
        // Add more options as needed
    ];
    
    const handleCusineSelectChange = (selectedValues) => {
        let tags_string = "";
        // comma seperated tags
        selectedValues.forEach((element, index) => {
            if(index===0){
                tags_string += element.value;
            } else {
                tags_string += `, ${element.value}`
            }
        });
        setcusineSelectedOptions(selectedValues);
        updateFields({tags: tags_string});
    };
    // Dish cuisine tags End

    // Serving Sizing Modal Work Start
    const [isServSizeModalOpen, setServSizeModalOpen] = useState(false);

    const openServSizeModal = () => {
        setServSizeModalOpen(true);
    };

    const closeServSizeModal = () => {
        setServSizeModalOpen(false);
    };
    // Serving Sizing Modal Work End

     
    const [ spiceLevel, setSpiceLevel ] = useState([]) 
    const [ foodType, setFoodType ] = useState([]);
    const { authToken } = useSelector((state)=>state.user)
    
    useEffect(()=>{
        (async()=>{
            try {
                const foodTypeResponse = await handleGetFoodType(authToken);
                setFoodType(foodTypeResponse);

            } catch (error) {
                console.log("Error While Fetching Food-type level \n", error)
            }

            try {
                const spiceResponse = await handleGetSpiceLevel(authToken)
                // const arr = response.map((el)=> ({...el, name: el.name.charAt(0).toUpperCase() + el.name.slice(1)}))
                // console.log("arr", arr)
                setSpiceLevel(spiceResponse)
            } catch (error) {
                console.log("Error While Fetching Spice level \n", error)
            }
        })()
    }, [authToken])

    useEffect(()=>{
        console.log("tags are ", tags)
        console.log(tags.split(", "))
    }, [tags])

    return (
        <div>
            <div className='container mx-auto'>
                <div className='lg:w-2/3 sm:w-4/5 w-full mx-auto'>
                    <h2 className='text-2xl font-semibold border-b mb-8 pb-2'>Dish Detail</h2>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Dish Name</h3>
                        <p className='text-[12px]'>Example: Mama Maria's Lasagna</p>
                        <input
                            type="text"
                            value={name}
                            onChange={e => updateFields({name: e.target.value})}
                            placeholder="Name your Dish"
                        />
                    </div>
                    <div className='mt-7 mb-5 border-b'></div>
                    <div>
                        <h3 className='text-lg font-semibold mb-2 leading-tight'>Food Type</h3>
                        <div className='grid md:grid-cols-6 grid-cols-3 gap-3 mb-4' id='group1'>

                            {/* Types */}
                            {foodType.map((type, index) => (
                            <label key={type.id} className="flex items-center justify-center cursor-pointer rounded-md px-3 border border-borderClr py-4 p-relative foodTypeRadio">
                                <div className='text-center'>
                                    <div className='mb-3'>
                                        {/* <svg className="mx-auto" height="30" width="30" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.59137,15.5H14.4075a.37779.37779,0,0,0,.3472-.2312l.8388-1.9884h.0281a.37986.37986,0,0,0,0-.7597H15.324A7.37649,7.37649,0,0,0,9.1655,5.59482a1.50255,1.50255,0,1,0-2.33208,0A7.37834,7.37834,0,0,0,.67385,12.5217H.37736a.37991.37991,0,0,0,0,.7598h.028l.83881,1.9884a.378.378,0,0,0,.34717.2312Zm5.724-11.15228a.746.746,0,1,1,.96065.99312.73724.73724,0,0,1-.57035-.0076A.75288.75288,0,0,1,7.31536,4.34772Zm.66847,1.91136H8A6.60891,6.60891,0,0,1,14.5682,12.487l-13.13747.0326A6.6071,6.6071,0,0,1,7.98491,6.26016ZM14.1585,14.7403H1.84151l-.61563-1.461H14.7741Zm-1.0124-3.3639a4.77416,4.77416,0,0,0-1.4253-2.75361.267.267,0,0,0-.3806.01085.2722.2722,0,0,0,.0107.38314,4.22113,4.22113,0,0,1,1.2626,2.43782.27052.27052,0,0,0,.2663.2322.17266.17266,0,0,0,.0399-.0032.271.271,0,0,0,.2275-.3083ZM4.4.77135a.26955.26955,0,1,0-.53908,0,.67365.67365,0,0,1-.23181.50687,1.20635,1.20635,0,0,0,0,1.72793.67007.67007,0,0,1,0,1.01375,1.19914,1.19914,0,0,0-.36442.86505.26955.26955,0,1,0,.53908,0,.67192.67192,0,0,1,.23181-.50688,1.20763,1.20763,0,0,0,0-1.729.67007.67007,0,0,1,0-1.01375A1.19841,1.19841,0,0,0,4.4.77135Zm8.28468,0a.26956.26956,0,1,0-.5391,0,.67385.67385,0,0,1-.2318.50687,1.20617,1.20617,0,0,0,0,1.72793.67009.67009,0,0,1,0,1.01375,1.19916,1.19916,0,0,0-.3645.86505.26956.26956,0,1,0,.5391,0,.67211.67211,0,0,1,.2318-.50688,1.20745,1.20745,0,0,0,0-1.729.67009.67009,0,0,1,0-1.01375A1.19844,1.19844,0,0,0,12.6847.77135ZM2.39678,3.51305a.26955.26955,0,1,0-.53908,0,.67189.67189,0,0,1-.2318.50687,1.2089,1.2089,0,0,0,0,1.7301.67739.67739,0,0,1,.2318.50687.26955.26955,0,1,0,.53908,0,1.20556,1.20556,0,0,0-.36442-.86505.67008.67008,0,0,1,0-1.01374A1.19913,1.19913,0,0,0,2.39678,3.51305Zm12.34182,0a.26956.26956,0,1,0-.5391,0,.67209.67209,0,0,1-.2318.50687,1.20617,1.20617,0,0,0,0,1.72793.67767.67767,0,0,1,.2318.50687.26956.26956,0,1,0,.5391,0,1.20032,1.20032,0,0,0-.3645-.864.67009.67009,0,0,1,0-1.01375A1.19846,1.19846,0,0,0,14.7386,3.51305Z" className="sc-iBPRYJ brBpOV"></path>
                                        </svg> */}
                                        {/* TODO: Image from Backend - !! Remove the svgs */}
                                        <img src={type.image} alt={type.name} className='mx-auto aspect-square h-[30px] w-[30px]' />
                                    </div>
                                    <h4 className='text-[14px] font-bold mb-0 leading-tight'>{type.name}</h4>
                                </div>
                                <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" onChange={()=> updateFields({ food_type_id: type.id  }) } checked={food_type_id===type.id} name="group1" value={type.id} />
                            </label>))}
                            
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex items-center gap-3'>
                            <div className='md:w-[70%]'>
                                <h3 className='text-lg font-semibold mb-1 leading-tight'>Does this main need a side?</h3>
                                <p className='text-[12px] mb-1'>Let us know if the customer needs to purchase a side item (e.g. rice, bread or a vegatable) separately for this dish.</p>
                            </div>
                            <div className='md:w-[30%]'>
                                {/* <div className="field flex justify-end">
                                    <input className="formSwitch-input" type="checkbox" id="email" name="email" value=" true" />
                                    <label for="email" className="formSwitch">
                                        <span className="formSwitch-label" data-on="Yes" data-off="No"></span>
                                        <span className="formSwitch-handle"></span>
                                    </label>
                                </div> */}
                                <div className='flex items-center justify-end bg-grayBg rounded-lg p-2' id="sideID">
                                    <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 p-relative dietaryRadio">
                                        <div className='flex justify-center items-center w-full'>
                                            <span className="text-base font-semibold">Yes</span>
                                        </div>
                                        <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" checked={side_item===1} name="sideID" value="1" onChange={()=> updateFields({side_item: 1})} />
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer rounded-md w-1/2 px-3 py-2 dietaryRadio">
                                        <div className='flex justify-center items-center w-full'>
                                            <span className="text-base font-semibold">No</span>
                                        </div>
                                        <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="sideID" checked={side_item===0} value="0" onChange={()=> updateFields({side_item: 0})} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-6 border-b'></div>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Spice options</h3>
                        <p className='text-[12px]'>Choose whether the spice level can be customized for this dish.</p>
                        <select id="selectOption" onChange={(e)=> updateFields({ spice_level_id: e.target.value }) } >
                            <option selected disabled >--- Select Spice Option ---</option>
                            {/* <option value="option1">Yes, spice level can be customized</option>
                            <option value="option2">No, spice level cannot be customized</option> */}
                            {spiceLevel.map((option)=>(
                                <option  value={option.id} key={option.id} >{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='my-6 border-b'></div>
                    <div className='rounded-lg bg-grayBg p-4'>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Dish cuisine tags</h3>
                        <p className='text-[12px]'>
                            Add up to 5 cuisine tags for your dish. You can arrange
                            the tags in the order of importance.
                        </p>
                        <Select
                            isMulti
                            options={options}
                            value={cusineSelectedOptions}
                            onChange={handleCusineSelectChange}
                            placeholder="+ Add geographical cuisine tags"
                        />
                        <ul className='mt-2'>
                            {cusineSelectedOptions.map((option) => (
                                <li className='bg-secondary text-white inline-block rounded-[4px] px-2 mr-2' key={option.value}>{option.label}</li>
                            ))}
                        </ul>
                        <div className='rounded-lg bg-grayBg pt-4'>
                            <div className='flex items-center gap-2'>
                                <svg className="sc-jSgupP ckDfJz" height="17" width="20" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5,14.6875a1.27335,1.27335,0,0,0,.15625.5625l.53125.7813a1.10979,1.10979,0,0,0,.84375.4687H10.9375a1.10961,1.10961,0,0,0,.8437-.4687l.5313-.7813a1.2741,1.2741,0,0,0,.1563-.5625V13.5001H7.5ZM9.96875.50029a5.471,5.471,0,0,0-4.125,9.06234,9.00227,9.00227,0,0,1,1.625,2.875v.0312H12.5v-.0312a9.00321,9.00321,0,0,1,1.625-2.875A5.44565,5.44565,0,0,0,9.96875.50029ZM10,3.50024a2.46115,2.46115,0,0,0-2.5,2.4687.53769.53769,0,0,1-.5.5.51392.51392,0,0,1-.5-.5A3.48765,3.48765,0,0,1,10,2.50026a.51392.51392,0,0,1,.5.5A.53769.53769,0,0,1,10,3.50024ZM3.5,6.46893a.76043.76043,0,0,0-.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2A.74029.74029,0,0,0,3.5,6.46893Zm15.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2a.74032.74032,0,0,0,.75-.75A.76046.76046,0,0,0,19.25,5.719ZM4.09375,2.219l-1.75-1a.721.721,0,0,0-.75-.03125.77077.77077,0,0,0-.375.65624.76171.76171,0,0,0,.375.65624l1.75,1a.718.718,0,0,0,.75.03125.84919.84919,0,0,0,.375-.65624A.7617.7617,0,0,0,4.09375,2.219ZM18.375,10.4689l-1.75-1a.718.718,0,0,0-.75-.03125.84934.84934,0,0,0-.375.65627.7618.7618,0,0,0,.375.6562l1.75,1a.70107.70107,0,0,0,1-.2813A.71605.71605,0,0,0,18.375,10.4689Zm-15.03125-1-1.75,1a.7617.7617,0,0,0-.375.6562.77064.77064,0,0,0,.375.6562.72112.72112,0,0,0,.75-.0312l1.75-1a.7437.7437,0,0,0,.25-1A.701.701,0,0,0,3.34375,9.46888ZM16.2812,3.594a.83208.83208,0,0,0,.375-.09375l1.7188-1a.72269.72269,0,0,0,.25-1,.701.701,0,0,0-1-.28125l-1.7187,1a.7569.7569,0,0,0-.375.84374A.77938.77938,0,0,0,16.2812,3.594Z" className="sc-iBPRYJ brBpOV"></path>
                                </svg>
                                <span className='text-base font-semibold'>Tips</span>
                            </div>
                            <ul className='mb-0 mt-2 pl-5'>
                                <li className='list-disc leading-tight mb-1'>Select up to 7 dish tags that best describe this dish.</li>
                                <li className='list-disc leading-tight mb-1'>We’ve included some of the tags from your cuisine profile, remove any that do not apply to this dish.</li>
                                <li className='list-disc leading-tight mb-1'>These selections will help your customers find your dish, so be sure to only select tags that describe it well.</li>
                            </ul>
                        </div>
                    </div>
                    <div className='my-6 border-b'></div>
                    <div className=''>
                        <div className='flex sm:flex-row flex-col justify-between sm:items-center items-start gap-4'>
                            <div>
                                <h3 className='text-lg font-semibold mb-1 leading-tight'>Serving size options</h3>
                                <h4 className='text-base font-normal mb-0 leading-tight'>Base serving size</h4>
                            </div>
                            <button onClick={openServSizeModal} className='bg-primaryDark text-white text-base font-semibold rounded-full px-5 py-2'>Add Base Serving</button>
                        </div>
                        <div className='rounded-lg bg-grayBg p-4 mt-4'>
                            <div className='flex items-center gap-2'>
                                <svg className="sc-jSgupP ckDfJz" height="17" width="20" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.5,14.6875a1.27335,1.27335,0,0,0,.15625.5625l.53125.7813a1.10979,1.10979,0,0,0,.84375.4687H10.9375a1.10961,1.10961,0,0,0,.8437-.4687l.5313-.7813a1.2741,1.2741,0,0,0,.1563-.5625V13.5001H7.5ZM9.96875.50029a5.471,5.471,0,0,0-4.125,9.06234,9.00227,9.00227,0,0,1,1.625,2.875v.0312H12.5v-.0312a9.00321,9.00321,0,0,1,1.625-2.875A5.44565,5.44565,0,0,0,9.96875.50029ZM10,3.50024a2.46115,2.46115,0,0,0-2.5,2.4687.53769.53769,0,0,1-.5.5.51392.51392,0,0,1-.5-.5A3.48765,3.48765,0,0,1,10,2.50026a.51392.51392,0,0,1,.5.5A.53769.53769,0,0,1,10,3.50024ZM3.5,6.46893a.76043.76043,0,0,0-.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2A.74029.74029,0,0,0,3.5,6.46893Zm15.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2a.74032.74032,0,0,0,.75-.75A.76046.76046,0,0,0,19.25,5.719ZM4.09375,2.219l-1.75-1a.721.721,0,0,0-.75-.03125.77077.77077,0,0,0-.375.65624.76171.76171,0,0,0,.375.65624l1.75,1a.718.718,0,0,0,.75.03125.84919.84919,0,0,0,.375-.65624A.7617.7617,0,0,0,4.09375,2.219ZM18.375,10.4689l-1.75-1a.718.718,0,0,0-.75-.03125.84934.84934,0,0,0-.375.65627.7618.7618,0,0,0,.375.6562l1.75,1a.70107.70107,0,0,0,1-.2813A.71605.71605,0,0,0,18.375,10.4689Zm-15.03125-1-1.75,1a.7617.7617,0,0,0-.375.6562.77064.77064,0,0,0,.375.6562.72112.72112,0,0,0,.75-.0312l1.75-1a.7437.7437,0,0,0,.25-1A.701.701,0,0,0,3.34375,9.46888ZM16.2812,3.594a.83208.83208,0,0,0,.375-.09375l1.7188-1a.72269.72269,0,0,0,.25-1,.701.701,0,0,0-1-.28125l-1.7187,1a.7569.7569,0,0,0-.375.84374A.77938.77938,0,0,0,16.2812,3.594Z" className="sc-iBPRYJ brBpOV"></path>
                                </svg>
                                <span className='text-base font-semibold'>Tips</span>
                            </div>
                            <ul className='mb-0 mt-2 pl-5'>
                                <li className='list-disc leading-tight mb-1'>
                                    Single serving mains and 1 or 1-2 serving sides are our
                                    most popular dishes.
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
                        <div>
                            <ServingSizeModal 
                                portion_type_id={portion_type_id} 
                                portion_base_serving={portion_base_serving}
                                portion_size={portion_size}
                                delivery_price={delivery_price}
                                platform_price={platform_price}
                                chef_earning_fee={chef_earning_fee} 
                                authToken={authToken} 
                                isOpen={isServSizeModalOpen} 
                                updateFields={updateFields}
                                onClose={closeServSizeModal} 
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default DetailStep;
