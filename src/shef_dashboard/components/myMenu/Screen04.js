import React, { useState } from 'react';
import Select from 'react-select';
const IngredientsScreen = () => {
    // Multi Select Start
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'salt', label: 'Salt' },
        { value: 'ginger', label: 'Ginger' },
        { value: 'turmeric', label: 'Turmeric' },
        { value: 'sugar', label: 'Sugar' },
        { value: 'onion', label: 'Onion' },
        { value: 'tomatos', label: 'Tomatos' },
        { value: 'cumin', label: 'Cumin' },
        { value: 'garam masala', label: 'Garam Masala' },
        // Add more options as needed
    ];

    const handleSelectChange = (selectedValues) => {
        setSelectedOptions(selectedValues);
    };
    // Multi Select End

    return (
        <div>
            <div className='container mx-auto'>
                <div className='lg:w-2/3 sm:w-4/5 mx-auto'>
                    <h2 className='text-2xl font-semibold border-b mb-8 pb-2'>Ingredients</h2>
                    <div className='rounded-lg bg-grayBg p-4'>
                        <h3 className='text-lg font-semibold mb-3 leading-tight'>Ingredients Detail</h3>
                        <Select
                            isMulti
                            options={options}
                            value={selectedOptions}
                            onChange={handleSelectChange}
                            placeholder="Ingredients List..."
                        />
                        <ul className='mt-2'>
                            {selectedOptions.map((option) => (
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
                                <li className='list-disc leading-tight mb-1'>Specific type of oil/fat/butter/broth used (example: canola oil, vegetable oil, olive oil, ghee, chicken broth, vegetable broth etc.)</li>
                                <li className='list-disc leading-tight mb-1'>Seasonings and spices (example: cumin, turmeric, salt, pepper, etc.)</li>
                                <li className='list-disc leading-tight mb-1'>All ingredients in homemade sauces, dips, and dressings (example: tomato sauce = tomatoes, garlic, onion, olive oil, tomato paste).</li>
                                <li className='list-disc leading-tight mb-1'>List if the protein has "bone-in" or "boneless".</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default IngredientsScreen;
