import "./styles.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import ActionButton from "../../../Components/CommonComponents/ActionButton/ActionButton";
import ProviderPredictionService from "../Services/ProviderPowerPredictionService/ProviderPowerPredictionService";

const ProviderPowerPrediction = () => {
  const [reportData, setReportData] = useState(null);
  const loading = useSelector((state) => state.loading.loadingState);
  const userId = useSelector((state) => state.user.id);

  const { fetchProviderPredictionReport } = ProviderPredictionService();

  return (
    <div className="provider-container">
      <header className="provider-header">
        <h1 className="provider-title">Provider Power Forecast</h1>
        <p className="provider-subtitle">
          Smart metrics-based prediction to optimize your grid efficiency
        </p>
      </header>

      {reportData && !loading && (
        <div className="provider-download-top">
          <ActionButton
            text="Download Forecast"
            className="provider-download-action-button"
            color="#FFFFFF"
            onClick={() => console.log("Download triggered")}
            width="250px"
            margin="20px auto"
          />
        </div>
      )}

      {!reportData && !loading && (
        <div className="provider-generate-card">
          <p>
            Analyze 10 months of aggregated metrics to forecast your upcoming
            energy demand and resource allocation.
          </p>
          <ActionButton
            text="Generate Forecast"
            className="provider-generate-action-button"
            color="#FFFFFF"
            onClick={() => fetchProviderPredictionReport(userId, setReportData)}
            width="250px"
            margin="20px auto 0"
          />
        </div>
      )}

      {loading ? (
        <div className="provider-loading-overlay">
          <div className="provider-spinner" />
          <p>Generating prediction...</p>
        </div>
      ) : (
        reportData && (
          <div className="provider-report-card">
            <section className="provider-summary-section">
              <h3>Summary</h3>
              <p>{reportData.summary}</p>
            </section>

            <section className="provider-insight-grid">
              <div className="provider-insight-box">
                <h4>Voltage Trends</h4>
                <p>{reportData.voltageInsights}</p>
              </div>
              <div className="provider-insight-box">
                <h4>Power Load</h4>
                <p>{reportData.powerInsights}</p>
              </div>
              <div className="provider-insight-box">
                <h4>Energy Patterns</h4>
                <p>{reportData.energyInsights}</p>
              </div>
            </section>

            <section className="provider-recommendation-section">
              <h4>Optimization Strategies</h4>
              <ul>
                {reportData.recommendations.split("\n").map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </section>
          </div>
        )
      )}
    </div>
  );
};

export default ProviderPowerPrediction;
