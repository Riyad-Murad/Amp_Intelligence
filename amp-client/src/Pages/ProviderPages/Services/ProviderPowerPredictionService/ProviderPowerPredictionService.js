// ProviderPowerPredictionService.js
import axiosInstance from "../../../../Axios/axios";

const ProviderPowerPredictionService = {
  async fetchPowerPrediction() {
    try {
      const response = await axiosInstance.get("/providers/providerReport");
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
};

export default ProviderPowerPredictionService;
