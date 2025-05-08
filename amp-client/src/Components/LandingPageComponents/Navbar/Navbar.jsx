import "./styles.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import ActionButton from "../ActionButton/ActionButton";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/" className="navbar-title">
          Amp Intelligence
        </Link>
      </div>

      {/* Desktop navigation links */}
      <div className="navbar-links">
        <a href="#services">Services</a>
        <a href="#about-us">About Us</a>
        <a href="#contact-us">Contact Us</a>
      </div>

      <div className="navbar-right">
        <ActionButton backgroundColor="#233A7E" color="#FFFFFF" text="Login" />
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <a href="#services" onClick={toggleMobileMenu}>
            Services
          </a>
          <a href="#about-us" onClick={toggleMobileMenu}>
            About Us
          </a>
          <a href="#contact-us" onClick={toggleMobileMenu}>
            Contact Us
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
