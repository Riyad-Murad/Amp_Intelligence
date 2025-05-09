import "./styles.css";
import ProviderSidebar from "../../../Components/ProviderComponents/ProviderSidebar/ProviderSidebar";

const ProviderUsers = () => {
  return (
    <>
      <div className="provider-users-container">
        <ProviderSidebar />
        <div className="main-content">
          <h1 className="main-content-title section-titles">Users</h1>
        </div>
      </div>
    </>
  );
};

export default ProviderUsers;
