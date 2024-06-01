import React from 'react';
const DescScreen = ({
    description,
    item_limit,
    is_monday,
    is_tuesday,
    is_wednesday,
    is_thursday,
    is_friday,
    is_saturday,
    is_sunday,
    limit_item_availibility,
    limit_start,
    limit_end , updateFields}) => {

        const OnItemAvailabilityChange = (e) =>{
            if(e.target.value===''){
                updateFields({ limit_start: "",  limit_end: "" })
            }
            updateFields({ limit_item_availibility: e.target.value })
        }
    return (
        <div>
            <div className='container mx-auto'>
                <div className='lg:w-2/3 sm:w-4/5 mx-auto'>
                    <h2 className='text-2xl font-semibold border-b mb-8 pb-2'>Description & dish availability</h2>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Description</h3>
                        <p className='text-[12px]'>Dish Description: Tell customers about your dish.</p>
                        <textarea 
                            className='h-[130px]' value={description} 
                            onChange={(e) => {
                                const newDescription = e.target.value.slice(0, 400);  // Limit to 400 characters
                                const currentDescription = e.target.value;
                              
                                // Check if backspace was pressed (considering key deletion)
                                const backspaceKeyPressed = currentDescription.length === newDescription.length + 1;
                                if (backspaceKeyPressed || newDescription === currentDescription) {
                                  e.target.value = newDescription;  // Update value only on backspace or no change
                                }
                              
                                updateFields({ description: newDescription }); // Update state regardless
                              }}
                              
                            placeholder="Description of Dish..."
                        />
                        <p className='text-headGray'>{description.length} / 400</p>
                    </div>
                    <div className='rounded-lg bg-grayBg mt-4 p-4'>
                        <div className='flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="rgba(0,0,0,1)">
                                <path d="M12.8659 3.00017L22.3922 19.5002C22.6684 19.9785 22.5045 20.5901 22.0262 20.8662C21.8742 20.954 21.7017 21.0002 21.5262 21.0002H2.47363C1.92135 21.0002 1.47363 20.5525 1.47363 20.0002C1.47363 19.8246 1.51984 19.6522 1.60761 19.5002L11.1339 3.00017C11.41 2.52187 12.0216 2.358 12.4999 2.63414C12.6519 2.72191 12.7782 2.84815 12.8659 3.00017ZM10.9999 16.0002V18.0002H12.9999V16.0002H10.9999ZM10.9999 9.00017V14.0002H12.9999V9.00017H10.9999Z"></path>
                            </svg>
                            <span className='text-base font-semibold'>Do not</span>
                        </div>
                        <ul className='mb-0 mt-2 pl-5'>
                            <li className='list-disc leading-tight mb-1'>
                                Do NOT give any options to modify dish such as “spicy or not spicy”, “this dish can be made vegan”, etc.
                            </li>
                            <li className='list-disc leading-tight mb-1'>
                                Do NOT make health claims such as “high protein dish”, “will heal you”, “will make you lose weight”, etc.
                            </li>
                        </ul>
                    </div>
                    <div className='rounded-lg bg-grayBg mt-4 p-4'>
                        <div className='flex items-center gap-2'>
                            <svg className="sc-jSgupP ckDfJz" height="17" width="20" viewBox="0 0 20 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5,14.6875a1.27335,1.27335,0,0,0,.15625.5625l.53125.7813a1.10979,1.10979,0,0,0,.84375.4687H10.9375a1.10961,1.10961,0,0,0,.8437-.4687l.5313-.7813a1.2741,1.2741,0,0,0,.1563-.5625V13.5001H7.5ZM9.96875.50029a5.471,5.471,0,0,0-4.125,9.06234,9.00227,9.00227,0,0,1,1.625,2.875v.0312H12.5v-.0312a9.00321,9.00321,0,0,1,1.625-2.875A5.44565,5.44565,0,0,0,9.96875.50029ZM10,3.50024a2.46115,2.46115,0,0,0-2.5,2.4687.53769.53769,0,0,1-.5.5.51392.51392,0,0,1-.5-.5A3.48765,3.48765,0,0,1,10,2.50026a.51392.51392,0,0,1,.5.5A.53769.53769,0,0,1,10,3.50024ZM3.5,6.46893a.76043.76043,0,0,0-.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2A.74029.74029,0,0,0,3.5,6.46893Zm15.75-.75h-2a.74029.74029,0,0,0-.75.75.72209.72209,0,0,0,.75.75h2a.74032.74032,0,0,0,.75-.75A.76046.76046,0,0,0,19.25,5.719ZM4.09375,2.219l-1.75-1a.721.721,0,0,0-.75-.03125.77077.77077,0,0,0-.375.65624.76171.76171,0,0,0,.375.65624l1.75,1a.718.718,0,0,0,.75.03125.84919.84919,0,0,0,.375-.65624A.7617.7617,0,0,0,4.09375,2.219ZM18.375,10.4689l-1.75-1a.718.718,0,0,0-.75-.03125.84934.84934,0,0,0-.375.65627.7618.7618,0,0,0,.375.6562l1.75,1a.70107.70107,0,0,0,1-.2813A.71605.71605,0,0,0,18.375,10.4689Zm-15.03125-1-1.75,1a.7617.7617,0,0,0-.375.6562.77064.77064,0,0,0,.375.6562.72112.72112,0,0,0,.75-.0312l1.75-1a.7437.7437,0,0,0,.25-1A.701.701,0,0,0,3.34375,9.46888ZM16.2812,3.594a.83208.83208,0,0,0,.375-.09375l1.7188-1a.72269.72269,0,0,0,.25-1,.701.701,0,0,0-1-.28125l-1.7187,1a.7569.7569,0,0,0-.375.84374A.77938.77938,0,0,0,16.2812,3.594Z" className="sc-iBPRYJ brBpOV"></path>
                            </svg>
                            <span className='text-base font-semibold'>Tips</span>
                        </div>
                        <ul className='mb-0 mt-2 pl-5'>
                            <li className='list-disc leading-tight mb-1'>Include the top two flavors and ingredients</li>
                            <li className='list-disc leading-tight mb-1'>Describe the consistency</li>
                            <li className='list-disc leading-tight mb-1'>Add a personal detail or historical fact about your dish</li>
                            <li className='list-disc leading-tight mb-1'>Specify exactly what will come with your dish, like any garnishes or sides</li>
                        </ul>
                    </div>
                    <div className='mt-7 mb-5 border-b'></div>
                    <div className=''>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Dish order limit</h3>
                        <p className='text-[12px]'>How many of this item you want to offer on a delivery day (1-100).</p>
                        <input 
                            type='number' className='w-1/2'
                            value={item_limit===0 ? "": item_limit} 
                            onChange={(e)=>{const value = parseInt(e.target.value, 10);
                                        updateFields({item_limit: isNaN(value) ? "" : value})
                                    }} 
                            placeholder="1 / 100" 
                        />
                    </div>
                    <div className='mt-7 mb-5 border-b'></div>
                    <div>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Dish availability</h3>
                        <p className='text-[12px]'>Delivery days this dish will be available on your menu. You can also edit this from your availability page.</p>
                        <div className='grid md:grid-cols-7 grid-cols-4 cols-4 gap-3'>
                            <label className="flex items-center justify-between cursor-pointer border rounded-md  px-3 py-6 daysCheckbox">
                                <div className='flex justify-center items-center w-full'>
                                    <span className="text-lg font-semibold">Mon</span>
                                </div>
                                <input 
                                    type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                    checked={is_monday===1} 
                                    onChange={(e) => { is_monday===1 ? updateFields({ is_monday: 0 }) : updateFields({ is_monday: 1})  }} 
                                    name="" value={is_monday} 
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-6 daysCheckbox">
                                <div className='flex justify-center items-center w-full'>
                                    <span className="text-lg font-semibold">Tue</span>
                                </div>
                                <input 
                                    type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                    checked={is_tuesday===1}
                                    onChange={(e) => { is_tuesday ===1 ? updateFields({ is_tuesday: 0 }) : updateFields({ is_tuesday: 1})  }} 
                                    name="" value={is_tuesday}
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-6 daysCheckbox">
                                <div className='flex justify-center items-center w-full'>
                                    <span className="text-lg font-semibold">Wed</span>
                                </div>
                                <input 
                                    type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                    checked={is_wednesday===1}
                                    onChange={(e) => { is_wednesday ===1 ? updateFields({ is_wednesday: 0 }) : updateFields({ is_wednesday: 1})  }} 
                                    name="" value={is_wednesday}
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-6 daysCheckbox">
                                <div className='flex justify-center items-center w-full'>
                                    <span className="text-lg font-semibold">Thu</span>
                                </div>
                                <input 
                                    type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                    checked={is_thursday===1}
                                    onChange={(e) => { is_thursday ===1 ? updateFields({ is_thursday: 0 }) : updateFields({ is_thursday: 1})  }} 
                                    name="" value={is_thursday} 
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-6 daysCheckbox">
                                <div className='flex justify-center items-center w-full'>
                                    <span className="text-lg font-semibold">Fri</span>
                                </div>
                                <input 
                                    type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                    checked={is_friday===1}
                                    onChange={(e) => { is_friday ===1 ? updateFields({ is_friday: 0 }) : updateFields({ is_friday: 1})  }} 
                                    name="" value={is_friday}
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-6 daysCheckbox">
                                <div className='flex justify-center items-center w-full'>
                                    <span className="text-lg font-semibold">Sat</span>
                                </div>
                                <input 
                                    type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                    checked={is_saturday===1}
                                    onChange={(e) => { is_saturday ===1 ? updateFields({ is_saturday: 0 }) : updateFields({ is_saturday: 1})  }}
                                    name="" value={is_saturday} 
                                />
                            </label>
                            <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-6 p-relative daysCheckbox">
                                <div className='flex justify-center items-center w-full'>
                                    <span className="text-lg font-semibold">Sun</span>
                                </div>
                                <input 
                                    type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                    checked={is_sunday===1}
                                    onChange={(e) => { is_sunday ===1 ? updateFields({ is_sunday: 0 }) : updateFields({ is_sunday: 1})  }}
                                    name="" value="value1" 
                                />
                            </label>
                        </div>
                    </div>
                    <div className='mt-7 mb-5 border-b'></div>
                    <div>
                        <h3 className='text-lg font-semibold mb-1 leading-tight'>Limit Item Availability</h3>
                        <p className='text-[12px]'>
                            Use this feature if you want to limit this item's availability on a specific calendar date or date range.
                        </p>
                        <div>
                            <select value={limit_item_availibility} onChange={OnItemAvailabilityChange} id="selectOption">
                                <option value="">No Limit</option>
                                <option value="Available On">Available On</option>
                                <option value="Unvailable On">Unvailable On</option>
                                <option value="Available During">Available During</option>
                                <option value="Unvailable During">Unvailable During</option>
                            </select>
                        </div>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-3 mt-5'>
                            <div>
                                <h5 className='text-base font-bold mb-0'>Start Date</h5>
                                <p className='text-[12px]'>
                                    Date item will become available
                                </p>
                                <input 
                                    disabled={limit_item_availibility.length<1} 
                                    onChange={(e)=> updateFields({ limit_start: e.target.value }) } 
                                    value={limit_start}
                                    type='date' 
                                    className='w-full' 
                                />
                            </div>
                            <div>
                                <h5 className='text-base font-bold mb-0'>End Date</h5>
                                <p className='text-[12px]'>
                                    Date item will stop being available again
                                </p>
                                <input 
                                    disabled={limit_item_availibility.length<1} 
                                    onChange={(e)=> updateFields({ limit_end: e.target.value }) } 
                                    value={limit_end}
                                    type='date' 
                                    className='w-full' 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DescScreen;
