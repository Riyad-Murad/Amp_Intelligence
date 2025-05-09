import "./styles.css";
import React from "react";
import Navbar from "../../Components/LandingPageComponents/Navbar/Navbar";
import Features from "../../Components/LandingPageComponents/Features/Features";
import HeroSection from "../../Components/LandingPageComponents/HeroSection/HeroSection";
import AboutUsSection from "../../Components/LandingPageComponents/AboutUs/AboutUsSection";
import PricesSection from "../../Components/LandingPageComponents/PricesSection/PricesSection";
import ContactUsSection from "../../Components/LandingPageComponents/ContactUs/ContactUsSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUsSection />
      <Features />
      <PricesSection />
      <ContactUsSection />
    </>
  );
};

export default Home;
