import "./styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import ActionButton from "../ActionButton/ActionButton";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
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
        <a href="#about-us" onClick={() => scrollToSection("about-us")}>About Us</a>
        <a href="#features" onClick={() => scrollToSection("features")}>Features</a>
        <a href="#prices" onClick={() => scrollToSection("prices")}>Prices</a>
        <a href="#contact-us" onClick={() => scrollToSection("contact-us")}>Contact Us</a>
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
          <a href="#about-us" onClick={() => scrollToSection("about-us")}>
            About Us
          </a>
          <a href="#features" onClick={() => scrollToSection("features")}>
            Features
          </a>
          <a href="#prices" onClick={() => scrollToSection("prices")}>
            Prices
          </a>
          <a href="#contact-us" onClick={() => scrollToSection("contact-us")}>
            Contact Us
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
