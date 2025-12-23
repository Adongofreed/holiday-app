import { motion } from 'framer-motion';
import '../styles/sparkles-theme.css';

const ServicesSection = () => {
  const services = [
    {
      icon: '🖨️',
      title: 'Printing Services',
      items: ['Document Printing', 'Color Printing', 'Bulk Printing', 'Photo Printing']
    },
    {
      icon: '📄',
      title: 'Document Processing',
      items: ['Photocopy', 'Lamination', 'Scanning', 'Fax Services']
    },
    {
      icon: '📚',
      title: 'Book Production',
      items: ['Book Binding', 'Thesis Binding', 'Report Binding', 'Hard Cover']
    },
    {
      icon: '👕',
      title: 'Apparel Printing',
      items: ['T-Shirt Printing', 'Uniform Printing', 'Custom Designs', 'Bulk Orders']
    },
    {
      icon: '🎨',
      title: 'Design Services',
      items: ['Graphic Design', 'Logo Creation', 'Business Cards', 'Certificates']
    },
    {
      icon: '🖼️',
      title: 'Specialty Printing',
      items: ['Banners & Stickers', 'Passport Photos', 'ID Cards', 'Complementary Cards']
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Our Core Services</h2>
          <p className="section-subtitle">
            Professional printing and digital solutions in Nalerigu
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <ul className="service-items">
                {service.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact & Location Section */}
        <div className="contact-location">
          <motion.div 
            className="contact-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="contact-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-label">Phone Number</p>
                  <a href="tel:0547706698" className="contact-value">054 770 6698</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-value">contact@sparklesit.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <p className="contact-label">Business Hours</p>
                  <p className="contact-value">Monday - Saturday: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="location-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="location-title">Our Location</h3>
            <div className="location-info">
              <div className="location-item">
                <span className="location-icon">📍</span>
                <div>
                  <p className="location-label">Address</p>
                  <p className="location-value">Sparkles I.T, Nalerigu</p>
                </div>
              </div>
              <div className="location-map">
                <div className="map-placeholder">
                  <span className="map-icon">🗺️</span>
                  <p>Located in the heart of Nalerigu</p>
                  <p className="map-note">Easy to find and access</p>
                </div>
              </div>
              <div className="location-note">
                <p>📌 Walk-ins welcome • 🅿️ Parking available • ♿ Wheelchair accessible</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;