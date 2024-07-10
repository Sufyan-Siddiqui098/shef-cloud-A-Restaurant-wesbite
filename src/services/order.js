import { api } from "../axios/axios";

// Create Order
export const handleCreateOrder = async (token, payload) => {
    try {
      const { data } = await api.post("/api/order", payload, {
        headers: { 
          Authorization: `Bearer ${token}` ,
          'Content-Type': 'multipart/form-data'
        },
      });

      return data;
      
    } catch (error) {

      console.log("Error while order ", error);
      let err;
      if(error.response && error.response.data.errors){
        err = error.response.data?.errors[Object.keys(error.response.data.errors)[0]][0]; 
      } else if(error.response){
        err =   error.response.data.error;
      }

      throw new Error( err || error.message );

    }
  };
  export const handleGetOrders = async (token) => {
    try {
      const { data } = await api.get("/api/order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.error("Error While fetching orders\n", error);
    }
  };
  