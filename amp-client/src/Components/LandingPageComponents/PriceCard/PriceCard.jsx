import "./styles.css";

function PriceCard({ title, features, price, isPopular, isActive, badgeText }) {
  return (
    <div
      className={`price-card-wrapper ${isPopular ? "popular" : ""} ${
        isActive ? "active" : ""
      }`}
    >
      {badgeText && <div className="badge">{badgeText}</div>}
      <div className="price-card">
        <h3 className="plan-title">{title}</h3>
        <p className="price">
          ${price} <span className="price-period">/year</span>
        </p>
        <ul className="feature-list">
          {features.map((feature, index) => (
            <li key={index} className="feature-item">
              <span className="checkmark">✔</span> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PriceCard;
