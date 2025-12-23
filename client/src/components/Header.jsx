import { motion } from 'framer-motion';
import '../styles/sparkles-theme.css';

const Header = () => {
  return (
    <motion.header 
      className="main-header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="header-content">
        <div className="brand-wrapper">
          <div className="logo-container">
            <span className="logo-icon">✨</span>
          </div>
          <div className="brand-info">
            <h1 className="brand-title">Sparkles I.T</h1>
            <p className="brand-subtitle">Printing & Digital Solutions • Nalerigu</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;