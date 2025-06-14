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

export const handleGetPlatformRate = async (token) => {
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

// Update Menu
export const handleUpdateMenu = async (id, token, payload) => {
  try {
    payload._method = "PUT";
    const { data } = await api.post(`/api/menu/${id}`, payload, {
      headers: { 
        Authorization: `Bearer ${token}` ,
        'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  } catch (error) {
    console.log("Error while update menu ", error);
    let err;
    if(error.response && error.response.data.errors){
      err = error.response.data?.errors[Object.keys(error.response.data.errors)[0]][0]; 
    } else if(error.response){
      err =   error.response.data.error;
    }
    throw new Error(
      err || error.message
    );
  }
}

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

// Create Discount
export const handleCreateDiscount = async (token, payload) => {
  try {
    const { data } = await api.post("/api/discount", payload, {
      headers: { 
        Authorization: `Bearer ${token}` ,
        'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  } catch (error) {
    console.log("Error while creating discount ", error);
    let err;
    if(error.response){
      err = error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]
    }
    throw new Error(
      err || error.message
    );
  }
};

// Get All Discount
export const handleGetAllDiscount = async (token) => {
  try {
    const { data } = await api.get("/api/discount", {
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
// Update Discount
export const handleUpdateDiscount = async (token, id, payload) => {
  try {
    const { data } = await api.put(`/api/discount/${id}`, payload, {
      headers: { 
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      },
    });
    return data;
  } catch (error) {
    console.log("Error while updating discount", error);
    let err;
    if (error.response) {
      err = error.response.data.errors[Object.keys(error.response.data.errors)[0]][0];
    }
    throw new Error(
      err || error.message
    );
  }
};
export const handleGetDiscountWithMenus = async (token, id) => {
  try {
    const response = await api.get(`/api/discount/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const handleDeleteDiscount = async (token, id) => {
  try {
    const response = await api.delete(`/api/discount/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Availability Time slot 
export const handleGetAvailabilityTimeSlot = async () => {
  try {
    const {data} = await api.get("/api/availability_time_slots");
    return data;
  } catch (error) {
    throw new Error(error.message)
  }
}