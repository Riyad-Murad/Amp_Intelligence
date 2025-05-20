import axiosInstance from "../../../../Axios/axios";

export const fetchContactMessages = async () => {
  try {
    const response = await axiosInstance.get("admins/getAllContactMessages");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return [];
  }
};