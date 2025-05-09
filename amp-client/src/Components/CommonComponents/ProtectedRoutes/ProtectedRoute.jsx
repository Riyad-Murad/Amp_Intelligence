import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../../AdminComponents/AdminSidebar/AdminSidebar";
import ClientNavbar from "../../ClientComponents/ClientNavbar/ClientNavbar";
import ProviderSidebar from "../../ProviderComponents/ProviderSidebar/ProviderSidebar";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("Token");
  const userType = localStorage.getItem("user_type");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (userType === "Client") {
    return (
      <>
        <ClientNavbar />
        <Outlet />
      </>
    );
  } else if (userType === "Provider") {
    return (
      <>
        <ProviderNavbar />
        <Outlet />
      </>
    );
  }
};

export default ProtectedRoute;
