import "./styles.css";
import { useLogout } from "../../../Hooks/useLogoutHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const LogoutButton = () => {
  const logout = useLogout();
  
  const handleLogout = async () => {
    try {

      await logout();

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
