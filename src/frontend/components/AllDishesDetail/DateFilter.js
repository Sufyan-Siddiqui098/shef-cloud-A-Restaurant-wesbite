import React from 'react';
const DateFilter = () => {
    return (
        <>
            <div className='grid lg:grid-cols-7 sm:grid-cols-4 grid-cols-2 gap-3 mb-3' id=''>
                {/* Type #1 */}
                <label className="flex items-center justify-center cursor-pointer rounded-md px-1 border border-borderClr py-3 p-relative filterRedio" for="button_1">
                    <div className='text-center'>
                        <h3 className='text-[16px] font-bold mb-1 leading-tight'>I'm Flexible</h3>
                        <div className='flex items-center justify-between gap-2'>
                            <h5 className='text-[10px] font-semibold mb-0 leading-tight'>(23 Shefs)</h5>
                        </div>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_1" />
                </label>
                {/* Type #2 */}
                <label className="flex items-center justify-center cursor-pointer rounded-md px-1 border border-borderClr py-3 p-relative filterRedio" for="button_2">
                    <div className='text-center'>
                        <h3 className='text-[16px] font-bold mb-1 leading-tight'>Tomorrow</h3>
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-[14px] font-medium mb-0 leading-tight'>Feb 21</h4>
                            <h5 className='text-[10px] font-semibold mb-0 leading-tight'>(20 Shefs)</h5>
                        </div>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value2" id="button_2" />
                </label>
                {/* Type #3 */}
                <label className="flex items-center justify-center cursor-pointer rounded-md px-1 border border-borderClr py-3 p-relative filterRedio" for="button_3">
                    <div className='text-center'>
                        <h3 className='text-[16px] font-bold mb-1 leading-tight'>Monday</h3>
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-[14px] font-medium mb-0 leading-tight'>Feb 22</h4>
                            <h5 className='text-[10px] font-semibold mb-0 leading-tight'>(30 Shefs)</h5>
                        </div>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value3" id="button_3" />
                </label>
                {/* Type #4 */}
                <label className="flex items-center justify-center cursor-pointer rounded-md px-1 border border-borderClr py-3 p-relative filterRedio" for="button_4">
                    <div className='text-center'>
                        <h3 className='text-[16px] font-bold mb-1 leading-tight'>Tuesday</h3>
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-[14px] font-medium mb-0 leading-tight'>Feb 23</h4>
                            <h5 className='text-[10px] font-semibold mb-0 leading-tight'>(34 Shefs)</h5>
                        </div>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value3" id="button_4" />
                </label>
                {/* Type #5 */}
                <label className="flex items-center justify-center cursor-pointer rounded-md px-1 border border-borderClr py-3 p-relative filterRedio" for="button_5">
                    <div className='text-center'>
                        <h3 className='text-[16px] font-bold mb-1 leading-tight'>Wednesday</h3>
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-[14px] font-medium mb-0 leading-tight'>Feb 24</h4>
                            <h5 className='text-[10px] font-semibold mb-0 leading-tight'>(43 Shefs)</h5>
                        </div>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value3" id="button_5" />
                </label>
                {/* Type #6 */}
                <label className="flex items-center justify-center cursor-pointer rounded-md px-1 border border-borderClr py-3 p-relative filterRedio" for="button_6">
                    <div className='text-center'>
                        <h3 className='text-[16px] font-bold mb-1 leading-tight'>Thursday</h3>
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-[14px] font-medium mb-0 leading-tight'>Feb 25</h4>
                            <h5 className='text-[10px] font-semibold mb-0 leading-tight'>(32 Shefs)</h5>
                        </div>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value3" id="button_6" />
                </label>
                {/* Type #7 */}
                <label className="flex items-center justify-center cursor-pointer rounded-md px-1 border border-borderClr py-3 p-relative filterRedio" for="button_7">
                    <div className='text-center'>
                        <h3 className='text-[16px] font-bold mb-1 leading-tight'>Friday</h3>
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-[14px] font-medium mb-0 leading-tight'>Feb 26</h4>
                            <h5 className='text-[10px] font-semibold mb-0 leading-tight'>(26 Shefs)</h5>
                        </div>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value3" id="button_7" />
                </label>
                {/* Type #8 */}
                <label className="flex items-center justify-center cursor-pointer rounded-md px-1 border border-borderClr py-3 p-relative filterRedio" for="button_8">
                    <div className='text-center'>
                        <h3 className='text-[16px] font-bold mb-1 leading-tight'>Saturday</h3>
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-[14px] font-medium mb-0 leading-tight'>Feb 27</h4>
                            <h5 className='text-[10px] font-semibold mb-0 leading-tight'>(12 Shefs)</h5>
                        </div>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value3" id="button_8" />
                </label>
                {/* Type #9 */}
                <label className="flex items-center justify-center cursor-pointer rounded-md px-1 border border-borderClr py-3 p-relative filterRedio" for="button_">
                    <div className='text-center'>
                        <h3 className='text-[16px] font-bold mb-1 leading-tight'>Sunday</h3>
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className='text-[14px] font-medium mb-0 leading-tight'>Feb 28</h4>
                            <h5 className='text-[10px] font-semibold mb-0 leading-tight'>(67 Shefs)</h5>
                        </div>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value3" id="button_" />
                </label>

            </div>
        </>
    );
};

export default DateFilter;
