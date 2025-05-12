import "./styles.css";
import { useState } from "react";
import axiosBaseUrl from "../../../Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoad } from "../../../Redux/Slices/loadingSlice";

const ClientPowerPlan = () => {
  const [reportData, setReportData] = useState(null);
  const loading = useSelector((state) => state.loading.loadingState);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const fetchPowerPlanReport = async () => {
    dispatch(toggleLoad(true));
    setReportData(null);

    try {
      const response = await axiosBaseUrl.get(`clients/clientReport/${userId}`);
      const data = response.data;
      setReportData(data.data);
    } catch (error) {
      console.error("Error fetching power plan report:", error);
      setReportData(null);
    } finally {
      dispatch(toggleLoad(false));
    }
  };

  return (
    <>
      <div className="power-plan-container">
        <h2>Power Plan</h2>
        {!reportData && !loading && (
          <div className="generate-report-section">
            <p>Click On the Button to generate the power plan for this month</p>
            <button onClick={fetchPowerPlanReport} className="generate-button">
              Generate Power Plan
            </button>
          </div>
        )}

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          reportData && (
            <div className="report-display">
              <h3>Report Summary</h3>
              <p>{reportData.summary}</p>

              <div className="insight-section">
                <h4>Voltage Insights</h4>
                <p>{reportData.voltageInsights}</p>
              </div>

              <div className="insight-section">
                <h4>Power Insights</h4>
                <p>{reportData.powerInsights}</p>
              </div>

              <div className="insight-section">
                <h4>Energy Insights</h4>
                <p>{reportData.energyInsights}</p>
              </div>

              <div className="recommendations-section">
                <h4>Recommendations</h4>
                <ul>
                  {reportData.recommendations
                    .split("\n")
                    .map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                </ul>
              </div>

              <button className="download-button">Download Plan Report</button>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ClientPowerPlan;
