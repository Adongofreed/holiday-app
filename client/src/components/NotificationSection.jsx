import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../hooks/useNotification';
import '../styles/sparkles-theme.css';

const NotificationSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { 
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    error,
    subscribe,
    unsubscribe 
  } = useNotification();

  if (!isSupported) {
    return (
      <div className="notification-container">
        <div className="notification-card notification-error">
          <div className="notification-header">
            <div className="notification-icon">📱</div>
            <div className="notification-text">
              <h3>Browser Not Supported</h3>
              <p className="notification-subtext">
                Push notifications are not supported in your browser. 
                Please try using Chrome, Firefox, or Safari.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notification-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="notification-card"
      >
        <div className="notification-header">
          <div className="notification-icon">🔔</div>
          <div className="notification-text">
            <h3>New Year 2026 Notification</h3>
            <p className="notification-subtext">
              Get a special greeting when the new year begins
            </p>
          </div>
          
          <button
            className="notification-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="notification-details"
            >
              <div className="info-box">
                <h4>How it works</h4>
                <ul className="info-list">
                  <li>Click "Enable Notifications" to opt-in</li>
                  <li>Receive exactly one notification on January 1st, 2026</li>
                  <li>We don't store personal data</li>
                  <li>You can unsubscribe anytime</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="notification-actions">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {permission === 'denied' ? (
            <div className="permission-denied">
              <p>You've blocked notifications. Please enable them in your browser settings.</p>
            </div>
          ) : isSubscribed ? (
            <div className="subscribed-state">
              <div className="success-badge">
                <div className="success-dot"></div>
                Notifications Enabled
              </div>
              <p className="success-message">
                You'll receive a New Year greeting on January 1st, 2026
              </p>
              <button
                onClick={unsubscribe}
                disabled={isLoading}
                className="btn btn-secondary"
              >
                {isLoading ? 'Processing...' : 'Unsubscribe'}
              </button>
            </div>
          ) : (
            <div className="subscribe-state">
              <button
                onClick={subscribe}
                disabled={isLoading || permission === 'denied'}
                className="btn btn-primary"
              >
                {isLoading ? 'Setting up...' : 'Enable Notifications'}
              </button>
              <p className="privacy-note">
                One notification only · No spam · Privacy respected
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationSection;