import axiosInstance from "../../../../Axios/axios";

export const fetchAllProviders = async () => {
  try {
    const response = await axiosInstance.get("/admins/getAllProviders");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching providers:", error);
    return [];
  }
};
