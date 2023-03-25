self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('baby-cache-v1').then((cache) => {
        return cache.addAll([
          '',
          'index.html',
          'manifest.json',
          'icon-192x192.png',
          'icon-512x512.png',
          'sketch.js',
          'choro2.mp3',
          'p5.js',
          'p5.sound.min.js',
          'ml5.min.js',
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
  