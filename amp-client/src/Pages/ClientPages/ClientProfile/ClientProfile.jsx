import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../../Components/CommonComponents/InputField/InputField";
import ActionButton from "../../../Components/CommonComponents/ActionButton/ActionButton";
import ClientProfileService from "../Services/ClientProfileService/ClientProfileService";

const ClientProfile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { updatePassword } = ClientProfileService();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    await updatePassword({ password: newPassword });
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
