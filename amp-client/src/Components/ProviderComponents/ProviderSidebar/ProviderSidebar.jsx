import "./styles.css";
import { Link } from 'react-router-dom';
import logo from "../../../assets/logo.png";
import LogoutButton from "../../CommonComponents/LogoutButton/LogoutButton";

const ProviderSidebar = () => {
  return (
    <div className="provider-sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="navbar-title">Amp Intelligence</h1>
      </div>
      <nav className="sidebar-nav">
        <Link to="/provider-dashboard" className="sidebar-link">
          Dashboard
        </Link>
        <Link to="/provider-users" className="sidebar-link">
          Users
        </Link>
        <Link to="/provider-power-prediction" className="sidebar-link">
          Power Prediction
        </Link>
        <Link to="/provider-profile" className="sidebar-link">
          Profile
        </Link>
      </nav>
      <div className="sidebar-footer">
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProviderSidebar;
