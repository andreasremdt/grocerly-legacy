const CACHE_NAME = "grocerly";

const FILE_CACHE = [
  "/index.html",
  "/css/components/grocery-form.css",
  "/css/components/grocery-list.css",
  "/css/components/page-header.css",
  "/css/elements/button.css",
  "/css/elements/input.css",
  "/css/global.css",
  "/js/app.js"
];

self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(FILE_CACHE);
    })
  );
});

self.addEventListener("fetch", function(evt) {
  evt.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(evt.request).then(function(response) {
        return (
          response ||
          fetch(evt.request).then(function(response) {
            cache.put(evt.request, response.clone());
            return response;
          })
        );
      });
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});