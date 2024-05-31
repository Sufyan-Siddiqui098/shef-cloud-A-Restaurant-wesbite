import { api } from "../axios/axios";

export const handleGetIngredients = async (token) => {
  try {
    const { data } = await api.get("/api/ingredients", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while fetching ingredients"
    );
  }
};

export const handleGetSpiceLevel = async (token) => {
  try {
    const { data } = await api.get("/api/spice_levels", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while fetching spice level"
    );
  }
};

export const handleGetFoodType = async (token) => {
  try {
    const { data } = await api.get("/api/food_types", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while fetching food type"
    );
  }
};

export const handleGetPortionType = async (token) => {
  try {
    const { data } = await api.get("/api/portion_types", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while fetching portion type"
    );
  }
};

export const handleGetHeatingInstruction = async (token) => {
  try {
    const { data } = await api.get("/api/instructions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while fetching heating instruction"
    );
  }
};

export const hanldeGetPlatformRate = async (token) => {
  try {
    const { data } = await api.get("/api/platform_rates", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while fetching platform rate"
    );
  }
};

// Create Menu
export const handleCreateMenu = async (token, payload) => {
  try {
    const { data } = await api.post("/api/menu", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while Creating Menu"
    );
  }
};
