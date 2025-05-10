import "./styles.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import LogoutButton from "../../CommonComponents/LogoutButton/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileAlt,       // Navigation Page
    faUserEdit,    // Add Provider
    faEye,         // View Providers
    faEnvelope      // Contact Messages
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <Link to="/admin-navigation-page" className="un-underlined">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Link to="/admin-navigation-page" className="un-underlined">
          <h1 className="navbar-title">Amp Intelligence</h1>
        </Link>
      </div>
      <nav className="sidebar-nav">
        <Link to="/admin-navigation-page" className="sidebar-link">
          <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
          <span className="link-text">Navigation Page</span>
        </Link>
        <Link to="/admin-edit-provider" className="sidebar-link">
          <FontAwesomeIcon icon={faUserEdit} className="sidebar-icon" />
          <span className="link-text">Edit Provider</span>
        </Link>
        <Link to="/admin-view-providers" className="sidebar-link">
          <FontAwesomeIcon icon={faEye} className="sidebar-icon" />
          <span className="link-text">View Providers</span>
        </Link>
        <Link to="/admin-contact-messages" className="sidebar-link">
          <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon" />
          <span className="link-text">Contact Messages</span>
        </Link>
      </nav>
      <div className="sidebar-footer">
        <LogoutButton />
      </div>
    </div>
  );
};

export default AdminSidebar;
