import "./styles.css";
import FooterLogo from "../../../assets/footer-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <img className="footer-logo" src={FooterLogo} alt="Footer Logo" />
      <div className="nav-main">
        <h2>Amp Intelligence</h2>
      </div>
      <div className="right-footer">
        <div className="copyright-footer">
          <div className="nav-secondary">
            <p className="text-regular">
              Want to build a smart electricity provisioning system?
            </p>
            <p className="text-regular">
              We bring the everything for you from hardware and software
            </p>
            <p className="text-regular">
              Amp Intelligence at your service! Don’t hesitate to contact us
            </p>
          </div>
          <p className="icons copyright">© 2025 — Copyright</p>
        </div>
        <div className="contact-buttons">
          <div className="contacts">
            <h4 className="small-footer-titles">Contact us</h4>
            <div className="list">
              <p className="text-regular">+961 71 111 111</p>
              <p className="text-regular">riyad@gmail.com</p>
            </div>
          </div>
          <div className="social-media">
            <div className="item">
              <p className="icons">Whatsapp</p>
            </div>
            <div className="item">
              <p className="icons">Gmail</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
