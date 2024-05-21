import React from 'react';
const AllCuisinesFilter = () => {
    return (
        <>
            <div className='grid lg:grid-cols-7 sm:grid-cols-4 grid-cols-2 gap-3 mb-3'>
                {/* Dish Category #1 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_1">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/All-Cuisine-Icon_Globe.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>All cuisines</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_1" />
                </label>
                {/* Dish Category #2 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_2">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Pakistani-Cuisine-Icon_Samosa.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Pakistani</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_2" />
                </label>
                {/* Dish Category #3 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_3">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/american-static.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>American</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_3" />
                </label>
                {/* Dish Category #4 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_4">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Specialty-Icon.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Baked Goods</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_4" />
                </label>
                {/* Dish Category #5 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_5">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Middle-East-Cuisine-Icon_Kebob-Sticks.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Middle Eastern</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_5" />
                </label>
                {/* Dish Category #6 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_6">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Latin-American-Cuisine-Icon_Rice-Beans.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Latin American</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_6" />
                </label>
                {/* Dish Category #7 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_7">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Mediterranean-Cuisine-Icon_Greek-Salad-Falafels.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Mediterranean</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_7" />
                </label>
                {/* Dish Category #9 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_8">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Korean-Cuisine-Icon_KBBQ.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Korean</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_8" />
                </label>
                {/* Dish Category #9 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_9">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Southern-US-Cuisine-Icon_Fried-Chicken-Ribs.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Southern</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_9" />
                </label>
                {/* Dish Category #10 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_10">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Brazilian-Cuisine-Icon_Carved-Meat.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Caribbean</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_10" />
                </label>
                {/* Dish Category #11 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_11">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/African-Cuisine-Icon_Injera.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>African</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_11" />
                </label>
                {/* Dish Category #12 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_12">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Mexican-Cuisine-Icon_Tacos.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Mexican</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_12" />
                </label>
                {/* Dish Category #13 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_13">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Japanese-Cuisine-Icon_Sushi.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Japanese</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_13" />
                </label>
                {/* Dish Category #14 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_14">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Chinese-Cuisine-Icon_Spring-Rolls.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Chinese</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_14" />
                </label>
                {/* Dish Category #15 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_15">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Southern-US-Cuisine-Icon_Fried-Chicken-Ribs.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Southeast Asian</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_15" />
                </label>
                {/* Dish Category #16 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_16">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Indian-Cuisine-Icon_Curry-Pot.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Indian</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_16" />
                </label>
                {/* Dish Category #17 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_17">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/Italian-Cuisine-Icon_Spaghetti-Bolognese.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>Italian</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_17" />
                </label>
                {/* Dish Category #18 */}
                <label className="border border-borderClr rounded-lg pr-2 filterRedio" for="button_18">
                    <div className='flex items-center justify-start gap-x-2'>
                        <img src="/media/frontend/img/dish-detail/More-Cuisine-Icon.svg" className="img-fluid w-[70px]" alt="Logo" />
                        <h2 className='text-base font-semibold leading-tight mb-0'>More</h2>
                    </div>
                    <input type="radio" className="form-radio text-primary w-[16px] h-[16px] hidden" name="button" value="value1" id="button_18" />
                </label>
            </div>
        </>
    );
};

export default AllCuisinesFilter;
