import React from "react";
import moment from "moment";

const OrderList = ({
  orderDetails,
  handleStatusChange,
  defaultSettings,
  isFetching,
}) => {
  return (
    <>
      <tbody>
        {orderDetails?.map((order) =>
          order.order_details?.map((detail) => {
            // Calculate if the order can be cancelled or confirmed based on the timespan
            const orderCreatedTime = moment(order.created_at);
            const currentTime = moment();
            const timeSinceCreation = moment.duration(
              currentTime.diff(orderCreatedTime)
            );

            const canCancel =
              timeSinceCreation.asMinutes() <=
              defaultSettings?.cancellation_time_span;
            const canConfirm =
              timeSinceCreation.asMinutes() <=
              defaultSettings?.confirmation_time_span;
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
                    - {new Date(order.delivery_time).toLocaleDateString()}
                  </h4>
                  <h4 className="text-[14px] mb-1 leading-tight">
                    -{" "}
                    {new Date(order.delivery_time).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </h4>
                  <h4 className="text-[14px] mb-1 leading-tight">
                    - {new Date(order.delivery_time).toLocaleTimeString()}
                  </h4>
                </td>
                {/* Delivery address */}
                <td>
                  <h4 className="text-[12px] mb-1 leading-tight">
                    -{" "}
                    {(order?.order_delivery_address?.address_type === "home" &&
                      order?.order_delivery_address?.home_street_address &&
                      order?.order_delivery_address?.home_street_address) ||
                      (order?.order_delivery_address?.address_type === "office" &&
                        order?.order_delivery_address?.office_street_address &&
                        `${order?.order_delivery_address?.office_street_address}, ${order?.order_delivery_address?.office_building_no} ${order?.order_delivery_address?.office_floor}, ${order?.order_delivery_address?.office_company}`) ||
                      (order?.order_delivery_address?.address_type === "apartment" &&
                        order?.order_delivery_address?.apartment_street_address &&
                        `${order?.order_delivery_address?.apartment_street_address}, ${order?.order_delivery_address?.apartment_name}, ${order?.order_delivery_address?.apartment_apartment_no}, ${order?.order_delivery_address?.apartment_floor}`) 
                        || "not available"}
                  </h4>
                  {/* {order?.order_delivery_address?.city && ( */}
                  <h4 className="text-[12px] mb-1 leading-tight">
                    {/* - {order?.order_delivery_address?.city} */}
                    {(order?.order_delivery_address?.address_type === "home" &&
                      `- ${order?.order_delivery_address?.home_city}`) ||
                      (order?.order_delivery_address?.address_type ===
                        "office" &&
                        `- ${order?.order_delivery_address?.office_city}`) ||
                      (order?.order_delivery_address?.address_type ===
                        "apartment" &&
                        `- ${order?.order_delivery_address?.apartment_city}`) ||
                      ""}
                  </h4>
                  {/* )} */}
                  {/* <h4 className="text-[12px] mb-1 leading-tight capitalize">
                    - {order?.order_delivery_address?.address_type}
                  </h4> */}
                </td>
                <td>
                  <h4 className="text-[12px] mb-0 leading-tight">
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
                    {order.chef_earning_price.toLocaleString("en-PK", {
                      style: "currency",
                      currency: "PKR",
                    })}
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
                    className="text-sm font-medium text-headGray w-max"
                    onChange={(e) => handleStatusChange(e, order.id)}
                    defaultValue={order.status}
                  >
                    <option value="pending" hidden={true}>
                      Pending
                    </option>
                    <option
                      value="accepted"
                      hidden={order.status !== "pending" || !canConfirm}
                    >
                      Accepted
                    </option>
                    <option
                      value="preparing"
                      hidden={order.status !== "accepted"}
                    >
                      In Process
                    </option>
                    <option
                      value="delivering"
                      hidden={order.status !== "preparing"}
                    >
                      Ready to Deliver
                    </option>
                    <option
                      value="delivered"
                      hidden={order.status !== "delivering"}
                    >
                      Delivered
                    </option>
                    <option
                      className="text-primary"
                      value="canceled"
                      hidden={
                        order.status === "accepted" ||
                        order.status === "delivered" ||
                        order.status === "delivering" ||
                        order.status === "preparing" ||
                        !canCancel
                      }
                    >
                      {/*when do you don't want to show cancel?*/}
                      Cancelled
                    </option>
                  </select>
                </td>
              </tr>
            );
          })
        )}

        {orderDetails?.length < 1 && !isFetching && (
          <tr>
            <td colSpan="5" className="font-semibold text-headGray">
              No Order Found
            </td>
          </tr>
        )}
        {isFetching && (
          <tr>
            <td colSpan="8" className="text-cente font-semibold text-headGray">
              Fetching Orders...
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default OrderList;
