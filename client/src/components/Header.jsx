/* @refresh reset */
import { motion } from 'framer-motion'
import '../styles/components.css'

const Header = () => {
  console.log('Header mounted')
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="header slide-down"
    >
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <div className="logo-text">
            <h1>Festive Moments</h1>
            <p>Celebrate in Style</p>
          </div>
        </div>
        
        <div className="status-indicator">
          <div className="status-dot"></div>
          <span className="status-text">Online</span>
        </div>
      </div>
    </motion.header>
  )
}

export default Header