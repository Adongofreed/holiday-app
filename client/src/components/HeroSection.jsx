import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/sparkles-theme.css';

const HeroSection = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const newYear2026 = new Date('January 1, 2026 00:00:00 GMT+0000').getTime();
      const now = new Date().getTime();
      const difference = newYear2026 - now;

      if (difference <= 0) {
        setIsNewYear(true);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsNewYear(false);
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Standout Greeting Message */}
        <motion.div 
          className="greeting-message"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="greeting-icon">✨</div>
          
          <div className="brand-highlight">
            <h1>Sparkles I.T</h1>
            <span className="year">Nalerigu • Since 2024</span>
          </div>
          
          <div className="greeting-text">
            <h2 className="main-greeting">
              Season's Warmest Greetings & Best Wishes
            </h2>
            <p className="greeting-description">
              As we celebrate this festive season, we extend our heartfelt gratitude 
              for your continued trust in our printing and digital solutions. 
              May this Christmas bring you joy, and may the New Year 2026 shower 
              you with success, happiness, and endless opportunities.
            </p>
          </div>

          {/* Strong Customer Care Message */}
          <motion.div 
            className="customer-care-message"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="customer-care-title">
              Your Satisfaction is Our Priority
            </h3>
            <p className="customer-care-text">
              At Sparkles I.T, we're committed to delivering exceptional service 
              with personal attention to every project. Your vision, perfectly printed.
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div className="greeting-decoration">
            {['🎄', '🎁', '🌟', '🕯️', '❄️'].map((icon, index) => (
              <span 
                key={index}
                className="decoration-item"
                style={{ '--i': index }}
              >
                {icon}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Countdown / New Year Celebration */}
        <div className="countdown-section">
          {isNewYear ? (
            <motion.div 
              className="new-year-celebration"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="celebration-icon">🎆</div>
              <h2 className="celebration-title">Happy New Year 2026!</h2>
              <p className="celebration-message">
                From all of us at <strong>Sparkles I.T, Nalerigu</strong>, 
                we wish you a year filled with prosperity, growth, and success!
              </p>
              <div className="celebration-sparkles">
                {['✨', '🎉', '🥂', '🎊', '🌟'].map((icon, index) => (
                  <span key={index} className="sparkle">{icon}</span>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              <h3 className="countdown-title">Countdown to New Year 2026</h3>
              <div className="countdown-display">
                <div className="countdown-unit">
                  <div className="unit-value">{countdown.days.toString().padStart(2, '0')}</div>
                  <div className="unit-label">Days</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                  <div className="unit-value">{countdown.hours.toString().padStart(2, '0')}</div>
                  <div className="unit-label">Hours</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                  <div className="unit-value">{countdown.minutes.toString().padStart(2, '0')}</div>
                  <div className="unit-label">Minutes</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                  <div className="unit-value">{countdown.seconds.toString().padStart(2, '0')}</div>
                  <div className="unit-label">Seconds</div>
                </div>
              </div>
              <p className="countdown-message">
                Counting down with you from Nalerigu to a prosperous 2026!
              </p>
            </>
          )}
        </div>

        {/* Quick Contact Info */}
        {/* Add this after the countdown section in HeroSection.jsx */}
<div className="quick-contact">
  <div className="contact-card">
    <div className="contact-icon">📍</div>
    <div className="contact-details">
      <h4>Visit Us</h4>
      <p>Sparkles I.T, Nalerigu</p>
      <p className="contact-note">Easy to find location</p>
    </div>
  </div>
  
  <div className="contact-card">
    <div className="contact-icon">📞</div>
    <div className="contact-details">
      <h4>Call Now</h4>
      <a href="tel:0547706698">054 770 6698</a>
      <p className="contact-note">Available 8AM-8PM</p>
    </div>
  </div>
  
    <div className="contact-card">
      <div className="contact-icon">⏰</div>
        <div className="contact-details">
          <h4>Business Hours</h4>
          <p>Mon-Sat: 8AM - 8PM</p>
          <p className="contact-note">Sunday: Closed</p>
        </div>
      </div>
    </div>
  </div>
    </section>
  );
};

export default HeroSection;