import "./styles.css";
import React from "react";
import PriceCard from "../PriceCard/PriceCard";

function PricesSection() {
  const pricingData = [
    {
      title: "Basic Plan",
      features: ["Feature 1", "Feature 2", "Limited Support"],
      price: 19,
    },
    {
      title: "Standard Plan",
      features: ["All Basic Features", "Enhanced Support", "More Options"],
      price: 49,
    },
    {
      title: "Premium Plan",
      features: [
        "All Standard Features",
        "Priority Support",
        "Advanced Analytics",
      ],
      price: 99,
    },
  ];

  return(
    <div>PricesSection</div>
  )
}

export default PricesSection;
