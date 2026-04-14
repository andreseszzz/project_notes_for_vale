const CACHE_NAME = 'notas-corazon-v4'
const APP_SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './pwa-192x192.svg',
  './pwa-512x512.svg',
  './heart.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL_ASSETS)
    }),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheKeys) => {
      return Promise.all(
        cacheKeys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      )
    }),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request

  if (request.method !== 'GET') {
    return
  }

  if (new URL(request.url).origin !== self.location.origin) {
    return
  }

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        const responseToCache = networkResponse.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache)
        })
        return networkResponse
      })
      .catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('./index.html')
        }

        return caches.match(request)
      }),
  )
})
