import "./styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const LogoutButton = () => {
  return (
    <button className="logout-button">
      <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
      Logout
    </button>
  );
};

export default LogoutButton;
