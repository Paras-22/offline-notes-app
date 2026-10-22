// This is my Service Worker. It caches the static files so the app works offline.

const CACHE_NAME = 'notes-app-v1'

// These are the main static files I cache when the service worker installs
const STATIC_FILES = ['/', '/index.html', '/manifest.json', '/vite.svg']

// Install step - here I did the caching of the static files
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_FILES)))
  self.skipWaiting()
})

// Activate step - here I delete old caches if the cache name changes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  )
  self.clients.claim()
})

// Fetch step - I try the network first and save a copy in the cache.
// If there is no internet, I return the file from the cache instead.
// This way the Vite build files (JS/CSS with hashed names) also get cached.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
        return response
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match('/index.html'))
      )
  )
})
