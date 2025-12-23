// Public VAPID key (must match server key)
// In development, you can hardcode or fetch from server
// In production, this should come from your backend API

// For development - you can hardcode your VAPID public key here
const DEFAULT_VAPID_PUBLIC_KEY = 'BPi0k6CqYFuynWm3Dsw5QFsMfM_GR1vnRysVbQO6pX5FxFbc0A03vJVRS8CMLYRt1K_TVUohkXMgMM6jhGF2Chg';

// Function to get VAPID key (fetches from server if available, falls back to default)
const getVapidPublicKey = async () => {
  try {
    // Try to fetch from server first
    const response = await fetch('/api/vapid-public-key');
    if (response.ok) {
      const data = await response.json();
      return data.publicKey;
    }
  } catch (error) {
    console.warn('Could not fetch VAPID key from server, using default:', error.message);
  }
  
  // Fall back to hardcoded key or environment variable
  return import.meta.env.VITE_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
};

// Convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers are not supported');
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    console.log('Service Worker registered successfully');
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    throw error;
  }
};

export const subscribeToPush = async (registration) => {
  try {
    // Get VAPID key
    const vapidPublicKey = await getVapidPublicKey();
    
    // Only check if key exists, not if it's a specific value
    if (!vapidPublicKey) {
      throw new Error('VAPID public key is not configured.');
    }

    console.log('Using VAPID key (first 20 chars):', vapidPublicKey.substring(0, 20) + '...');
    
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    });

    console.log('Push subscription successful');
    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push:', error);
    throw error;
  }
};

export const unsubscribeFromPush = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      console.log('Push subscription cancelled');
    }
  } catch (error) {
    console.error('Failed to unsubscribe from push:', error);
    throw error;
  }
};

// Helper function to check if notifications are supported
export const checkNotificationSupport = () => {
  return 'Notification' in window && 
         'serviceWorker' in navigator && 
         'PushManager' in window;
};

// You can also export as default if needed
export default {
  registerServiceWorker,
  subscribeToPush,
  unsubscribeFromPush,
  checkNotificationSupport
};