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

export const handleGetTags = async (token) => {
  try {
    const { data } = await api.get("/api/tags", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while fetching tags"
    );
  }
}

// Create Menu
export const handleCreateMenu = async (token, payload) => {
  try {
    const { data } = await api.post("/api/menu", payload, {
      headers: { 
        Authorization: `Bearer ${token}` ,
        'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  } catch (error) {
    console.log("Error while create menu ", error);
    let err;
    if(error.response){
      err = error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]
    }
    throw new Error(
      err || error.message
    );
  }
};


// Get All Dishes
export const handleGetAllDishes = async (token) => {
  try {
    const { data } = await api.get("/api/menu", {
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