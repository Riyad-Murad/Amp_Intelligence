import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import LogoutButton from "../../CommonComponents/LogoutButton/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faBolt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ProviderSidebar = () => {
  return (
    <div className="provider-sidebar">
      <div className="sidebar-header">
        <Link to="/provider/dashboard" className="un-underlined">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Link to="/provider/dashboard" className="un-underlined">
          <h1 className="navbar-title">Amp Intelligence</h1>
        </Link>
      </div>
      <nav className="sidebar-nav">
        <Link to="/provider/dashboard" className="sidebar-link">
          <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" />
          <span className="link-text">Dashboard</span>
        </Link>
        <Link to="/provider/users" className="sidebar-link">
          <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
          <span className="link-text">Users</span>
        </Link>
        <Link to="/provider/power-prediction" className="sidebar-link">
          <FontAwesomeIcon icon={faBolt} className="sidebar-icon" />
          <span className="link-text">Power Prediction</span>
        </Link>
        <Link to="/provider/profile" className="sidebar-link">
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
          <span className="link-text">Profile</span>
        </Link>
      </nav>
      <div className="sidebar-footer">
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProviderSidebar;
