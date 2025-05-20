import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderProfileService from "../Services/ProviderProfile/ProviderProfile";
import InputField from "../../../Components/CommonComponents/InputField/InputField";
import ActionButton from "../../../Components/CommonComponents/ActionButton/ActionButton";

const ProviderProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const { updateProfile } = ProviderProfileService();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  return (
    <div className="provider-profile-wrapper">
      <div className="provider-profile-main">
        <h2 className="provider-profile-heading">Provider Profile</h2>

        <div className="provider-profile-card">
          <h2 className="provider-profile-subtitle">Edit Provider Profile</h2>
          <form className="provider-profile-form">
            <div className="provider-profile-form-group">
              <InputField
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                type="text"
                width="90%"
                required={false}
              />
            </div>

            <div className="provider-profile-form-group">
              <InputField
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                type="email"
                width="90%"
                required={false}
              />
            </div>

            <div className="provider-profile-form-group">
              <InputField
                label="Password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                type="password"
                width="90%"
                required={false}
              />
            </div>

            <div className="provider-profile-form-group">
              <InputField
                label="Phone Number"
                placeholder="Enter phone number"
                value={formData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                type="tel"
                width="90%"
                required={false}
              />
            </div>

            <ActionButton
              text="Save Changes"
              backgroundColor="#f9a43a"
              className="submit-action-button"
              color="#FFF"
              width="50%"
              margin="20px 0 0"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
