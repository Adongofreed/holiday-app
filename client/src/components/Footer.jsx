import '../styles/sparkles-theme.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">✨</span>
            <div className="footer-brand-text">
              <h3 className="footer-brand-name">Sparkles I.T</h3>
              <p className="footer-tagline">Printing & Digital Excellence</p>
            </div>
          </div>
          <p className="footer-mission">
            Providing professional printing and digital solutions in Nalerigu since 2024.
          </p>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h4 className="footer-heading">Contact Information</h4>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <p>Nalerigu, Ghana</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <a href="tel:0547706698">054 770 6698</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <p>contact@sparklesit.com</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="footer-services">
          <h4 className="footer-heading">Our Services</h4>
          <ul className="services-list">
            <li>Printing & Photocopy</li>
            <li>Lamination & Binding</li>
            <li>T-Shirt Printing</li>
            <li>Banners & Stickers</li>
            <li>Passport Pictures</li>
            <li>Graphic Design</li>
          </ul>
        </div>

        {/* Hours */}
        <div className="footer-hours">
          <h4 className="footer-heading">Business Hours</h4>
          <div className="hours-list">
            <div className="hours-item">
              <span className="day">Monday - Friday:</span>
              <span className="time">8:00 AM - 8:00 PM</span>
            </div>
            <div className="hours-item">
              <span className="day">Saturday:</span>
              <span className="time">8:00 AM - 6:00 PM</span>
            </div>
            <div className="hours-item">
              <span className="day">Sunday:</span>
              <span className="time">Closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <p className="copyright">
            © {currentYear} Sparkles I.T. All rights reserved.
          </p>
          <p className="location-note">
            Serving Nalerigu and surrounding communities with quality printing services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;