import { Route, Routes } from "react-router-dom";
import Home from "../Pages/CommonPages/Home/Home";
import ClientDashboard from "../Pages/ClientPages/ClientDashboard/ClientDashboard";
import ClientPowerPlan from "../Pages/ClientPages/ClientPowerPlan/ClientPowerPlan";
import ClientProfile from "../Pages/ClientPages/ClientProfile/ClientProfile";

import ProviderUsers from "../Pages/ProviderPages/ProviderUsers/ProviderUsers";
import ProviderProfile from "../Pages/ProviderPages/ProviderProfile/ProviderProfile";
import ProviderDashboard from "../Pages/ProviderPages/ProviderDashboard/ProviderDashboard";
import ProviderPowerPrediction from "../Pages/ProviderPages/ProviderPowerPrediction/ProviderPowerPrediction";

import AdminEditProvider from "../Pages/AdminPages/AdminEditProvider/AdminEditProvider";
import AdminViewProviders from "../Pages/AdminPages/AdminViewProviders/AdminViewProviders";
import AdminNavigationPage from "../Pages/AdminPages/AdminNavigationPage/AdminNavigationPage";
import AdminContactMessages from "../Pages/AdminPages/AdminContactMessages/AdminContactMessages";

import ProtectedRoute from "../Components/CommonComponents/ProtectedRoutes/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Client Protected Routes */}
      <Route path="/client" element={<ProtectedRoute requiredRole="Client" />}>
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/power-plan" element={<ClientPowerPlan />} />
        <Route path="/client/profile" element={<ClientProfile />} />
      </Route>

      {/* Provider Protected Routes */}
      <Route path="/provider" element={<ProtectedRoute requiredRole="Provider" />}>
        <Route path="/provider/users" element={<ProviderUsers />} />
        <Route path="/provider/profile" element={<ProviderProfile />} />
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/power-prediction" element={<ProviderPowerPrediction />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route path="/admin" element={<ProtectedRoute requiredRole="Admin" />}>
        <Route path="/admin/edit-provider" element={<AdminEditProvider />} />
        <Route path="/admin/view-providers" element={<AdminViewProviders />} />
        <Route path="/admin/navigation-page" element={<AdminNavigationPage />} />
        <Route path="/admin/contact-messages" element={<AdminContactMessages />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;