/* ─── Faciouz Care Service Worker ─── */
const CACHE = 'faciouz-v1';
const STATIC = [
  '/',
  '/index.html',
  '/menu.html',
  '/about.html',
  '/gallery.html',
  '/reservations.html',
  '/contact.html',
  '/order.html',
  '/css/style.css',
  '/js/main.js',
  '/js/data.js',
  '/Faciouz Care logo.jpeg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first for Supabase/Paystack/Termii API calls
  if (e.request.url.includes('supabase.co') ||
      e.request.url.includes('paystack.co') ||
      e.request.url.includes('termii.com') ||
      e.request.url.includes('wa.me')) {
    return;
  }
  // Cache-first for static assets
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
