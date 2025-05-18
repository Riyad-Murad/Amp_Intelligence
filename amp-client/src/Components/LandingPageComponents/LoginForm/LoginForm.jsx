import "./styles.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../../CommonComponents/InputField/InputField";
import ActionButton from "../../CommonComponents/ActionButton/ActionButton";
import useLoginFormService from "../Services/LoginFormService/LoginFormService";

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useLoginFormService();
  const loading = useSelector((state) => state.loading.loadingState);

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

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
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <InputField
                label="Email"
                placeholder="Email"
                width="70%"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Password"
                placeholder="Password"
                type="password"
                width="70%"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ActionButton
                backgroundColor="#F9A43A"
                color="#233A7E"
                text={<h3>Login</h3>}
                width="70%"
                onClick={onSubmit}
                margin="5px"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
