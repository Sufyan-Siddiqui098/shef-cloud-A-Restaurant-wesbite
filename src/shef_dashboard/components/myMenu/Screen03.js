import React, { useState } from 'react';
const MoreInformationScreen = () => {
    // Plus Minus Quantity Start
    const [minutes, setMinutes] = useState(0);

    const handleIncrement = () => {
        setMinutes((prevMinutes) => prevMinutes + 1);
    };

    const handleDecrement = () => {
        setMinutes((prevMinutes) => (prevMinutes > 0 ? prevMinutes - 1 : 0));
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setMinutes(isNaN(value) ? 0 : value);
    };
    // Plus Minus Quantity End
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
                            <select id="selectOption">
                                <option value="">Select A Template</option>
                                <option value="option1">Curry or Stew </option>
                                <option value="option2">Dry Curry or Stew </option>
                                <option value="option3">Non-Veg Curry </option>
                                <option value="option4">Bone-in Non-Veg Curry or Stew </option>
                                <option value="option4">Rice Dishes </option>
                                <option value="option4">Rice & Protein Dishes </option>
                                <option value="option4">Stir-Fry </option>
                            </select>
                        </div>
                        <textarea className='h-[130px] p-3' value='*Beware of bones. Place into a bowl & microwave for 1-2 min. Stir food midway through microwaving. Or heat in a saucepan with 1 tbsp of water over low heat for 4-5 min. Let cool before enjoying.' placeholder="Description of Dish..."></textarea>
                        <p className='text-headGray'>0 / 400</p>
                    </div>
                    <div className='mt-7 mb-5 border-b'></div>
                    <div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-2 mt-6'>
                        <div>
                            <h3 className='text-lg font-semibold mb-1 leading-tight'>Expiration</h3>
                            <p className='text-[12px] mb-1'>
                                The number of days after delivery when dish expires.
                            </p>
                        </div>
                        <div className='flex items-center justify-between md:w-[35%] w-[65%] bg-grayBg rounded-lg'>
                            <button onClick={handleDecrement} className='w-[25%]'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)"><path d="M5 11V13H19V11H5Z"></path></svg>
                            </button>
                            <div className='flex items-center w-[50%]'>
                                <input className='text-center border-0 bg-transparent text-base px-1 focus:border-0 w-[60%]'
                                    placeholder='1'
                                    value={minutes}
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
                                <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="radioGroup" value="option1" />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer border border-borderClr rounded-lg px-3 py-4 md:mb-4 mb-2 prtionRadio">
                                <div>
                                    <span className="text-base font-medium mr-2">Compostable</span>
                                </div>
                                <input type="radio" className="form-radio text-primary w-[16px] h-[16px]" name="radioGroup" value="option2" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MoreInformationScreen;
