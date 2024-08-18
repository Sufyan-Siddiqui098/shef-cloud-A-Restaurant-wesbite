import React, { useEffect, useState } from "react";
import Header from "../../shef_dashboard/components/Header";
import { Link } from "react-router-dom";
import { handleChangeOrderStatus, handleGetOrders } from "../../services/order";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from 'moment';
import { handleGetDefaultSetting } from "../../services/default_setting";

export const Order = () => {
  const { authToken } = useSelector((state) => state.user);
  const {userInfo} = useSelector(state => state.user);
  const [defaultSettings, setDefaultSettings] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  // Pending
  const [isFetching, setIsFetching] = useState(false);
  // All Order to implement searching
  const [allOrders, setAllOrders] = useState([]);
  // Filter
  const [filterSearch, setFilterSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  // Refetch orders - when update status of order
  const [refetchOrder, setRefetchOrder] = useState(false);

  // Fetch All Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsFetching(true);
        const ordersRetrieved = await handleGetOrders(authToken, { chef_id: userInfo.id });
        // console.log("Order detail of shef ", ordersRetrieved, defaultSettings);
        setOrderDetails(ordersRetrieved);
        setAllOrders(ordersRetrieved);
      } catch (error) {
        console.log("Error While Fetching Orders \n", error);
      } finally {
        setIsFetching(false);
      }
    };
    
    fetchOrders();
    console.log("useEffect is running for fetching order");
  }, [authToken, refetchOrder]);

  // Default Settings API
  useEffect(()=> {
    const getDefaultSettings = async () => {
      try {
        setIsFetching(true);
        const retrieveDefaultSettings = await handleGetDefaultSetting(authToken);
        setDefaultSettings(retrieveDefaultSettings);
      } catch (error) {
        console.log("Error While Fetching Order Settings \n", error);
      } finally {
        setIsFetching(false);
      }
    }
    getDefaultSettings();
    console.log("Use Effect for default setting ");
    
  }, [authToken])

  // Function to handle search input change
  const handleOnChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilterSearch(searchTerm);
  };
  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  // Searching - Filter
  function searchOrders(orders, searchTerm, filterDate) {
    return orders?.filter((order) => {
      const orderDate = moment(order.created_at).format('YYYY-MM-DD');
      const matchesDate = !filterDate || orderDate === filterDate;
      const matchesSearch = 
        order.order_code.includes(searchTerm) ||
        order.order_details.some((detail) =>
          detail?.name?.toLowerCase().includes(searchTerm)
        );
      return matchesDate && matchesSearch;
    });
  }
  useEffect(() => {
    // console.log("Searching useEffec is running");
    const filteredOrder = searchOrders(allOrders, filterSearch, filterDate);
    setOrderDetails(filteredOrder);
    // console.log("filtered orders ", filteredOrder);
  }, [allOrders, filterSearch, filterDate]);

  // Function to handle status change
  const handleStatusChange = (e, id) => {
    const newStatus = e.target?.value?.toLowerCase();
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
            toast("Order Status Updated!");
            setRefetchOrder((prevState) => !prevState)
          }
        }
        // setOrderDetails(ordersRetrieved);
      } catch (error) {
        console.log("Error While Fetching Orders \n", error);
        toast.warn("Order Status Failed to Update!");
      }
    };
    saveStatus();
  };
  return (
    <>
      <div className="">
        <Header />
        <div className="container mx-auto p-5">
          <div className="mt-6 p-5 bg-white rounded-xl border border-borderClr">
            <div className="">
              <h3 className="text-xl font-semibold leading-tight pt-2 mb-3">
                My Orders for{" "}
                <span>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </h3>
            </div>
            <div className="grid grid-cols-12 gap-3">
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <input 
                    type="date" 
                    className="w-full"
                    value={filterDate}
                    onChange={handleDateChange}
                  />
              </div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12 lg:block hidden"></div>
              <div className="lg:col-span-4 md:col-span-6 col-span-12">
                <div className="flex relative">
                  <input
                    className="w-full"
                    placeholder="Search by Name or Order-ID"
                    disabled={allOrders?.length < 1}
                    value={filterSearch}
                    onChange={handleOnChange}
                  />
                  <div className="absolute right-2 top-[13px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="#323232"
                    >
                      <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold leading-tight uppercase pt-2 mb-3 mt-6 border-b pb-2">
                Food item Count
              </h3>
              <div className="overflow-x-auto">
                <table className="text-left w-full menuTable border-0">
                  <thead>
                    <tr className="border-b">
                      <th className="w-[20%]">Order ID</th>
                      <th className="w-[20%]">Dish Name</th>
                      <th className="w-[19%]">Quantity</th>
                      <th className="w-[15%]">Spice Level</th>
                      <th className="w-[15%]">Portion Size</th>
                      <th className="w-[15%]">Order Date/Day/Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails
                      // .filter(filteredOrder => filteredOrder.status === 'pending')
                      ?.map((order) =>
                        order.order_details?.map((detail) => (
                          <tr className="border-b" key={detail.id}>
                            <td>
                              <p className="text-primaryGreen text-[14px]">
                                {order.order_code}
                              </p>
                            </td>
                            <td>
                              <Link
                                to="/shef/order-summary"
                                className="text-[14px] mb-0 leading-tight font-semibold"
                              >
                                {detail.name}
                              </Link>
                            </td>
                            <td>
                              <h4 className="text-[14px] mb-0 leading-tight">
                                x{detail.quantity}
                              </h4>
                            </td>
                            <td>
                              <h4 className="text-[14px] mb-0 leading-tight">
                                {detail.user_menu?.spice_level?.name}
                              </h4>
                              {/*spice level id is only being sent*/}
                            </td>
                            <td>
                              <h4 className="text-[14px] mb-0 leading-tight">
                                {detail.user_menu?.portion_size} grams
                              </h4>
                            </td>
                            <td>
                              <h4 className="text-[14px] mb-1 leading-tight">
                                -{" "}
                                {new Date(
                                  detail.user_menu?.created_at
                                ).toLocaleDateString()}
                              </h4>
                              <h4 className="text-[14px] mb-1 leading-tight">
                                -{" "}
                                {new Date(
                                  detail.user_menu?.created_at
                                ).toLocaleDateString("en-US", {
                                  weekday: "long",
                                })}
                              </h4>
                              <h4 className="text-[14px] mb-1 leading-tight">
                                -{" "}
                                {new Date(
                                  detail.user_menu?.created_at
                                ).toLocaleTimeString()}
                              </h4>
                            </td>
                          </tr>
                        ))
                      )}
                    {/* If no order fetched or no matched found while searching */}
                    {orderDetails?.length < 1 && !isFetching && (
                      <tr>
                        <td>No Order Found</td>
                      </tr>
                    )}
                    {/* When api is fetching */}
                    {isFetching && (
                      <tr >
                        <td
                          colSpan="5"
                          className="text-center font-semibold text-headGray"
                        >
                          Fetching Orders...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-xl font-semibold leading-tight uppercase pt-2 mb-3 mt-6 border-b pb-2">
                  Active Orders ({ orderDetails?.filter(order => order.status !== "canceled")?.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="text-left w-full menuTable border-0">
                    <thead>
                      <tr className="border-b">
                        <th className="w-[10%]">Order ID</th>
                        <th className="w-[16%]">Dish Name</th>
                        <th className="w-[15%]">Delivery Date/Day/Time</th>
                        <th className="w-[13%]">Customer</th>
                        {/* <th className='w-[9%]'>Zip Code</th> */}
                        <th className="w-[8%]">Quantity</th>
                        <th className="w-[12%]">Chef Earning</th>
                        <th className="w-[12%]">Total Price</th>
                        <th className="w-[14%]">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.map((order) =>
                        order.order_details?.map((detail) => {
                          // Calculate if the order can be cancelled or confirmed based on the timespan
                          const orderCreatedTime = moment(order.created_at);
                          const currentTime = moment();
                          const timeSinceCreation = moment.duration(currentTime.diff(orderCreatedTime));

                          const canCancel = timeSinceCreation.asMinutes() <= defaultSettings.cancellation_time_span;
                          const canConfirm = timeSinceCreation.asMinutes() <= defaultSettings.confirmation_time_span;
                          return (
                            <tr className="border-b" key={detail.id}>
                              <td>
                                <p className="text-primaryGreen text-[14px] mb-0">
                                  {order.order_code}
                                </p>
                              </td>
                              <td>
                                <h4 className="text-[14px] mb-0 leading-tight">
                                  {detail.name}
                                </h4>
                              </td>
                              <td>
                                <h4 className="text-[14px] mb-1 leading-tight">
                                  -{" "}
                                  {new Date(
                                    order.delivery_time
                                  ).toLocaleDateString()}
                                </h4>
                                <h4 className="text-[14px] mb-1 leading-tight">
                                  -{" "}
                                  {new Date(
                                    order.delivery_time
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                  })}
                                </h4>
                                <h4 className="text-[14px] mb-1 leading-tight">
                                  -{" "}
                                  {new Date(
                                    order.delivery_time
                                  ).toLocaleTimeString()}
                                </h4>
                              </td>
                              <td>
                                <h4 className="text-[14px] mb-0 leading-tight">
                                  {order.name}
                                </h4>
                              </td>
                              {/* <td>
                                                    <h4 className='text-[14px] mb-0 leading-tight'>{order.zip_code || 'N/A'}</h4>
                                                </td> */}
                              <td>
                                <h4 className="text-[14px] mb-0 leading-tight">
                                  x{detail.quantity}
                                </h4>
                              </td>
                              <td>
                                <h4 className="text-[14px] mb-0 leading-tight">
                                  {order.chef_earning_price.toLocaleString(
                                    "en-PK",
                                    {
                                      style: "currency",
                                      currency: "PKR",
                                    }
                                  )}
                                </h4>
                              </td>
                              <td>
                                <h4 className="text-[14px] mb-0 leading-tight">
                                  {order.total_price.toLocaleString("en-PK", {
                                    style: "currency",
                                    currency: "PKR",
                                  })}
                                </h4>
                              </td>
                              <td>
                               <select
                                  className="text-sm font-medium text-headGray"
                                  onChange={(e) => handleStatusChange(e, order.id)}
                                  defaultValue={order.status}
                                >
                                  <option value="pending" hidden={true}>Pending</option>
                                  <option value="accepted" hidden={order.status!=='pending' && !canConfirm }>
                                    In Process
                                  </option>
                                  <option value="delivered" hidden={order.status!=='accepted'}>
                                    Delivered
                                  </option>
                                  <option value="canceled" hidden={order.status==='accepted' || order.status==='delivered' || !canCancel }>{/*when do you don't want to show cancel?*/}
                                    Cancelled
                                  </option>
                                </select>
                              </td>
                            </tr>
                          )})
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-6 p-5 bg-white rounded-xl border border-borderClr">
            <div>
              <h3 className="text-xl font-semibold leading-tight uppercase mb-3 border-b pb-2">
                Refunded Order (0)
              </h3>
              <div className="overflow-x-auto">
                <table className="text-left w-full menuTable border-0">
                  <thead>
                    <tr className="border-b">
                      <th className="w-[15%]">Order ID</th>
                      <th className="w-[20%]">Qty / Dish</th>
                      <th className="w-[10%]">Original Earnings</th>
                      <th className="w-[20%]">Fault</th>
                      <th className="w-[15%]">Earnings after refund</th>
                      <th className="w-[20%]">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td>
                        <p className="text-primaryGreen text-[14px]">
                          #ID03456
                        </p>
                      </td>
                      <td>
                        <h4 className="text-[14px] mb-0 leading-tight">
                          Fish Cutlus
                        </h4>
                        <h4 className="text-[14px] mb-0 leading-tight">x2</h4>
                      </td>
                      <td>
                        <h4 className="text-[14px] mb-0 leading-tight">
                          $20.99
                        </h4>
                      </td>
                      <td>
                        <h4 className="text-[14px] mb-0 leading-tight">
                          To much Heating
                        </h4>
                      </td>
                      <td>
                        <h4 className="text-[14px] mb-0 leading-tight">
                          15.50
                        </h4>
                      </td>
                      <td>
                        <h4 className="text-[14px] mb-0 leading-tight">
                          Mistake on your part. We will deduct based on what the
                          mistake was.
                        </h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default Order;
