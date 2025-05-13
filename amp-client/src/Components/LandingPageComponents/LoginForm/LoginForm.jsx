import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosBaseUrl from "../../../Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { storeData } from "../../../Redux/Slices/UserSlice";
import InputField from "../../CommonComponents/InputField/InputField";
import ActionButton from "../../CommonComponents/ActionButton/ActionButton";
import { toggleLoad } from "../../../Redux/Slices/loadingSlice";

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = useSelector((state) => state.loading.loadingState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(toggleLoad(true));

      const response = await axiosBaseUrl.post("/login", { email, password });
      
      const userType = response.data.data.user_type;

      localStorage.setItem("Token", response.data.data.token);
      dispatch(storeData(response.data.data));

      if (userType === "Client") {
        toast.success("Hello Client");
        navigate("/client/dashboard");
      } else if (userType === "Provider") {
        toast.success("Hello Provider");
        navigate("/provider/dashboard");
      } else if (userType === "Admin") {
        toast.success("Hello Admin");
        navigate("/admin/navigation-page");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      dispatch(toggleLoad(false));
    }
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
                onClick={handleLogin}
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
