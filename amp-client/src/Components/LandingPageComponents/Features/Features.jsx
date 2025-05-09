import "./styles.css";
import FeatureCard from "../FeatureCard/FeatureCard";

const Features = ({ id }) => {
  const featuresData = [
    {
      title: "Real-time Monitoring",
      text: "Gain instant insights into your electrical usage with our intuitive dashboard.",
    },
    {
      title: "Smart Automation",
      text: "Automate provisioning and management tasks to optimize efficiency.",
    },
    {
      title: "Detailed Analytics",
      text: "Analyze historical data to identify trends and make informed decisions.",
    },
  ];

  return (
    <section className="features-section sub-sections" id={id}>
      <h2 className="section-titles primary-color">Features</h2>
      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <FeatureCard key={index} title={feature.title} text={feature.text} />
        ))}
      </div>
    </section>
  );
};

export default Features;
