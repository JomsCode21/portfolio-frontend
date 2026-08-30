import api, { unwrap } from './api';

const toUint8Array = (value: string) => {
  const padding = '='.repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(base64);
  return Uint8Array.from(raw, (character) => character.charCodeAt(0));
};

const isSupported = () =>
  'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

export async function pushNotificationStatus() {
  if (!isSupported()) return { supported: false, enabled: false, permission: 'default' };
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = registration && (await registration.pushManager.getSubscription());
  return {
    supported: true,
    enabled: Boolean(subscription),
    permission: Notification.permission,
  };
}

export async function enablePushNotifications() {
  if (!isSupported()) throw new Error('This browser does not support push notifications.');
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('Notification permission was not granted.');

  const registration = await navigator.serviceWorker.register('/push-sw.js');
  await navigator.serviceWorker.ready;
  const keyResponse = await unwrap(api.get('/push/public-key'));
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription)
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: toUint8Array(keyResponse.data.publicKey),
    });

  await unwrap(api.post('/push/subscriptions', subscription.toJSON()));
  return pushNotificationStatus();
}

export async function disablePushNotifications() {
  if (!isSupported()) return pushNotificationStatus();
  const registration = await navigator.serviceWorker.getRegistration();
  const subscription = registration && (await registration.pushManager.getSubscription());
  if (!subscription) return pushNotificationStatus();

  await unwrap(api.delete('/push/subscriptions', { data: { endpoint: subscription.endpoint } }));
  await subscription.unsubscribe();
  return pushNotificationStatus();
}
