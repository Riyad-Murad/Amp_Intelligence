import "./styles.css";
import ProviderSidebar from "../../../Components/ProviderComponents/ProviderSidebar/ProviderSidebar";

const ProviderDashboard = () => {
  return (
    <>
      <div className="provider-dashboard-container">
        <ProviderSidebar />
        <div className="main-content">
          <h1 className="main-content-title section-titles">Dashboard</h1>
        </div>
      </div>
    </>
  );
};

export default ProviderDashboard;
