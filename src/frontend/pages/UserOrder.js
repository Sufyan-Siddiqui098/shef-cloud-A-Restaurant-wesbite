import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { handleChangeOrderStatus, handleGetOrders, handleOrderReviewAndRating } from "../../services/order";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { handleGetDefaultSetting } from "../../services/default_setting";
import moment from "moment";

const UserOrder = () => {
  const { authToken } = useSelector((state) => state.user);
  const [defaultSettings, setDefaultSettings] = useState([]);
  // Refetch orders - when update status of order
  const [refetchOrder, setRefetchOrder] = useState(false);
  // const orderDetailInitial = {
  //     order_id: 1,
  //     dish_name: '',
  //     quantity: '',
  //     spice_level: '',
  //     portion_size: '',
  //     serving_size: '',
  // };
  const [orderDetails, setOrderDetails] = useState([]);
  const handleStatusChange = (e, id) => {
    const newStatus = 'canceled'
    const saveStatus = async () => {
      try {
        if (newStatus) {
          const ordersRetrieved = await handleChangeOrderStatus(
            authToken,
            { status: newStatus },
            id
          );
          console.log(ordersRetrieved);
          if (ordersRetrieved.success) {
            toast("Order Canceled!");
            setRefetchOrder((prevState) => !prevState)
          }
        }
        // setOrderDetails(ordersRetrieved);
      } catch (error) {
        console.log("Error While Updating Orders Status \n", error);
        toast.warn("Order Status Failed to Update!");
      }
    };
    saveStatus();
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRetrieved = await handleGetOrders(authToken);
        // console.log("user/shef orders", ordersRetrieved);
        // Flatten the nested order details into a single array of order details
        const mappedOrderDetails = ordersRetrieved.reduce((acc, order) => {
          const orderDetails = order.order_details.map((detail) => ({
            order_id: order.order_code,
            id: order.id,
            dish_name: detail.name,
            quantity: detail.quantity,
            spice_level: detail.user_menu.spice_level?.name,
            portion_size: detail.user_menu.portion_size,
            reviews: order?.reviews,
            created_at:order?.created_at,
            status:order?.status? order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1):'',
            // serving_size: detail.user_menu.portion_type_id,//name is not available at this time  - removed
          }));
          return acc.concat(orderDetails);
        }, []);

        setOrderDetails(mappedOrderDetails);
      } catch (error) {
        console.log("Error While Fetching Orders \n", error);
      }
    };
  
    fetchOrders();
    console.log("useEffect is running userorder");
  }, [authToken,refetchOrder]);

  useEffect(() => {
    const getDefaultSettings = async () => {
      try {
        const retrieveDefaultSettings = await handleGetDefaultSetting(authToken);
        setDefaultSettings(retrieveDefaultSettings);
      } catch (error) {
        console.log("Error While Fetching Order Settings \n", error);
      }
    }
    getDefaultSettings();
  }, [authToken]);

  //--- reviews & rating
  const [reviewAndRating, setReviewAndRating] = useState({
    order_id: null,
    rating: 0,
    review: "",
    order_code: null
  });
  const [isOpen, setIsOpen] = useState(false);
  const onRequestClose = () => {
    setIsOpen(false);
    setReviewAndRating({order_id: null, review: "", rating: 0, order_code: null})
  };

  // Rating & review submit
  const ratingSubmit = async() => { 
    try {
        const payload = {};
        payload.order_id = reviewAndRating.order_id;
        payload.rating = reviewAndRating.rating;
        if(reviewAndRating.review)
            payload.review = reviewAndRating.review
        console.log("Paylod is ", payload)
        const respons = await handleOrderReviewAndRating(authToken, payload);
        console.log("order reviews and rating ", respons)
        // setReviewAndRating({order_id: null, review: "", rating: 0})
        toast.success("Rating Submitted")
        onRequestClose();
    } catch (error) {
        console.log("SOmething went wrong while rating order \n", error.message)
        toast.error(error.message || "Something went wrong while Rating")
    }
  }

  return (
    <>
      <div className="">
        <Header />
        <div className="container mx-auto p-5">
          <div className="mt-6 p-5 bg-white rounded-xl border border-borderClr">
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
              <h3 className="text-xl font-semibold leading-tight uppercase pt-2 mb-3 mt-6 border-b pb-2">
                Orders
              </h3>
              <div className="overflow-x-auto">
                <table className="text-left w-full menuTable border-0">
                  <thead>
                    <tr className="border-b">
                      <th className="w-[15%]">Order ID</th>
                      <th className="w-[20%]">Dish Name</th>
                      <th className="w-[10%]">Quantity</th>
                      <th className="w-[10%]">Spice Level</th>
                      <th className="w-[10%]">Portion Size</th>
                      <th className="w-[10%]">Status</th>
                      {/* <th className='w-[15%]'>Serving Size</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr className='border-b'>
                                            <td>
                                                <p className='text-primaryGreen text-[14px]'>#ID03456</p>
                                            </td>
                                            <td>
                                                <Link to='/order-summary' className='text-[14px] mb-0 leading-tight font-semibold'>
                                                    Fish Cutlus
                                                </Link>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>x2</h4>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>Mild</h4>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>16 grams</h4>
                                            </td>
                                            <td>
                                                <h4 className='text-[14px] mb-0 leading-tight'>3 Serving</h4>
                                            </td>
                                        </tr> */}
                    {orderDetails.map((detail, index) => (
                      <tr key={index} className="border-b">
                        <td>
                          <p className="text-primaryGreen text-[14px]">
                            #{detail.order_id}
                          </p>
                        </td>
                        <td>
                          <Link
                            to="/order-summary"
                            className="text-[14px] mb-0 leading-tight font-semibold"
                          >
                            {detail.dish_name}
                          </Link>
                        </td>
                        <td>
                          <h4 className="text-[14px] mb-0 leading-tight">
                            x{detail.quantity}
                          </h4>
                        </td>
                        <td>
                          <h4 className="text-[14px] mb-0 leading-tight">
                            {detail.spice_level}
                          </h4>
                        </td>
                        <td>
                          <h4 className="text-[14px] mb-0 leading-tight">
                            {detail.portion_size}
                          </h4>
                        </td>
                        
                        <td>
                          <h4 className='text-[14px] mb-0 leading-tight'>
                            {detail.status}
                          </h4>
                        </td> 
                       
                        {detail?.reviews?.length<1 && <td>
                          <button onClick={()=> { setReviewAndRating(prev =>{ return{...prev, "order_id": detail.id, order_code: detail.order_id} } ); setIsOpen(true) }} className="text-[14px] text-primaryGreen hover:underline focus:underline mb-0 leading-tight">
                            Add Rating
                          </button>
                        </td>}
                        <td>
                        {(() => {
                          const orderCreatedTime = moment(detail.created_at);
                          const currentTime = moment();
                          const timeSinceCreation = moment.duration(currentTime.diff(orderCreatedTime));
                          const canCancel = timeSinceCreation.asMinutes() <= defaultSettings.cancellation_time_span;
                          return (
                            <button
                              disabled={!canCancel}
                              onClick={(e) => handleStatusChange(e, detail.id)}
                              style={!canCancel ? { color: '#ccc', cursor: 'not-allowed' } : {}}
                              className="text-[14px] text-primary hover:underline focus:text mb-0 leading-tight"
                            >
                              Cancel Order
                            </button>
                          );
                        })()}
                        </td>
                      </tr>
                    ))}
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

      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Reviews"
      >
        <div className="flex flex-col  h-ful">
          {/* Modal content here */}
          <div className="flex items-center justify-between border-b pb-3 gap-3">
            <h2 className="text-lg font-semibold leading-tight mb-0">
              Order Review & Rating
            </h2>
            <button onClick={onRequestClose}>
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

          <div>
            {/* Order Code  */}
            <p className="my-4 text-primaryGreen "><strong>Order Code :</strong> #{reviewAndRating.order_code}</p>

            <h3 className="mb-3 text-lg text-gray my-2 font-semibold">
              Add Reviews
            </h3>
            <textarea
              name=""
              id=""
              className="py-2 min-h-20"
              placeholder="Write Review Here"
              maxLength={500}
              value={reviewAndRating.review || ""}
              onChange={(e) =>setReviewAndRating((prev) => {
                return { ...prev, review: e.target.value };
              })}
            />
            {/* Rating */}
            <div className="mt-3 mb-5">
              <h5 className="my-1 text-lg text-gray font-semibold">
                Rating : ( {reviewAndRating.rating} )
              </h5>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => {
                  const currentRate = index + 1;
                  return (
                    <label key={currentRate}>
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={currentRate}
                        onClick={() =>
                          setReviewAndRating((prev) => {
                            return { ...prev, rating: currentRate };
                          })
                        }
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill={
                          currentRate <= reviewAndRating.rating ? "#FF9529" : ""
                        }
                      >
                        <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path>
                      </svg>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <button onClick={ratingSubmit} className="my-6 bg-primary text-white text-lg w-full uppercase px-6 py-2 font-semibold rounded-lg disabled:opacity-60 mt-auto">
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UserOrder;
