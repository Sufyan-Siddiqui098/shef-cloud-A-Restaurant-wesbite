import { api } from "../axios/axios";


// Get Single Dishe
export const handleGetSingleDish = async (token, dishId) => {
    try {
      const { data } = await api.get(`/api/menu/${dishId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.message || "Something is wrong while Fetching Dishes"
      );
    }
  }