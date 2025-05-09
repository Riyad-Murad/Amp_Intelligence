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

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <Link to="/admin-dashboard" className="un-underlined">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <Link to="/admin-dashboard" className="un-underlined">
          <h1 className="navbar-title">Amp Intelligence</h1>
        </Link>
      </div>
      <nav className="sidebar-nav">
        <Link to="/admin-navigation-page" className="sidebar-link">
          <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon" />
          <span className="link-text">Navigation Page</span>
        </Link>
        <Link to="/admin-add-provider" className="sidebar-link">
          <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
          <span className="link-text">Add Provider</span>
        </Link>
        <Link to="/admin-view-providers" className="sidebar-link">
          <FontAwesomeIcon icon={faBolt} className="sidebar-icon" />
          <span className="link-text">View Providers</span>
        </Link>
        <Link to="/admin-contact-messages" className="sidebar-link">
          <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
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
