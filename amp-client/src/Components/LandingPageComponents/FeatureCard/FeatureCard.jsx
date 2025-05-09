import "./styles.css";
import React from "react";

function FeatureCard({ title, text }) {
  return (
    <div className="feature-card">
      <h3 className="section-titles primary-color">{title}</h3>
      <p className="text black-color">{text}</p>
    </div>
  );
}

export default FeatureCard;
