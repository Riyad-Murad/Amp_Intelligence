import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axiosBaseUrl from "../../../Axios/axios";
import InputField from "../../../Components/CommonComponents/InputField/InputField";
import ActionButton from "../../../Components/CommonComponents/ActionButton/ActionButton";

const ClientProfile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    const password = newPassword;

    try {
      const response = await axiosBaseUrl.post("/clients/editProfile", {
        password,
      });

      if (response.data.success) {
        toast.success("Password updated successfully.");
        setTimeout(() => navigate("/client/dashboard"), 1000);
      } else {
        toast.error(response.data.message || "Failed to update password.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="client-profile-container">
      <h2>Change Password</h2>
      <form className="password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <InputField
            label="Current Password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            width="90%"
          />
        </div>

        <div className="form-group">
          <InputField
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            width="90%"
          />
        </div>

        <div className="form-group">
          <InputField
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            width="90%"
          />
        </div>

        <ActionButton
          text="Save Changes"
          backgroundColor="#233A7E"
          color="#FFF"
          width="50%"
          margin="20px 0 0"
        />
      </form>
    </div>
  );
};

export default ClientProfile;
