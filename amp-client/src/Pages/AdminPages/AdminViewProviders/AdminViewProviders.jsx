import "./styles.css";
import AdminSidebar from "../../../Components/AdminComponents/AdminSidebar/AdminSidebar";

const AdminViewProviders = () => {
  return (
    <>
      <div className="admin-view-providers-container">
        <AdminSidebar />
        <div className="main-content">
          <h1 className="main-content-title section-titles"></h1>
        </div>
      </div>
    </>
  );
};

export default AdminViewProviders;
