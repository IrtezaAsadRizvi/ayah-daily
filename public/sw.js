/* Ayah Daily service worker — conservative offline support for a static export site. */
const CACHE = "ayah-daily-v1";
const OFFLINE_URL = "/en";

// Cache-first for content-hashed/immutable assets.
function isStaticAsset(url) {
  if (url.pathname.startsWith("/_next/static/")) return true;
  return /\.(?:js|css|woff2?|ttf|otf|eot|png|jpe?g|gif|svg|webp|avif|ico)$/i.test(
    url.pathname
  );
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET; let everything else hit the network untouched.
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never cache cross-origin requests (Quran API, audio, analytics, fonts CDN).
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first so fresh deploys show up; fall back to cache,
  // then to the cached offline shell.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch (err) {
          const cached = await caches.match(request);
          if (cached) return cached;
          const shell = await caches.match(OFFLINE_URL);
          if (shell) return shell;
          throw err;
        }
      })()
    );
    return;
  }

  // Static immutable assets: cache-first.
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE);
          cache.put(request, fresh.clone());
        }
        return fresh;
      })()
    );
  }
  // Anything else (same-origin non-asset GET): default network handling.
});
