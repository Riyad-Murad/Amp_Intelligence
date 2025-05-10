import "./styles.css";
import AdminSidebar from "../../../Components/AdminComponents/AdminSidebar/AdminSidebar";

const AdminEditProvider = () => {
  return (
    <>
      <div className="admin-edit-provider-container">
        <AdminSidebar />        
        <div className="main-content">
          <h1 className="main-content-title section-titles">Edit Provider</h1>
        </div>
      </div>
    </>
  );
};

export default AdminEditProvider;
