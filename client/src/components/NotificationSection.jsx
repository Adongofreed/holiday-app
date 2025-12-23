import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../hooks/useNotification';

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
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="notification-section fade-in"
      >
        <div className="notification-card">
          <div className="flex items-start">
            <div className="notification-icon-container">
              <span className="notification-icon">📱</span>
            </div>
            <div className="notification-text">
              <h3>Browser Not Supported</h3>
              <p className="text-gray-600">
                Push notifications are not supported in your browser. Please try using Chrome, Firefox, or Safari.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="notification-section fade-in"
    >
      <div className="notification-card">
        <div className="notification-header">
          <div className="flex items-start">
            <div className="notification-icon-container">
              <span className="notification-icon">🔔</span>
            </div>
            <div className="notification-text">
              <h3>New Year Notification</h3>
              <p>Get a special greeting when the new year begins</p>
            </div>
          </div>
          
          <button
            className="notification-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
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
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="info-box">
                <h4>
                  <span>ℹ️</span> How it works
                </h4>
                <ul className="info-list">
                  <li>Click "Enable Notifications" to opt-in</li>
                  <li>Receive exactly one notification on January 1st</li>
                  <li>We don't store personal data - only anonymous subscription info</li>
                  <li>You can unsubscribe anytime</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {permission === 'denied' ? (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">
                You've blocked notifications. Please enable them in your browser settings.
              </p>
              <button
                onClick={() => window.open('https://support.google.com/chrome/answer/3220216', '_blank')}
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                How to enable notifications →
              </button>
            </div>
          ) : isSubscribed ? (
            <div className="text-center">
              <div className="success-badge">
                <div className="success-dot"></div>
                Notifications Enabled ✓
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                You'll receive a special New Year greeting on January 1st
              </p>
              <button
                onClick={unsubscribe}
                disabled={isLoading}
                className="btn btn-secondary"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner spinner-dark"></div>
                    Processing...
                  </div>
                ) : 'Unsubscribe'}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={subscribe}
                disabled={isLoading || permission === 'denied'}
                className="btn btn-primary"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="spinner"></div>
                    Setting up...
                  </div>
                ) : 'Enable Notifications'}
              </button>
              <p className="text-gray-600 text-sm mt-4">
                One notification only · No spam · Privacy respected
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default NotificationSection;