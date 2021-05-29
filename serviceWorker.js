const staticAgreement = "pwa-biolerplate-v1";

const assets = [
    "/",
    "/index.html",
    "/js/main.js",
    "/css/main.css",
    "/img/anna-sklepikarz.jpg",
    "/img/iwona-kwiaciarka.jpg",
    "/img/karolina-lekarz.jpg",
    "/img/krzysztof-piekarz.jpg",
    "/img/maciej-masarz.jpg",
    "/img/marta-weterynarz.jpg",
    "/img/michal-mechanik.jpg",
    "/img/patrycja-kucharz.jpg",
    "/img/piotr-budowlaniec.jpg",
    "/img/szymon-programista.jpg",
    "/img/header.jpg",
    "/upokorzeni.jpg",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
    "/apple-touch-icon.png",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/mstile-70x70.png",
    "/mstile-144x144.png",
    "/mstile-150x150.png",
    "/mstile-310x150.png",
    "/mstile-310x310.png",
    "/safari-pinned-tab.svg",
    "/favicon.ico",
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticAgreement).then(cache => {
            cache.addAll(assets)
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            console.warn("Serving cached assets.");
            return res || fetch(fetchEvent.request)
        })
    )
});

self.addEventListener('push', function(e) {
    var body;

    if (e.data) {
        body = e.data.text();
    } else {
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {action: 'explore', title: 'Explore this new world'},
            {action: 'close', title: 'I don\'t want any of this'},
        ]
    };
    e.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});