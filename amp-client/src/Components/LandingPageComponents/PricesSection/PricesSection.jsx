import "./styles.css";
import PriceCard from "../PriceCard/PriceCard";

function PricesSection({ id }) {
  const pricingData = [
    {
      title: "Basic Plan",
      features: [
        "Manage and Control up to 1500 apartments",
        "Basic reporting tools",
      ],
      price: 15000,
      badgeText: "Active",
      isActive: true,
    },
    {
      title: "Advanced Plan",
      features: [
        "Manage and Control up to 2500 apartments",
        "Advanced reporting tools",
      ],
      price: 22000,
      badgeText: "Save 12%",
      isPopular: true,
    },
    {
      title: "Premium Plan",
      features: [
        "Manage and Control unlimited number of apartments",
        "Advanced reporting tools",
        "Access to anti-theft dashboards",
      ],
      price: 33000,
      badgeText: "Best",
    },
  ];

  return (
    <section className="prices-section" id={id}>
      <h2 className="section-titles primary-color">Pricing</h2>
      <p className="text black-color">
        These are the different kinds of services that we offer based on your
        needs...
      </p>
      <div className="prices-grid">
        {pricingData.map((plan, index) => (
          <PriceCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
}

export default PricesSection;
