import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { handleGetHeatingInstruction } from '../../../services/shef';
import { handleGetCitites } from '../../../services/region';
import Select from 'react-select';

const   MoreInformationScreen = ({  instruction_template_id, reheating_instruction, expiry_days, cities, packaging, updateFields}) => {
    // Plus Minus Quantity Start
    // const [minutes, setMinutes] = useState(0);

    const handleIncrement = () => {
        // setMinutes((prev)=> prev+1)
        updateFields({ expiry_days: expiry_days + 1 })
    };
    
    const handleDecrement = () => {
        updateFields({ expiry_days: expiry_days > 0 ? expiry_days - 1 : 0 })
        // setMinutes((prev)=> prev > 0 ? prev - 1 : 0)
        
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        //--- Update expiry in Chef-Menu
        updateFields({ expiry_days: isNaN(value) ? 0 : value })
    };
    // Plus Minus Quantity End
    
    const { authToken } = useSelector((state)=>state.user)
    const [heatInstruction, setHeatInstruction] = useState([]) 
    const [ citiesOption, setCitiesOption ] = useState([])    // cities from api
    const [ selectedCities, setSelectedCities ] = useState([]);

    //handle cities selection - hold id
    const handleCitiesChange = (selectedValue) => {
        console.log("selected", selectedValue)
        setSelectedCities(selectedValue)
        const selectedCitiesID = selectedValue.map((item) => item.id);
        updateFields({ cities: selectedCitiesID }) // Update in Chef Menu
    }
    
    // Get Heating-Instruction & Cities API
    useEffect(()=>{
        (async()=>{
            try {
                const response = await handleGetHeatingInstruction(authToken);   
                setHeatInstruction(response)
            } catch (error) {
                console.log("Error While fetching instructions \n", error)
            }
            try{
                const response = await handleGetCitites();
                const formatedCities = response.map((obj) => 
                    {return{id: obj.id, value: obj.name, label: obj.name, country_id: obj.country_id}}
                )
                setCitiesOption(formatedCities);
            } catch(error){
                console.error("Error while fetching ciites\n", error)
            }
        })()
    }, [authToken])

    // Selected Cities if available in Chef Menu
    useEffect(() => {
        if ((cities && cities.length > 0) && citiesOption.length > 0) {
          const citiesArray = citiesOption.filter((item) =>
            cities.some((id) => id === item.id)
          );
          setSelectedCities(citiesArray)
        }
        //eslint-disable-next-line
      }, [citiesOption]);

    const instructionTemplateOnChange = (e)=> {
        const value = parseInt(e.target.value, 10);
        //--- Update Instruction-template-id in Chef-Menu
        updateFields({ instruction_template_id: isNaN(value) ? "" : value })

        if(e.target.value === ""){
            updateFields({ reheating_instruction: "" })
            return;
        }
        //--- Update Reheating-instruction in Chef-Menu
        heatInstruction.forEach((obj)=>{
            if(obj.id === value)
            updateFields({ reheating_instruction: obj.instruction })
        })
    }

    const handlePackageChange = (e) => {
        const value = parseInt(e.target.value, 10);
        updateFields({ packaging: value })
    }

    return (
        <div>
            <div className='container mx-auto'>
                <div className='lg:w-2/3 sm:w-4/5 mx-auto'>
                    <h2 className='text-2xl font-semibold border-b mb-8 pb-2'>More Information</h2>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Heating instructions</h3>
                        <p className='text-[12px]'>
                            Include how many minutes dish needs to be reheated on stove top/oven or microwave and heat level (low, medium, high/degrees F).
                        </p>
                        <div className='mb-3'>
                            <select value={instruction_template_id} onChange={instructionTemplateOnChange} id="selectOption">
                                <option value="">Select A Template</option>
                                {/* <option value="option1">Curry or Stew </option>
                                <option value="option2">Dry Curry or Stew </option>
                                <option value="option3">Non-Veg Curry </option>
                                <option value="option4">Bone-in Non-Veg Curry or Stew </option>
                                <option value="option4">Rice Dishes </option>
                                <option value="option4">Rice & Protein Dishes </option>
                                <option value="option4">Stir-Fry </option> */}
                                {heatInstruction.map((option)=>(
                                    <option value={option.id} key={option.id}>{option.title}</option>
                                ))}
                            </select>
                        </div>
                        <textarea 
                            className='h-[130px] p-3' 
                            disabled={!instruction_template_id} 
                            onChange={(e)=> updateFields({ reheating_instruction: e.target.value })} 
                            value={reheating_instruction} 
                            placeholder="Description of Dish..."
                        />
                        <p className='text-headGray'>0 / 400</p>
                    </div>
                    {/* Region */}
                    <div className='my-6 border-b'></div>
                    <div className='mt-7 mb-5 rounded-lg bg-grayBg p-4'>
                        {/* <h1>Hi</h1> */}
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Cities </h3>
                        <p className='text-[12px]'>
                             Choose the cities where you'd like to offer your delicious dishe.
                        </p>
                        <Select
                            isMulti
                            options={citiesOption}
                            value={selectedCities}
                            onChange={handleCitiesChange}
                            placeholder="+ Add Cities"
                        />
                        <ul className='mt-2'>
                            {selectedCities.map((option) => (
                                <li className='bg-secondary text-white inline-block rounded-[4px] px-2 mr-2' key={option.value}>{option.label}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='my-6 border-b'></div>
                    <div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-2 mt-6'>
                        <div>
                            <h3 className='text-lg font-semibold mb-1 leading-tight'>Expiration</h3>
                            <p className='text-[12px] mb-1'>
                                The number of days after delivery when dish expires.
                            </p>
                        </div>
                        <div className='flex items-center justify-between md:w-[35%] w-[65%] bg-grayBg rounded-lg'>
                            <button disabled={expiry_days<1} onClick={handleDecrement} className='w-[25%]'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M5 11V13H19V11H5Z"></path></svg>
                            </button>
                            <div className='flex items-center w-[50%]'>
                                <input 
                                    className='text-center border-0 bg-transparent text-base px-1 focus:border-0 w-[60%]'
                                    placeholder='1'
                                    type='text'
                                    value={expiry_days}
                                    onChange={handleInputChange}
                                />
                                <span className='w-[40%]'>Days</span>
                            </div>
                            <button onClick={handleIncrement} className='w-[25%]'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div className='mt-7 mb-5 border-b'></div>
                    <div>
                        <h3 className='text-lg font-semibold mb-2 leading-tight'>Packaging</h3>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                            <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 md:mb-4 mb-2 prtionRadio">
                                <div>
                                    <span className="text-base font-medium mr-2">Regular</span>
                                </div>
                                <input 
                                    type="radio" className="form-radio text-primary w-[16px] h-[16px]" 
                                    name="radioGroup" value="1" 
                                    checked={packaging === 1}
                                    onChange={ handlePackageChange } 
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 md:mb-4 mb-2 prtionRadio">
                                <div>
                                    <span className="text-base font-medium mr-2">Compostable</span>
                                </div>
                                <input 
                                    type="radio" className="form-radio text-primary w-[16px] h-[16px]" 
                                    name="radioGroup" value="2" 
                                    checked={packaging === 2}
                                    onChange={ handlePackageChange } 
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MoreInformationScreen;
