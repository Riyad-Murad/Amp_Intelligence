import "./styles.css";
import React from "react";

function PriceCard({ title, features, price }) {
  return (
    <div className="price-card sub-sections">
      <h3 className="section-titles primary-color">{title}</h3>
      <ul>
        {features.map((feature, index) => (
          <li key={index} className="text black-color">
            {feature}
          </li>
        ))}
      </ul>
      <p className="subtitle black-color">Price: ${price}</p>
    </div>
  );
}

export default PriceCard;
