import React, { useEffect, useState } from 'react'
import Header from '../../shef_dashboard/components/Header'
import MenuStepFormModal from '../components/myMenu/MenuStepFormModal'
import Screen01 from '../components/myMenu/Screen01'
import Screen02 from '../components/myMenu/Screen02'
import Screen03 from '../components/myMenu/Screen03'
import Screen04 from '../components/myMenu/Screen04'
import Screen05 from '../components/myMenu/Screen05'
import Screen06 from '../components/myMenu/Screen06'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { handleCreateMenu, handleGetAllDishes } from '../../services/shef'


// const PriceStep = () => <div>Step 3 content</div>;
// const IngredientsStep = () => <div>Step 4 content</div>;
export const MyMenu = () => {
    const [isStepFormModalOpen, setStepFormModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    
    // Chef Menu initial State
    const chefMenuInitialState = {
        name: "",                  //--- Screen 1
        food_type_id: "",
        side_item: 0,
        spice_level_id: "",
        tags: "",
        portion_size: "",
        // portion_base_serving: "",   // Added - no need
        portion_type_id: "",         // --- base serving id
        base_type_id: 1,             // Container/Pieces/Other 1,2,3 respectively
        chef_earning_fee: "",         // value was ==0
        platform_price: 0,
        delivery_price: 0,
        description: "",            //--- Screen 2
        item_limit: 0,
        is_monday: 0,               // indicate false
        is_tuesday: 0,
        is_wednesday: 0,
        is_thursday : 0,
        is_friday: 0,
        is_saturday: 0,
        is_sunday: 0,
        limit_item_availibility: "", // Optional
        limit_start: "",             // Optional - YYYY-MM-DD   
        limit_end : "",              // Optional - YYYY-MM-DD
        instruction_template_id: "", //--- Screen 3
        reheating_instruction: "",
        expiry_days: 0,
        packaging: 1,
        ingredients: [],            //--- Screen 4
        //Screen 5 - will be added soon
        logo: "",                   //--- Screen 6 
        // is_live: 1,
    }

    const [chefMenu, setChefMenu] = useState(chefMenuInitialState)

    const updateFields = (fields)=> {
        setChefMenu(prev=>{
            return {...prev, ...fields}
        })
    } 

    // console.log("chef Menu ", chefMenu)

    const steps = [
        { title: 'Dish Details', content: <Screen01 {...chefMenu} updateFields={updateFields} /> },
        { title: 'Description', content: <Screen02 {...chefMenu} updateFields={updateFields} /> },
        { title: 'More Information', content: <Screen03 {...chefMenu} updateFields={updateFields} /> },
        { title: 'Ingredients', content: <Screen04 ingredients={chefMenu.ingredients} updateFields={updateFields} /> },
        // { title: 'Dietary', content: <Screen05 /> },
        { title: 'Photo', content: <Screen06 {...chefMenu} updateFields={updateFields} /> },
    ];
    // --- Modal
    const openStepFormModal = () => {
        setStepFormModalOpen(true);
    };

    const closeStepFormModal = () => {
        setStepFormModalOpen(false);
        setCurrentStep(0);
        // reset chef menu with initial state
        setChefMenu(chefMenuInitialState)
        // If it is true OnSubmit will handle update-menu API
        setIsUpdateDish(false);
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    // - Modal End
    
    
    const {authToken} = useSelector((state)=>state.user)
    // All dishes in Dish Catelogue
    const [ dishes, setDishes ] = useState([]);
    useEffect(()=>{ 
        (async () => {
            try {
                const res = await handleGetAllDishes(authToken);
                setDishes(res);
                // console.log("All dishes has been fetched ", res);
            } catch (error) {
                console.error("Error while fetching dishes \n", error)
            }
        } ) ()
    },[authToken])

    // Handle Update -- TODO 
    const [isUpdateDish, setIsUpdateDish] = useState(false);
    // const openStepFormModalToUpdate = (dish) => {
    //     setIsUpdateDish(true)
    //     setStepFormModalOpen(true);
    //     // setChefMenu(dish)
    // }

    // Create Menu API Handle start
    const [isPending, setIsPending] = useState(false)

    const onSubmit = async(e) =>{
        try {
            setIsPending(true)
            if(isUpdateDish){
                // Handle update api
                console.log("Update-menu is called")
                // --- When req is successfull
                setIsUpdateDish(false);
            } 
            // handle create menu api
            else{
                const response =await handleCreateMenu(authToken, chefMenu);
                toast.success(response.message);
                // refetch all dishes
                const updateDishes = await handleGetAllDishes(authToken);
                setDishes(updateDishes);
            }
            closeStepFormModal();
        } catch (error) {
            toast.error(error.message || "Something went wrong")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className=''>
            <div className='grid grid-cols-12'>
                {/* <div className='lg:col-span-3 col-span-12'>
                    <div className=''>
                        <Sidebar />
                    </div>
                </div> */}
                <div className='lg:col-span-12 col-span-12 '>
                    <Header />
                    <div className='p-5'>
                        <div className='p-5 bg-white rounded-xl border border-borderClr'>
                            <h3 className='text-xl font-semibold'>Filter</h3>
                            <div className='grid md:grid-cols-4 grid-cols-1 gap-4'>
                                <div>
                                    <h4 className='font-medium text-base mb-1'>You can filter by weekday.</h4>
                                    <select id="selectOption" className=''>
                                        <option value="">Select Any Day</option>
                                        <option value="option1">Monday</option>
                                        <option value="option2">Tuesday</option>
                                        <option value="option3">Wednessday</option>
                                        <option value="option4">Thursday</option>
                                        <option value="option5">Friday</option>
                                        <option value="option6">Saturday</option>
                                        <option value="option7">Sunday</option>
                                    </select>
                                </div>
                                <div>
                                    <h4 className='font-medium text-base mb-1'>You can filter by food type..</h4>
                                    <select id="selectOption">
                                        <option value="">Select Food Type</option>
                                        <option value="option1">All</option>
                                        <option value="option2">Appetizer</option>
                                        <option value="option3">Beverage</option>
                                        <option value="option4">Dessert</option>
                                        <option value="option5">Kids</option>
                                        <option value="option6">Main</option>
                                        <option value="option7">Side</option>
                                    </select>
                                </div>
                                <div>
                                    <h4 className='font-medium text-base mb-1'>You can filter by Name.</h4>
                                    <input type="search" placeholder='Type Dish Name' id='' name='' />
                                </div>
                            </div>
                        </div>
                        <div className='mt-6 p-5 bg-white rounded-xl border border-borderClr'>
                            <div className='flex md:flex-row flex-col justify-between gap-3 mb-4'>
                                <h3 className='text-xl md:text-left text-center font-semibold leading-tight pt-2 mb-0'>Dish Catalogue ({dishes.length})</h3>
                                <button className='bg-primaryDark text-white text-base font-semibold rounded-full px-5 py-2' onClick={openStepFormModal}>Add New Dish</button>
                            </div>
                            <div className='overflow-x-auto'>
                                <table className="text-left w-full menuTable border-0 user-mbl-table">
                                    <thead>
                                        <tr className='border-b'>
                                            <th className='md:w-[10%]' >Image</th>
                                            <th className='md:w-[10%]'>Price</th>
                                            <th className='md:w-[10%]'>Action</th>
                                            <th className='md:w-[20%]'>Description</th>
                                            {/* Temporary Hide */}
                                            {/* <th className='md:w-[10%]'>Available</th> */}
                                            <th className='md:w-[30%]'>Days</th>
                                            {/* Temporary Hide */}
                                            {/* <th className='md:w-[10%]'>Delivery Time</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dishes?.map((dish) => (
                                            <tr key={dish.id}>
                                                <td className='' data-title="Image">
                                                    {/* Temporary image url */}
                                                    <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"} width='' className="img-fluid border w-[110px] h-[100px] object-cover rounded-md" alt="Dish" />
                                                    <h4 className='text-[14px] mt-2'>{dish.name}</h4>
                                                </td>
                                                <td data-title="Price">
                                                    <h4 className='text-[14px] mt-2'>${dish.chef_earning_fee + dish.platform_price + dish.delivery_price}</h4>
                                                </td>
                                                <td data-title="Action">
                                                    <div className='flex items-center gap-3'>
                                                        {/* onClick={(dish) => openStepFormModalToUpdate(dish)}  */}
                                                        <div  className='hover:scale-110 focus:scale-110 editDish cursor-pointer'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="rgba(0,0,0,1)">
                                                                <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                                                            </svg>
                                                        </div>
                                                        <div className='delettDish cursor-pointer'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="rgba(0,0,0,1)">
                                                                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <h6 className='text-[9px] italic leading-tight mt-2'>Changes Pending Review</h6>
                                                </td>
                                                <td data-title="Description">
                                                    <p className='text-[14px] mb-0'>
                                                        {/* A spicy blend of Fish, spices and herbs that will surely be the best cutlet you will ever have! Just shallow fry it over a pan and enjoy the goodness. */}
                                                        {dish.description}
                                                    </p>
                                                </td>
                                                {/* HIDE temporary - Availablity  */}
                                                {/* <td data-title="Available"> */}
                                                    {/* When Active */}
                                                    {/* <div className='bg-primaryGreen text-white font-medium rounded-md text-center inline-block px-3'> Active</div> */}

                                                    {/* When Pending */}
                                                    {/* <div className='bg-red-200 text-white font-medium rounded-md text-center inline-block px-3'> Pending</div> */}

                                                    {/* When Draft */}
                                                    {/* <div className='bg-yellow-400 text-white font-medium rounded-md text-center inline-block px-3'> Draft</div>
                                                </td> */}
                                                <td data-title="Days">
                                                    <div className='grid lg:grid-cols-7 sm:grid-cols-2 grid-cols-4 gap-2 bg-grayBg rounded-lg p-2' id="">
                                                        <label className="flex items-center justify-between cursor-pointer rounded-md  px-3 py-2 daysCheckbox">
                                                            <div className='flex justify-center items-center w-full'>
                                                                <span className="text-base font-semibold">Mo</span>
                                                            </div>
                                                            <input 
                                                                type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                                                readOnly
                                                                checked={ dish.is_monday === 1 } 
                                                                name="" value="value2" 
                                                            />
                                                        </label>
                                                        <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-2 daysCheckbox">
                                                            <div className='flex justify-center items-center w-full'>
                                                                <span className="text-base font-semibold">Tu</span>
                                                            </div>
                                                            <input 
                                                                type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                                                readOnly
                                                                checked={ dish.is_tuesday ===1 } 
                                                                name="" value="value2" 
                                                            />
                                                        </label>
                                                        <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-2 daysCheckbox">
                                                            <div className='flex justify-center items-center w-full'>
                                                                <span className="text-base font-semibold">We</span>
                                                            </div>
                                                            <input 
                                                                type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                                                readOnly
                                                                checked={ dish.is_wednesday === 1 }
                                                                name="" value="value2" 
                                                            />
                                                        </label>
                                                        <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-2 daysCheckbox">
                                                            <div className='flex justify-center items-center w-full'>
                                                                <span className="text-base font-semibold">Th</span>
                                                            </div>
                                                            <input 
                                                                type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                                                readOnly
                                                                checked={ dish.is_thursday === 1 }
                                                                name="" value="value2" 
                                                            />
                                                        </label>
                                                        <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-2 daysCheckbox">
                                                            <div className='flex justify-center items-center w-full'>
                                                                <span className="text-base font-semibold">Fr</span>
                                                            </div>
                                                            <input 
                                                                type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                                                readOnly
                                                                checked = {dish.is_friday === 1}
                                                                name="" value={dish.is_friday} 
                                                            />
                                                        </label>
                                                        <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-2 daysCheckbox">
                                                            <div className='flex justify-center items-center w-full'>
                                                                <span className="text-base font-semibold">St</span>
                                                            </div>
                                                            <input 
                                                                type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                                                readOnly
                                                                checked={ dish.is_saturday === 1 }
                                                                name="" value="value2" 
                                                            />
                                                        </label>
                                                        <label className="flex items-center justify-between cursor-pointer rounded-md border px-3 py-2 p-relative daysCheckbox">
                                                            <div className='flex justify-center items-center w-full'>
                                                                <span className="text-base font-semibold">Su</span>
                                                            </div>
                                                            <input 
                                                                type="checkbox" className="form-radio w-[16px] h-[16px] hidden" 
                                                                readOnly
                                                                checked = { dish.is_sunday === 1 }
                                                                name="" value="value1" 
                                                            />
                                                        </label>
                                                    </div>
                                                </td>
                                                {/* Temporary Hide */}
                                                {/* <td data-title="Delivery Time">
                                                    <h4 className='text-[14px] mb-1'>Wednesday</h4>
                                                    <h4 className='text-[14px] mb-1'>23/02/2024</h4>
                                                    <h4 className='text-[14px] mb-1'>20:00pm</h4>
                                                </td> */}
                                            </tr>
                                        ) )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <MenuStepFormModal 
                            onSubmit={onSubmit}
                            isPending={isPending}
                            isOpen={isStepFormModalOpen}
                            onClose={closeStepFormModal}
                            steps={steps}
                            currentStep={currentStep}
                            onNext={nextStep}
                            onBack={prevStep} 
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}
export default MyMenu