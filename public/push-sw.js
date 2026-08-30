self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.json() : {};
  const title = payload.title || 'New portfolio message';
  const options = {
    body: payload.body || 'You have a new contact message.',
    tag: 'portfolio-contact-message',
    data: { url: payload.url || '/admin/messages' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
