// Service Worker for Push Notifications

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');

  if (!event.data) {
    console.error('Push event but no data');
    return;
  }

  const data = event.data.json();
  
  const options = {
    body: data.body || 'Happy New Year! 🎉',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    image: '/notification-image.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'new-year-notification'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'New Year Greeting', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});