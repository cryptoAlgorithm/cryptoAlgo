importScripts('cache-polyfill.js');

self.addEventListener('activate', function(e) {
    e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== 'CryptoAlgo') {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
});

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('CryptoAlgo').then(function(cache) {
     return cache.addAll([
       'icon_Lid_icon.ico',
       'generic.html',
       'downloads.html',
       'contact.html',
       'index.html',
       'assets/css/main.css',
       'assets/js/jquery.min.js',
       'assets/js/jquery.scrollex.min.js',
       'assets/js/jquery.scrolly.min.js',
       'assets/js/main.js',
       'assets/js/skel.min.js',
       'assets/js/util.js',
       'assets/js/lazysizes.min.js',
       'images/banner.webp',
       'images/bg.webp',
       'images/pic01.webp',
       'images/pic02.webp',
       'images/pic03.webp',
       'images/icon.png'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});