import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axiosBaseUrl from "../../../Axios/axios";
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
          <h4 htmlFor="current-password">Current Password:</h4>
          <input
            id="current-password"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <h4 htmlFor="new-password">New Password:</h4>
          <input
            id="new-password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <h4 htmlFor="confirm-password">Confirm New Password:</h4>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <ActionButton
          text="Save Changes"
          backgroundColor="#233A7E"
          color="#FFF"
          width="100%"
          margin="20px 0 0"
        />
        {/* {message && <p className="form-message">{message}</p>} */}
      </form>
    </div>
  );
};

export default ClientProfile;
