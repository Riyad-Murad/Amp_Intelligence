import "./styles.css";
import Navbar from "../../Components/LandingPageComponents/Navbar/Navbar";
import Footer from "../../Components/LandingPageComponents/Footer/Footer";
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
      <AboutUsSection id="about-us" />
      <Features id="features" />
      <PricesSection id="prices" />
      <ContactUsSection id="contact-us" />
      <Footer />
    </>
  );
};

export default Home;
