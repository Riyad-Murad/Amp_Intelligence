import "./styles.css";
import InputField from "../../CommonComponents/InputField/InputField";
import ActionButton from "../../CommonComponents/ActionButton/ActionButton";

const LoginForm = ({ onClose }) => {
  return (
    <div className="login-layer">
      <div className="login-form">
        <div className="login-header">
          <h2 className="login-title">Login</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="login-content">
          <InputField label="Email" placeholder="Email" width="80%" />
          <InputField
            label="Password"
            placeholder="Password"
            type="password"
            width="80%"
          />
          <ActionButton
            backgroundColor="#F9A43A"
            color="#233A7E"
            text={<h3>Login</h3>}
            width="60%"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
