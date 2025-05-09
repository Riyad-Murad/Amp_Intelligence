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

  return (
    <section className="prices-section">
      <h2 className="section-titles primary-color">Pricing</h2>
      <p className="text black-color">
        These are the different kinds of services that we offer based on your
        needs. If you are interested in any of our services, don't hesitate to
        contact us via phone, email or by filling out the contact form.
      </p>
      <div className="prices-grid">
        {pricingData.map((plan, index) => (
          <PriceCard
            key={index}
            title={plan.title}
            features={plan.features}
            price={plan.price}
          />
        ))}
      </div>
    </section>
  );
}

export default PricesSection;
