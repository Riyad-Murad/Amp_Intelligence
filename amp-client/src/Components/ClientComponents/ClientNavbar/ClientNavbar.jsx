import "./styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const ClientNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <Link to="/client-dashboard">Dashboard</Link>
          <Link to="/client-power-plan">Power Plan</Link>
        </div>
      )}
    </div>
  );
};

export default ClientNavbar;
