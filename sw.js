// Self-destruct service worker: unregisters itself and clears all caches.
// This fixes broken service workers cached in users' browsers.
self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function() {
  self.registration.unregister();
  caches.keys().then(function(names) {
    names.forEach(function(name) { caches.delete(name); });
  });
});

