self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('baby-cache-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/icon-192x192.png',
          '/icon-512x512.png',
          '/sketch.js',
          '/choro2.mp3',
          'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js',
          'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/addons/p5.sound.min.js',
          'https://unpkg.com/ml5@latest/dist/ml5.min.js',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  