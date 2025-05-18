import "./styles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoad } from "../../../Redux/Slices/loadingSlice";
import ProviderPowerPredictionService from "../Services/ProviderPowerPredictionService/ProviderPowerPredictionService";

const ProviderPowerPrediction = () => {
  const [predictionData, setPredictionData] = useState(null);
  const loading = useSelector((state) => state.loading.loadingState);
  const dispatch = useDispatch();

  const fetchPowerPrediction = async () => {
    dispatch(toggleLoad(true));
    setPredictionData(null);

    try {
      const data = await ProviderPowerPredictionService.fetchPowerPrediction();
      setPredictionData(data);
    } catch (error) {
      console.error("Error fetching power prediction:", error.message);
      setPredictionData(null);
    } finally {
      dispatch(toggleLoad(false));
    }
  };

  return (
    <div className="provider-power-prediction-container">
      <div className="main-content">
        <h1 className="main-content-title section-titles">Power Prediction</h1>

        {!predictionData && !loading && (
          <div className="generate-report-section">
            <p>Click the button to generate the power prediction.</p>
            <button onClick={fetchPowerPrediction} className="generate-button">
              Generate Prediction
            </button>
          </div>
        )}

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          predictionData && (
            <div className="report-display">
              <h3>Prediction Summary</h3>
              {predictionData.summary ? (
                <p>{predictionData.summary}</p>
              ) : (
                <p>No summary available.</p>
              )}

              {predictionData.voltageInsights && (
                <div className="insight-section">
                  <h4>Voltage Insights</h4>
                  <p>{predictionData.voltageInsights}</p>
                </div>
              )}

              {predictionData.powerInsights && (
                <div className="insight-section">
                  <h4>Power Insights</h4>
                  <p>{predictionData.powerInsights}</p>
                </div>
              )}

              {predictionData.energyInsights && (
                <div className="insight-section">
                  <h4>Energy Insights</h4>
                  <p>{predictionData.energyInsights}</p>
                </div>
              )}

              {predictionData.recommendations && (
                <div className="recommendations-section">
                  <h4>Recommendations</h4>
                  <ul>
                    {predictionData.recommendations
                      .split("\n")
                      .map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                  </ul>
                </div>
              )}

              <button className="download-button">Download Prediction</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProviderPowerPrediction;
