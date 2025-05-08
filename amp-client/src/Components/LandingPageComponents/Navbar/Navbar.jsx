import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import ActionButton from "../ActionButton/ActionButton";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <Link href="/" className="navbar-title">
          Amp Intelligence
        </Link>
      </div>
      <div className="navbar-links">
        <a href="#services">Services</a>
        <a href="#about-us">About Us</a>
        <a href="#contact-us">Contact Us</a>
      </div>
      <div className="navbar-right">
        <ActionButton backgroundColor="#233A7E" color="#FFFFFF" text="Login" />
      </div>
    </div>
  );
};

export default Navbar;
