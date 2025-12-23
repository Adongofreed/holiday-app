import { useState, useEffect, useCallback } from 'react';
import { 
  registerServiceWorker, 
  subscribeToPush, 
  unsubscribeFromPush,
  checkNotificationSupport 
} from '../services/notificationService';

export const useNotification = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vapidKeyLoaded, setVapidKeyLoaded] = useState(false);

  useEffect(() => {
    // Check if browser supports notifications
    const supported = checkNotificationSupport();
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);
      
      // Check if already subscribed
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          setIsSubscribed(!!subscription);
        }).catch(err => {
          console.error('Error checking subscription:', err);
        });
      }).catch(err => {
        console.error('Error getting service worker:', err);
      });
      
      // Mark VAPID key as loaded (we'll fetch it when needed)
      setVapidKeyLoaded(true);
    }
  }, []);

  const subscribe = useCallback(async () => {
    if (!isSupported) {
      setError('Push notifications are not supported in your browser');
      return;
    }

    if (permission === 'denied') {
      setError('Notifications have been blocked. Please enable them in browser settings.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Request notification permission
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult);

      if (permissionResult !== 'granted') {
        throw new Error('Notification permission denied');
      }

      // Register service worker
      const registration = await registerServiceWorker();

      // Subscribe to push notifications
      const subscription = await subscribeToPush(registration);

      if (subscription) {
        setIsSubscribed(true);
        
        // Send subscription to backend
        try {
          const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to save subscription');
          }
          
          const result = await response.json();
          console.log('Subscription saved successfully:', result);
        } catch (fetchError) {
          console.error('Error saving subscription to server:', fetchError);
          // Don't throw here - the subscription was successful locally
          // User can still receive notifications if server is down temporarily
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to enable notifications');
      console.error('Notification subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, permission]);

  const unsubscribe = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get current subscription
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // Try to notify backend about unsubscription
        try {
          const response = await fetch('/api/unsubscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: subscription.endpoint })
          });
          
          if (response.ok) {
            console.log('Backend notified about unsubscribe');
          }
        } catch (fetchError) {
          console.error('Error notifying backend about unsubscribe:', fetchError);
          // Continue with local unsubscribe even if backend fails
        }
        
        // Unsubscribe locally
        const unsubscribed = await subscription.unsubscribe();
        if (unsubscribed) {
          console.log('Push subscription cancelled locally');
          setIsSubscribed(false);
        } else {
          throw new Error('Failed to unsubscribe locally');
        }
      } else {
        setIsSubscribed(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to unsubscribe');
      console.error('Unsubscribe error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    error,
    vapidKeyLoaded,
    subscribe,
    unsubscribe
  };
};