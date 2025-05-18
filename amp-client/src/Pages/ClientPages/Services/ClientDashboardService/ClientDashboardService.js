// ClientDashboardService.js
import axiosInstance from "../../../../Axios/axios";

const ClientDashboardService = {
  async fetchClientDashboardData(userId) {
    try {
      const response = await axiosInstance.get(`/clients/clientDashboardData/${userId}`);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
};

export default ClientDashboardService;
