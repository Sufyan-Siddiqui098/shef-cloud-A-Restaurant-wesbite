import { api } from "../axios/axios";

// Create Order
export const handleCreateOrder = async (token, payload) => {
  try {
    const { data } = await api.post("/api/order", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.log("Error while order ", error);
    let err;
    if (error.response && error.response.data.errors) {
      err =
        error.response.data?.errors[
          Object.keys(error.response.data.errors)[0]
        ][0];
    } else if (error.response) {
      err = error.response.data.error;
    }

    throw new Error(err || error.message);
  }
};
export const handleGetOrders = async (token,params) => {
  try {
    const { data } = await api.get("/api/order", {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return data;
  } catch (error) {
    console.error("Error While fetching orders\n", error);
  }
};

export const handleChangeOrderStatus = async (token, payload, id) => {
  try {
    // console.log(token, payload, id);
    const { data } = await api.post("/api/update_order_status/" + id, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.error("Error While fetching orders\n", error);
  }
};
// Get Discount - Promo Code (Checkout page)
export const handleCheckDiscount = async (token, payload) => {
  try {
    const { data } = await api.post("/api/check-discount", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// Post - Review and Rating of Order
export const handleOrderReviewAndRating = async (token, payload) => {
  try {
    const { data } = await api.post("/api/review", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error);
  }
};
