import "./styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import axiosBaseUrl from "../../../Axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faTimes,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "../../../Hooks/useLogoutHook";

const ClientNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const logout = useLogout();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="client-navbar">
      <div className="client-navbar-left">
        <img src={logo} alt="Logo" className="client-navbar-logo" />
        <Link to="/client/dashboard" className="client-navbar-title">
          Amp Intelligence
        </Link>
      </div>

      {/* Desktop navigation links */}
      <div className="client-navbar-links">
        <Link to="/client/dashboard">Dashboard</Link>
        <Link to="/client/power-plan">Power Plan</Link>
      </div>

      <div className="client-navbar-right">
        {/* Conditionally render profile icon container */}
        {!mobileMenuOpen && (
          <div
            className="client-profile-icon-wrap"
            onClick={toggleProfileDropdown}
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              className="client-profile-icon"
            />
            {profileDropdownOpen && (
              <div className="client-dropdown-menu">
                <Link to="/client/profile">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="client-dropdown-icon"
                  />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="client-dropdown-logout"
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="client-dropdown-icon"
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        <button
          className="client-mobile-menu-button"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className={`client-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <Link to="/client/profile">Profile</Link>
          <Link to="/client/dashboard">Dashboard</Link>
          <Link to="/client/power-plan">Power Plan</Link>
          <button onClick={handleLogout} className="client-mobile-logout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientNavbar;
