import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const diff = newYear - now;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      return `${days}d ${hours}h until New Year`;
    };
    
    setCountdown(calculateCountdown());
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="hero-section fade-in"
    >
      <div className="hero-title-container">
        <div className="hero-title-glow"></div>
        <div className="hero-title">
          Merry Christmas! 🎄
          <div className="hero-subtitle">
            Wishing you warmth and joy this holiday season
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="countdown-badge scale-in"
      >
        <div className="countdown-dot"></div>
        <span className="countdown-text">{countdown}</span>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;