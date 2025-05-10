import "./styles.css";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import axiosBaseUrl from "../../../Axios/axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faTimes,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const ClientNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

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
      const response = await axiosBaseUrl.post("/logout");

      if (response.data.success === true || response.data.success === "true") {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/client-dashboard" className="navbar-title">
          Amp Intelligence
        </Link>
      </div>

      {/* Desktop navigation links */}
      <div className="navbar-links">
        <Link to="/client-dashboard">Dashboard</Link>
        <Link to="/client-power-plan">Power Plan</Link>
      </div>

      <div className="navbar-right">
        {/* Conditionally render profile icon container */}
        {!mobileMenuOpen && (
          <div
            className="profile-icon-container"
            onClick={toggleProfileDropdown}
          >
            <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
            {profileDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/client-profile">
                  <FontAwesomeIcon icon={faUser} className="dropdown-icon" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="dropdown-logout-button"
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="dropdown-icon"
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <Link to="/client-profile">Profile</Link>
          <Link to="/client-dashboard">Dashboard</Link>
          <Link to="/client-power-plan">Power Plan</Link>
          <button onClick={handleLogout} className="mobile-menu-logout-button">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientNavbar;
