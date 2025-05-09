import "./styles.css";

const AboutUsSection = ({ id }) => {
  return (
    <section className="about-us-section" id={id}>
      <h2 className="section-titles primary-color">About Us</h2>
      <p className="about-us-text">
        At Amp Intelligence, we are driven by a passion for innovation and a
        commitment to providing exceptional solutions in the realm of electrical
        usage management. Founded on the principles of efficiency, reliability,
        and sustainability, we strive to empower individuals and businesses with
        the tools and insights they need to optimize their energy consumption.
      </p>
      <p className="about-us-text">
        Our team comprises experienced engineers, software developers, and
        industry experts dedicated to developing cutting-edge technologies that
        simplify the complexities of electrical provisioning and management. We
        believe in a future where energy is used intelligently and responsibly,
        contributing to a more sustainable and cost-effective environment for
        all.
      </p>
      <p className="about-us-text">
        We are constantly evolving, adapting to the ever-changing landscape of
        the energy sector to ensure our solutions remain at the forefront of
        innovation. Our focus is not just on providing tools, but on building
        lasting partnerships with our clients, understanding their unique needs,
        and delivering tailored solutions that drive tangible results.
      </p>
    </section>
  );
};

export default AboutUsSection;
