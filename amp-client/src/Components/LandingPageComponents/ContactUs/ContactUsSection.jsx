import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";
import contactUs from "../../../assets/contact-us.png";
import InputField from "../../CommonComponents/InputField/InputField";
import ActionButton from "../../CommonComponents/ActionButton/ActionButton";
import sendContactMessage from "../Services/ContactUsService/ContactUsService";

const ContactUsSection = ({ id }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone_number) {
      toast.error("Please fill all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          message: "",
        });
      } else {
        toast.error(
          result.error || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id={id}>
      <div className="section-center">
        <h2 className="section-titles primary-color">Contact Us</h2>
        <p className="subtitle">
          Contact us today if you'd like to know more about our services
        </p>
      </div>
      <section className="contact-us-section">
        <div className="contact-info">
          <img src={contactUs} alt="Contact Us" className="contact-image" />
        </div>
        <div className="contact-form">
          <h2 className="section-titles primary-color section-center less-margin">
            Contact Us
          </h2>

          <InputField
            label="Full Name"
            placeholder="Full Name"
            width="80%"
            value={formData.name}
            onChange={handleInputChange("name")}
          />
          <InputField
            label="Email"
            placeholder="Email"
            width="80%"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
          />
          <InputField
            label="Phone Number"
            placeholder="Phone Number"
            width="80%"
            value={formData.phone_number}
            onChange={handleInputChange("phone_number")}
          />
          <InputField
            label="Message"
            placeholder="Message (Optional)"
            textarea
            width="80%"
            value={formData.message}
            onChange={handleInputChange("message")}
            required={false}
          />
          <ActionButton
            backgroundColor="#233a7e"
            color="white"
            text={isSubmitting ? "Submitting..." : "Submit"}
            width="60%"
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default ContactUsSection;
