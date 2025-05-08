import "./styles.css";
import React from "react";
import Navbar from "../../Components/LandingPageComponents/Navbar/Navbar";
import HeroSection from "../../Components/LandingPageComponents/HeroSection/HeroSection";
import AboutUsSection from "../../Components/LandingPageComponents/AboutUs/AboutUsSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUsSection />
    </>
  );
};

export default Home;
