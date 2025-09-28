const CACHE_NAME = 'amvverse-cache-v1';
const ASSETS = [
    '/',
    'https://amvverse-image-data.pages.dev/#',
    '/index.html',
    '/main.html',
    '/upload.html',
    '/offline.html',
    '/install.js',
    '/manifest.json',
    '/sw.js',
    '/style.css',
    '/script.js',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// Install: cache core assets
self.addEventListener('install', event => {
    self.skipWaiting(); // optional: make the new worker take control faster
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
    clients.claim();
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
});

// Fetch: navigation => network-first with offline fallback; others => cache-first
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    if (event.request.mode === 'navigate') {
        // Try network, fallback to cache offline page
        event.respondWith(
            fetch(event.request).then(resp => {
                return resp;
            }).catch(() => caches.match('/offline.html'))
        );
        return;
    }

    // For other requests, try cache first then network
    event.respondWith(
        caches.match(event.request).then(cached => cached || fetch(event.request))
    );
});

// Listen for skip-waiting messages from the page
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Optional: show basic push notification handler (push functionality requires extra setup)
self.addEventListener('push', event => {
    const payload = event.data ? event.data.json() : { title: 'AMVVerse', body: 'New content available' };
    event.waitUntil(
        self.registration.showNotification(payload.title, {
            body: payload.body,
            icon: '/icons/icon-192.png',
            badge: '/icons/icon-192.png'
        })
    );

});



