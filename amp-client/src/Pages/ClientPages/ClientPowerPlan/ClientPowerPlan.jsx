import "./styles.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import ActionButton from "../../../Components/CommonComponents/ActionButton/ActionButton";
import ClientPowerPlanService from "../Services/ClientPowerPlanService/ClientPowerPlanService";

const ClientPowerPlan = () => {
  const [reportData, setReportData] = useState(null);
  const loading = useSelector((state) => state.loading.loadingState);
  const userId = useSelector((state) => state.user.id);

  const { fetchPowerPlanReport } = ClientPowerPlanService();

  return (
    <div className="client-container">
      <header className="client-header">
        <h1 className="client-title">Monthly Energy Report</h1>
        <p className="client-subtitle">
          Personalized power optimization plan for your devices
        </p>
      </header>

      {reportData && !loading && (
        <div className="client-download-top">
          <ActionButton
            text="Download Report"
            className="client-download-action-button"
            color="#FFFFFF"
            onClick={() => console.log("Download triggered")}
            width="250px"
            margin="20px auto"
          />
        </div>
      )}

      {!reportData && !loading && (
        <div className="client-generate-card">
          <p>
            Click below to analyze your past 10 months of usage and receive a
            detailed power plan.
          </p>
          <ActionButton
            text="Generate My Plan"
            className="client-generate-action-button"
            color="#FFFFFF"
            onClick={() => fetchPowerPlanReport(userId, setReportData)}
            width="250px"
            margin="20px auto 0"
          />
        </div>
      )}

      {loading ? (
        <div className="client-loading-overlay">
          <div className="client-spinner" />
          <p>Generating your plan...</p>
        </div>
      ) : (
        reportData && (
          <div className="client-report-card">
            <section className="client-summary-section">
              <h3>Summary</h3>
              <p>{reportData.summary}</p>
            </section>

            <section className="client-insight-grid">
              <div className="client-insight-box">
                <h4>Voltage Insights</h4>
                <p>{reportData.voltageInsights}</p>
              </div>
              <div className="client-insight-box">
                <h4>Power Insights</h4>
                <p>{reportData.powerInsights}</p>
              </div>
              <div className="client-insight-box">
                <h4>Energy Insights</h4>
                <p>{reportData.energyInsights}</p>
              </div>
            </section>

            <section className="client-recommendation-section">
              <h4>Recommendations</h4>
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

export default ClientPowerPlan;
