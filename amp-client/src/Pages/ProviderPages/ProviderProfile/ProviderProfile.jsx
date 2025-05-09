import "./styles.css";
import ProviderSidebar from "../../../Components/ProviderComponents/ProviderSidebar/ProviderSidebar";

const ProviderProfile = () => {
  return (
    <>
      <div className="provider-profile-container">
        <ProviderSidebar />
        <div className="main-content">
          <h1 className="main-content-title section-titles">Provider Profile</h1>
        </div>
      </div>
    </>
  );
};

export default ProviderProfile;
