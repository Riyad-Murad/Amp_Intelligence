import "./styles.css";
import FeatureCard from "../FeatureCard/FeatureCard";
import {
  faChartLine,
  faCogs,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

const Features = ({ id }) => {
  const featuresData = [
    {
      title: "Real-time Monitoring",
      text: "Gain instant insights into your electrical usage with our intuitive dashboard.",
      icon: faChartLine,
    },
    {
      title: "Smart Automation",
      text: "Automate provisioning and management tasks to optimize efficiency.",
      icon: faCogs,
    },
    {
      title: "Detailed Analytics",
      text: "Analyze historical data to identify trends and make informed decisions.",
      icon: faChartPie,
    },
  ];

  return (
    <section className="features-section sub-sections" id={id}>
      <h2 className="section-titles primary-color">Features</h2>
      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            text={feature.text}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
