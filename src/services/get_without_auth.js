import { api } from "../axios/axios";

// Food category on Home
export const handleGetFoodCategory = async () => {
  try {
    const { data } = await api.get("/api/food_types");
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while fetching food category"
    );
  }
};

// All Dishes in a city (all-dishes)
export const handleGetAllDishesOfCity = async (cityId) => {
  try {
    const { data } = await api.get(`/api/all_dishes/${cityId}`);
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Something is wrong while fetching All dishes of city "
    );
  }
};

// Popular Dishes in a city (Home page)
export const handleGetPopularDishes = async (cityId) => {
  try {
    const { data } = await api.get(`/api/popular_dishes_with_chef/${cityId}`);
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Something is wrong while fetching Popular dishes "
    );
  }
}

// Popular Chef with dishes (Home page - Most loved chef)
export const handleGetPopularChefWithDishes = async (cityId) => {
  try {
    const { data } = await api.get(`/api/popular_chef_with_dishes/${cityId}`);
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Something is wrong while fetching Popular dishes "
    );
  }
}

// Get All chefs in a city (all-chef page)
export const handleGetAllChefs = async (cityId) => {
  try {
    const { data } = await api.get(`/api/all_chef/${cityId}`);
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Something is wrong while fetching Chefs "
    );
  }
}

// Get Chef with dishes (Chef-detail page)
export const handleGetChefWithDishes = async (chefId, cityId) => {
  try {
    const { data } = await api.get(`/api/chef_with_dishes/${chefId}/${cityId}`);
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Something is wrong while fetching Chef with dishes "
    );
  }
}


// Get Single Dish (dish-detail-single page)
export const handleGetSingleDish = async ( dishId) => {
  try {
    const { data } = await api.get(`/api/single_menu/${dishId}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message || "Something is wrong while Fetching Dishes"
    );
  }
}