import React from "react";
import "./styles.css";
import ActionButton from "../ActionButton/ActionButton";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <a href="/" className="navbar-title">Amp Intelligence</a>
      </div>
      <div className="navbar-links">
        <a href="#">Services</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
      </div>
      <div className="navbar-right">
        <ActionButton backgroundColor="#233A7E" color="#FFFFFF" text="Login" />
      </div>
    </div>
  );
};

export default Navbar;
