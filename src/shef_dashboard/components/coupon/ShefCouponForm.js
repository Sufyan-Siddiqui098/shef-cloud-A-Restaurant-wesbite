import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Modal from "react-modal";
import { handleCreateDiscount, handleGetAllDishes, handleUpdateDiscount } from "../../../services/shef";
import { useSelector } from "react-redux";

const ShefCouponForm = ({ isOpen, onClose, discountWithMenus }) => {
  const [isPending, setIsPending] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [discountType, setDiscountType] = useState('');
  const {authToken} = useSelector((state)=>state.user)
  const [options, setOptions] = useState([
    {
      id: 1,
      label: "Dish one",
      value: "Dish one",
    },
    {
      id: 2,
      label: "Dish Two",
      value: "Dish Two",
    },
  ]);
  
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const dishes = await handleGetAllDishes(authToken);
        const dishOptions = dishes.map(dish => ({
          id: dish.id,
          label: dish.name,
          value: dish.name,
        }));
        setOptions(dishOptions);
      } catch (error) {
        console.error("Error fetching dishes:", error.message);
      }
    };
    fetchDishes();
    console.log(discountWithMenus,'this is run in useffect')
  }, [authToken]);
  // On Change
  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
    // Array containng ids of ingredients
    // const menusId = selectedValues.map((elem) => elem.id);
    // console.log("ids of ", menusId);
  };
  // Submit
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(discountWithMenus,'this is being outputted!')
    try {
      setIsPending(true);
      const menuIds = selectedOptions.map(option => option.id);
      if(!discountWithMenus){
      const payload = {
        menus: menuIds,
        is_auto_apply: 1, // Frontend will always have this as 1 
        max_user_use: e.target.max_user_use.value,
        discount_type: discountType,
        discount: e.target.discount.value,
        min_order: e.target.min_order.value,
        max_order: e.target.max_order.value,
        max_discount: e.target.max_discount?.value || null,
        start_date: e.target.start_date.value,
        end_date: e.target.end_date.value,
      };

      // await handleCreateDiscount(authToken, payload);
    }else {
      const updatedDiscountWithMenus = {
        ...discountWithMenus,
        menus: menuIds,
        max_user_use: e.target.max_user_use.value,
        discount_type: discountType,
        discount: e.target.discount.value,
        min_order: e.target.min_order.value,
        max_order: e.target.max_order.value,
        max_discount: e.target.max_discount?.value || null,
        start_date: e.target.start_date.value,
        end_date: e.target.end_date.value,
      };
      await handleUpdateDiscount(authToken, discountWithMenus.id, updatedDiscountWithMenus);
    }
      // reset form and selected options here
      setSelectedOptions([]); 
      setDiscountType('');
      e.target.reset(); 
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="ServSizeModal"
      >
        {/* Modal content here */}
        <div className="flex items-center justify-between border-b pb-3 gap-3">
          <h2 className="text-lg font-semibold mb-1 leading-tight mb-0">
            Shef Coupon Form
          </h2>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="rgba(0,0,0,1)"
            >
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
            </svg>
          </button>
        </div>

        {/* Main Form */}
        <div className="container mx-auto p-5">
          <div className="rounded-xl  mb-6">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">
              Coupon Form
            </h2>
            <form onSubmit={handleOnSubmit}>
              <div className="grid grid-cols-12 md:gap-x-8 gap-x-0 gap-y-4 mt-8">
                <div className="md:col-span-6 col-span-12">
                  <h4 className="text-base font-semibold mb-1 uppercase">
                    {" "}
                    Max code uses per person<span className="text-primary">*</span>
                  </h4>
                  <input
                    type="text"
                    placeholder="Enter Number of Uses"
                    id=""
                    name="max_user_use"
                    required
                  />
                </div>
                <div className="md:col-span-6 col-span-12">
                  <h4 className="text-base font-semibold mb-1 uppercase">
                    Discount Type<span className="text-primary">*</span>{" "}
                  </h4>
                  <select
                    name="discount_type"
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-lg"
                    required
                  >
                    <option hidden value="">Select Discount Type</option>
                    <option value="%">Percentage</option>
                    <option value="$">Fixed Value</option>
                  </select>
                </div>

                <div className="md:col-span-6 col-span-12">
                  <h4 className="text-base font-semibold mb-1 uppercase">
                    Discount Value<span className="text-primary">*</span>{" "}
                  </h4>
                  <input type="number" placeholder="Enter Value" required id="" name="discount" />
                </div>
                <div className="md:col-span-6 col-span-12">
                  <h4 className="text-base font-semibold mb-1 uppercase">
                    Minimum Orders<span className="text-primary">*</span>{" "}
                  </h4>
                  <input type="number" placeholder="1" required id="" name="min_order" />
                </div>
                <div className="md:col-span-6 col-span-12">
                  <h4 className="text-base font-semibold mb-1 uppercase">
                    Maximum Orders<span className="text-primary">*</span>{" "}
                  </h4>
                  <input type="number" placeholder="10" required id="" name="max_order" />
                </div>
                {discountType === '%' && <div className="md:col-span-6 col-span-12">
                  <h4 className="text-base font-semibold mb-1 uppercase">
                    Maximum Discount<span className="text-primary">*</span>{" "}
                  </h4>
                  <input type="number" placeholder="Type a Fixed Amount Cap" required id="" name="max_discount" />
                </div>}
                <div className="md:col-span-6 col-span-12">
                  <h4 className="text-base font-semibold mb-1 uppercase">
                    Start Date <span className="text-primary">*</span>
                  </h4>
                  <input
                    type="date"
                    placeholder="Start Date"
                    id=""
                    name="start_date"
                    required
                  />
                </div>

                <div className="md:col-span-6 col-span-12">
                  <h4 className="text-base font-semibold mb-1 uppercase">
                    End Date <span className="text-primary">*</span>{" "}
                  </h4>
                  <input
                    type="date"
                    placeholder="End Date"
                    id=""
                    name="end_date"
                    required
                  />
                </div>

                <div className="col-span-12">
                  <div className="rounded-lg bg-grayBg p-4">
                    <h3 className="text-lg font-semibold mb-3 leading-tight">
                      Menu Detail
                    </h3>
                    <Select
                      isMulti
                      options={options}
                      value={selectedOptions}
                      onChange={handleSelectChange}
                      placeholder="Menus..."
                      required
                    />
                    <ul className="mt-2 flex gap-1 flex-wrap">
                      {selectedOptions.map((option) => (
                        <li
                          className="bg-secondary text-white rounded-[4px] px-2"
                          key={option.id}
                        >
                          {option.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-6 mt-3 col-span-12  flex items-end">
                  <button
                    disabled={isPending}
                    className="bg-primary text-white w-ful p-[4px_12px] rounded text-base font-semibold mb-1 uppercase disabled:opacity-60"
                    type=""
                  >
                    Submit{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShefCouponForm;
