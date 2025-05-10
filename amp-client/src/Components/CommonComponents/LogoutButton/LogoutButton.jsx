import "./styles.css";
import axiosBaseUrl from "../../../Axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await axiosBaseUrl.post("/logout");

      if (response.data.success === true || response.data.success === "true") {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
      Logout
    </button>
  );
};

export default LogoutButton;
