import { api } from "../axios/axios";

export const handleGetDefaultSetting = async (token) => {
    try {
        const { data } = await api.get("/api/default_settings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        return data;
      } catch (error) {
        console.error("Error While fetching Default Settings \n", error);
      }
}