const CACHE = 'iestmi-v5';
const ASSETS = ['./', './index.html', './img/logo.jpg', './img/icono.jpg', './img/hero.webp', './img/g1.webp', './img/g2.webp', './img/g3.webp', './img/g4.webp', './img/g5.webp', './img/g6.webp', './img/g7.webp', './img/g8.webp', './img/g9.webp', './img/g10.webp', './img/g11.webp', './img/g12.webp', './img/g13.webp', './img/g14.webp', './img/g15.webp', './img/g16.webp', './img/g17.webp', './img/g18.webp', './img/g19.webp', './img/g20.webp'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
