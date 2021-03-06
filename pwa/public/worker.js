var CACHE_NAME = "pwa";
var urlsToCache = ["/", "/completed"];

// Install a service worker
self.addEventListener("install", event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache ");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", event => {
  console.log("come here");
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener("activate", event => {
  var cacheWhitelist = ["pwa"];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



self.addEventListener('sync', function (event) {
  console.log('now online')
  if (event.tag === 'sendFormData') { // event.tag name checked
    // here must be the same as the one used while registering
    // sync
   console.log('online')
  }else{
    console.log('off')
  }
})
