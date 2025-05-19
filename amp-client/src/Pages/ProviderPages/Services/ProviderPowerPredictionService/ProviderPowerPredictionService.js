// ProviderPowerPredictionService.js
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../Axios/axios";
import { toggleLoad } from "../../../../Redux/Slices/loadingSlice";

const ProviderPowerPredictionService = () => {
  const dispatch = useDispatch();

  const fetchProviderPredictionReport = async (userId, setReportData) => {
    dispatch(toggleLoad(true));
    setReportData(null);

    try {
      const response = await axiosInstance.get(
        `/providers/providerReport/${userId}`
      );
      setReportData(response.data.data);
    } catch (error) {
      console.error("Error fetching provider prediction report:", error);
      setReportData(null);
    } finally {
      dispatch(toggleLoad(false));
    }
  };

  return { fetchProviderPredictionReport };
};

export default ProviderPowerPredictionService;
