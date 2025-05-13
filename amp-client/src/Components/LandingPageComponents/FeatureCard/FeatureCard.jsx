import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FeatureCard({ title, text, icon }) {
  return (
    <div className="feature-card">
      <FontAwesomeIcon icon={icon} className="feature-icon" />
      <h3 className="section-titles primary-color">{title}</h3>
      <p className="text black-color">{text}</p>
    </div>
  );
}

export default FeatureCard;
