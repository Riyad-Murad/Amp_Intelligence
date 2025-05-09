import "./styles.css";
import React from "react";
import InputField from "../InputField/InputField";
import ActionButton from "../ActionButton/ActionButton";
import contactUs from "../../../assets/contact-us.png";

const ContactUsSection = () => {
  return (
    <div>
      <div className="section-center">
        <h2 className="section-titles primary-color">Contact Us</h2>
        <p className="subtitle">
          Contact us today if you'd like to know more about our services
        </p>
      </div>
      <section className="contact-us-section">
        <div className="contact-info">
          <img src={contactUs} alt="Contact Us" width="444" height="650" />
        </div>
        <div className="contact-form">
          <h2 className="section-titles primary-color section-center">Contact Us</h2>
          {/* <div className="content-center"> */}
            <InputField label="Full Name" placeholder="Full Name" width="80%" />
            <InputField label="Email" placeholder="Email" width="80%" />
            <InputField label="Phone Number" placeholder="Phone Number" width="80%" />
            <InputField label="Message" placeholder="Message" textarea width="80%" />
            <ActionButton backgroundColor="#233a7e" color="white" text="Submit" width="60%" />
          {/* </div> */}
        </div>
      </section>
    </div>
  );
};

export default ContactUsSection;
