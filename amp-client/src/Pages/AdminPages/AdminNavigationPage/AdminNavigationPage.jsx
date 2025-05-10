import "./styles.css";
import AdminSidebar from "../../../Components/AdminComponents/AdminSidebar/AdminSidebar";

const AdminNavigationPage = () => {
  return (
    <>
      <div className="admin-navigation-page-container">
        <AdminSidebar />
        <div className="main-content">
          <h1 className="main-content-title section-titles">Navigation Page</h1>
        </div>
      </div>
    </>
  );
};

export default AdminNavigationPage;
