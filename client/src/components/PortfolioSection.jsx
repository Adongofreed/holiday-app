import { motion } from 'framer-motion';
import '../styles/sparkles-theme.css';

const PortfolioSection = () => {
  const projects = [
    {
      image: '/portfolio/printing-1.jpg',
      title: 'Business Stationery',
      description: 'Professional business cards, letterheads, and envelopes for corporate clients.'
    },
    {
      image: '/portfolio/tshirt-printing.jpg',
      title: 'Custom T-Shirt Printing',
      description: 'High-quality t-shirt printing for events, teams, and promotional activities.'
    },
    {
      image: "portfolio/banner-design.jpg",
      title: 'Banner & Signage',
      description: 'Large format printing for banners, signs, and outdoor advertising.'
    },
    {
      image: '/portfolio/book-binding.jpg',
      title: 'Book Binding Services',
      description: 'Professional binding for theses, reports, and publications.'
    },
    {
      image: '/portfolio/certificate-printing.jpg',
      title: 'Certificate Printing',
      description: 'Premium certificate printing with custom designs and security features.'
    },
    {
      image: '/portfolio/graphic-design.jpg',
      title: 'Graphic Design Projects',
      description: 'Custom logo designs, branding packages, and marketing materials.'
    }
  ];

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Recent Projects</h2>
          <p className="section-subtitle">
            Examples of our work in Nalerigu and surrounding areas
          </p>
        </motion.div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="project-image">
                <div className="image-placeholder">
                  <span className="placeholder-icon">🖼️</span>
                  <p className="image-text">Project Image</p>
                  <p className="image-description">{project.image}</p>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="portfolio-cta">
          <p className="cta-text">
            Need professional printing services in Nalerigu? 
            <strong> Contact us today at 054 770 6698</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;