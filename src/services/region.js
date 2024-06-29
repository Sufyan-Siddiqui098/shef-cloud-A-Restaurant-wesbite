import { api } from "../axios/axios";

export const handleGetCountries = async () => {
  try {
    const { data } = await api.get("/api/countries_api");
    return data;
  } catch (error) {
    console.error("Error While fetching countries\n", error);
  }
};

export const handleGetCitites = async () => {
  try {
    const { data } = await api.get("/api/cities_api");
    return data;
  } catch (error) {
    console.error("Error While fetching cities\n", error);
  }
};
