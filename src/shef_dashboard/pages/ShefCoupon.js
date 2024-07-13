import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ShefCouponForm from "../components/coupon/ShefCouponForm";
import { handleDeleteDiscount, handleGetAllDiscount, handleGetDiscountWithMenus, handleUpdateDiscount } from "../../services/shef";
import { useSelector } from "react-redux";

const ShefCoupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [discountWithMenus, setDiscountWithMenus] = useState();
  const [discountIdToDelete, setDiscountIdToDelete] = useState(null);
  const { authToken } = useSelector((state) => state.user)

  const closeCouponModal = () => {
    setIsModalOpen(false);
  };
  const closeEditCouponModal = () => {
    setIsEditModalOpen(false);
  };

  //fetch all discounts
  const fetchDiscount = async () => {
    try {
      const discountsArray = await handleGetAllDiscount(authToken);
      setDiscounts(discountsArray.original);
    } catch (error) {
      console.error("Error fetching discounts", error.message);
    }
  };
  useEffect(() => {
    fetchDiscount();
  }, [authToken]);

  //handle edit
  const openEditModal = async (id) => {
    try {
      const discountsWithMenus = await handleGetDiscountWithMenus(authToken,id)
      setDiscountWithMenus(discountsWithMenus.original);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching discounts", error.message);
    }
  };

  //handle delete
  const openDeleteConfirmationModal = (id) => {
    setDiscountIdToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDiscountIdToDelete(null);
  };
  const handleDeleteDiscountConfirm = async () => {
    try {
      await handleDeleteDiscount(authToken, discountIdToDelete);
      setDiscounts(discounts.filter(discount => discount.id !== discountIdToDelete));
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting discount", error.message);
    }
  };

  //handle status
  const handleToggleStatus = async (row) => {
    try {
      const discountsWithMenus = await handleGetDiscountWithMenus(authToken,row.id);
      const discount = discountsWithMenus.original;
      const updatedStatus = discount.status === 1 ? 0 : 1;
      const updatedDiscount = { ...discount, status: updatedStatus };
      console.log('this is my updated array for payload',updatedDiscount)//check this later, it is currently not working in the api
  
      try {
        await handleUpdateDiscount(authToken, discount.id, updatedDiscount);
        setDiscounts((prevDiscounts) =>
          prevDiscounts.map((d) => (d.id === discount.id ? { ...d, status: updatedStatus } : d))
        );
      } catch (error) {
        console.error("Error updating discount status", error.message);
      }
    } catch (error) {
      console.error("Error updating discount status", error.message);
    }
  };

  //handle dates format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <>
      <div className="">
        <Header />
        <div className="container mx-auto p-5">
          <div className="mt-6 py-5 px-3 sm:px-5 bg-white rounded-xl border border-borderClr">
            {/* <div className=''>
                            <h3 className='text-xl font-semibold leading-tight pt-2 mb-3'>My Orders for <span>Friday, February 23, 2024 (EST)</span></h3>
                        </div>
                        <div className='grid grid-cols-12 gap-3'>
                            <div className='lg:col-span-4 md:col-span-6 col-span-12'>
                                <input type='date' className='w-full' />
                            </div>
                            <div className='lg:col-span-4 md:col-span-6 col-span-12 lg:block hidden'></div>
                            <div className='lg:col-span-4 md:col-span-6 col-span-12'>
                                <div className='flex relative'>
                                    <input className='w-full' placeholder='Search' />
                                    <div className='absolute right-2 top-[13px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#323232">
                                            <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div> */}

            <div>
              <div className="flex flex-col sm:flex-row  sm:justify-between items-center gap- mb-4 border-b pt-2 mt-6 pb-2">
                <h3 className="text-xl font-semibold leading-tight uppercase">
                  Shef Coupons
                </h3>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primaryDark !text-white text-base font-semibold text-cente rounded-full px-5 py-2"
                >
                  Add Coupon
                </button>

              </div>
              <div className="overflow-x-auto">
                <table className="text-left w-full menuTable border-0">
                  <thead>
                    <tr className="border-b">
                      {/* <th className="w-[20%]">Coupon ID</th> */}
                      {/* <th className="w-[20%]">Coupon Name</th> */}
                      <th className="w-[15%]"> Start Date </th>
                      <th className="w-[15%]">End Date</th>
                      <th className="w-[15%]">Discount</th>
                      <th className="w-[15%]">Status</th>
                      <th className="w-[15%]">Actions</th>
                      {/* <th className='w-[15%]'>Portion Size</th>
                                            <th className='w-[15%]'>Serving Size</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {discounts.map((discount, index) => (
                      <tr key={index} className='border-b'>
                        <td>
                          <h4 className="text-[14px] mb-1 leading-tight">
                            {formatDate(discount.start_date)}
                          </h4>
                        </td>
                        <td>
                          <h4 className="text-[14px] mb-1 leading-tight">
                            {formatDate(discount.end_date)}
                          </h4>
                        </td>
                        <td>
                          <h4 className="text-[14px] mb-1 leading-tight">{discount.discount_type==='$'?'$ '+discount.discount:discount.discount+' %'}</h4>
                        </td>
                        <td>
                          <button
                            onClick={() => handleToggleStatus(discount)}
                            className={`px-4 py-2 rounded text-white ${
                              discount.status === 1 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          >
                            {discount.status === 1 ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td>
                          <button onClick={() => openEditModal(discount.id)} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Edit
                          </button>{' '}
                          <button onClick={() => openDeleteConfirmationModal(discount.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                      {/* <td>
                        <button onClick={()=>setIsModalOpen(true)} className="text-[14px] font-semibold hover:!text-secondary !text-primary">
                          First Coupon
                        </button>
                      </td> 
                      <td>
                        <h4 className='text-[14px] mb-0 leading-tight'>2/07/2024 - 10-07-2024 </h4>

                        <h4 className="text-[14px] mb-1 leading-tight">
                          - 20/2/2024
                        </h4>
                      </td>
                      <td>
                         <h4 className='text-[14px] mb-0 leading-tight'>2/07/2024 - 10-07-2024 </h4> 

                        <h4 className="text-[14px] mb-1 leading-tight">
                          - 10-07-2024
                        </h4>
                      </td>
                      <td>
                        <h4 className="text-[14px] mb-0 leading-tight">10%</h4>
                      </td>
                       <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>16 oz</h4>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>3 Serving</h4>
                                            </td> 
                    </tr>*/}
                  </tbody>
                </table>
              </div>
              {/* <div >
                                <h3 className='text-xl font-semibold leading-tight uppercase pt-2 mb-3 mt-6 border-b pb-2'>Active Orders(1)</h3>
                                <div className='overflow-x-auto'>
                                    <table className="text-left w-full menuTable border-0">
                                        <thead>
                                            <tr className='border-b'>
                                                <th className='w-[10%]' >Order ID</th>
                                                <th className='w-[16%]' >Dish Name</th>
                                                <th className='w-[15%]'>Delivery Date/Day/Time</th>
                                                <th className='w-[10%]'>Customer</th>
                                                <th className='w-[9%]'>Zip Code</th>
                                                <th className='w-[8%]'>Quantity</th>
                                                <th className='w-[10%]'>Your Tips</th>
                                                <th className='w-[10%]'>Total Earnin</th>
                                                <th className='w-[22%]'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='border-b'>
                                                <td>
                                                    <p className='text-primaryGreen text-[14px] mb-0'>#ID03456</p>
                                                </td>
                                                <td>
                                                    <h4 className='text-[14px] mb-0 leading-tight'>Fish Cutlus</h4>
                                                </td>
                                                <td>
                                                    <h4 className='text-[14px] mb-1 leading-tight'>- 20/2/2024</h4>
                                                    <h4 className='text-[14px] mb-1 leading-tight'>- Monday</h4>
                                                    <h4 className='text-[14px] mb-1 leading-tight'>- 2:00am</h4>
                                                </td>
                                                <td>
                                                    <h4 className='text-[14px] mb-0 leading-tight'>David Miler</h4>
                                                </td>
                                                <td>
                                                    <h4 className='text-[14px] mb-0 leading-tight'>20001</h4>
                                                </td>
                                                <td>
                                                    <h4 className='text-[14px] mb-0 leading-tight'>x2</h4>
                                                </td>
                                                <td>
                                                    <h4 className='text-[14px] mb-0 leading-tight'>$5.50</h4>
                                                </td>
                                                <td>
                                                    <h4 className='text-[14px] mb-0 leading-tight'>$30.00</h4>
                                                </td>
                                                <td>
                                                    <select id="selectOption">
                                                        <option value="">Active</option>
                                                        <option value="option1">Deactive</option>
                                                        <option value="option2">Pending</option>
                                                        <option value="option3">Prepairing</option>
                                                    </select>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
            </div>
          </div>
          {/* <div className='mt-6 p-5 bg-white rounded-xl border border-borderClr'>
                        <div >
                            <h3 className='text-xl font-semibold leading-tight uppercase mb-3 border-b pb-2'>Refunded Order (0)</h3>
                            <div className='overflow-x-auto'>
                                <table className="text-left w-full menuTable border-0">
                                    <thead>
                                        <tr className='border-b'>
                                            <th className='w-[15%]'>Order ID</th>
                                            <th className='w-[20%]'>Qty / Dish</th>
                                            <th className='w-[10%]'>Original Earnings</th>
                                            <th className='w-[20%]'>Fault</th>
                                            <th className='w-[15%]'>Earnings after refund</th>
                                            <th className='w-[20%]'>Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='border-b'>
                                            <td>
                                                <p className='text-primaryGreen text-[14px]'>#ID03456</p>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>Fish Cutlus</h4>
                                                <h4 className='text-[14px] mb-0 leading-tight'>x2</h4>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>$20.99</h4>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>To much Heating</h4>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>15.50</h4>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>Mistake on your part. We will deduct based on what the mistake was.</h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div > */}
        </div>
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
          <div className="bg-white rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Delete Confirmation</h3>
            <p>Are you sure you want to delete this coupon?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDiscountConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* editing coupon form */}
      {isEditModalOpen && discountWithMenus &&<ShefCouponForm isOpen={isEditModalOpen} onClose={closeEditCouponModal} discountWithMenus={discountWithMenus}/>}
      {/* creating coupon form */}
      {isModalOpen && <ShefCouponForm isOpen={isModalOpen} onClose={closeCouponModal} editParameters={null}/>}
    </>
  );
};

export default ShefCoupon;
