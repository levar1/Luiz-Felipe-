const CACHE_NAME = 'null-cats-lf-v1';
const urlsToCache = [
  '/',
  '/Luiz-Felipe-/',
  '/Luiz-Felipe-/index.html',
  '/Luiz-Felipe-/feedback.html',
  '/Luiz-Felipe-/style.css',
  '/Luiz-Felipe-/script.js',
  '/Luiz-Felipe-/manifest.json',
  'https://i.postimg.cc/5y5y5y5y/logo-512.png',
  'https://i.postimg.cc/0jQjQjQj/logo-192.png',
  'https://i.postimg.cc/yYdgHF50/direct/IMG-20251216-WA0038.jpg',
  'https://i.postimg.cc/yYkd573z/direct/IMG-20251216-WA0039.jpg',
  'https://i.postimg.cc/PrPxcdvn/direct/IMG-20251216-WA0041.jpg',
  'https://i.postimg.cc/zDPDT4tk/direct/IMG-20251216-WA0042.jpg',
  'https://i.postimg.cc/wT7vP9RH/direct/IMG-20251216-WA0040.jpg',
  'https://i.postimg.cc/5N60GfQJ/direct/IMG-20251216-WA0043.jpg',
  'https://i.postimg.cc/bNDygL4z/direct/IMG-20251216-WA0044.jpg',
  'https://i.postimg.cc/v8S85Cqq/direct/IMG-20251216-WA0045.jpg',
  'https://i.postimg.cc/gkCYT8Pc/direct/IMG-20251216-WA0048.jpg',
  'https://i.postimg.cc/5NY4gpDf/direct/IMG-20251216-WA0046.jpg',
  'https://i.postimg.cc/8P210MVr/direct/IMG-20251216-WA0047.jpg',
  'https://i.postimg.cc/3x2K5NKF/direct/IMG-20251216-WA0049.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
