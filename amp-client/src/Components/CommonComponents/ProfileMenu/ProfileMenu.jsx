import "./styles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../../Hooks/useLogoutHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="profile-menu-container">
      <div className="profile-summary" onClick={handleToggle}>
        <span className="username">Profile Menu</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`arrow-icon ${isOpen ? "open" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/provider/profile" className="dropdown-item">
            <FontAwesomeIcon icon={faUser} className="item-icon" />
            Profile
          </Link>
          <button onClick={handleLogout} className="dropdown-item logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="item-icon" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
