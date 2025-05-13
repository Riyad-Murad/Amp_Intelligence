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

// import "./styles.css";

// function PriceCard({ title, features, price }) {
//   return (
//     <div className="price-card sub-sections">
//       <h3 className="section-titles primary-color">{title}</h3>
//       <ul>
//         {features.map((feature, index) => (
//           <li key={index} className="text black-color">
//             {feature}
//           </li>
//         ))}
//       </ul>
//       <p className="subtitle black-color">Price: ${price}</p>
//     </div>
//   );
// }

// export default PriceCard;
