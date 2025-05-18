import { useDispatch } from "react-redux";
import { toggleLoad } from "../../../../Redux/Slices/loadingSlice";
import axiosInstance from "../../../../Axios/axios";

const ClientPowerPlanService = () => {
  const dispatch = useDispatch();

  const fetchPowerPlanReport = async (userId, setReportData) => {
    dispatch(toggleLoad(true));
    setReportData(null);

    try {
      const response = await axiosInstance.get(
        `clients/clientReport/${userId}`
      );
      const data = response.data;
      setReportData(data.data);
    } catch (error) {
      console.error("Error fetching power plan report:", error);
      setReportData(null);
    } finally {
      dispatch(toggleLoad(false));
    }
  };

  return { fetchPowerPlanReport };
};

export default ClientPowerPlanService;
