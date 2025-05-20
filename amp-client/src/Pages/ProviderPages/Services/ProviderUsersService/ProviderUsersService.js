// src/Pages/Provider/Services/ProviderUsers/ProviderUsersService.js
import axiosInstance from "../../../../Axios/axios";

const ProviderUsersService = () => {
  const getAllUsers = async (providerId) => {
    try {
      const response = await axiosInstance.get(
        `providers/getAllUsers/${providerId}`
      );
      // Access the correct data field
      return Array.isArray(response.data.data) ? response.data.data : [];
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  return { getAllUsers };
};

export default ProviderUsersService;
