import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toggleLoad } from "../../../Redux/Slices/loadingSlice";
import AdminSidebar from "../../AdminComponents/AdminSidebar/AdminSidebar";
import ClientNavbar from "../../ClientComponents/ClientNavbar/ClientNavbar";
import ProviderSidebar from "../../ProviderComponents/ProviderSidebar/ProviderSidebar";

const ProtectedRoute = ({ requiredRole }) => {
  const userType = useSelector((state) => state.user.user_type);  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoad(true));

    if (userType) {
      if (userType !== requiredRole) {
        navigate("/");
      }
      dispatch(toggleLoad(false));
    }
  }, [userType, requiredRole, navigate, dispatch]);

  if (userType === requiredRole) {
    const Layout = {
      Client: <ClientNavbar />,
      Provider: <ProviderSidebar />,
      Admin: <AdminSidebar />,
    }[userType];

    return (
      <>
        {Layout}
        <Outlet />
      </>
    );
  }
  return null;
};

export default ProtectedRoute;
