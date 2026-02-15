// Service Worker for Samurai Cricket Club PWA
const CACHE_NAME = 'samurai-cc-v5';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // NEVER intercept API calls — let them go straight to network
  // Covers both script.google.com and the redirect to script.googleusercontent.com
  if (url.includes('script.google.com') || url.includes('script.googleusercontent.com') || url.includes('googleapis.com')) {
    return; // Don't call e.respondWith — lets browser handle it normally
  }

  // Cache-first for static app assets only
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
