const CACHE_NAME = 'epikon-v2'; // Cambiamos a v2 para obligar a actualizarse
const ASSETS = [
  './',
  './index.html',
  './config.js',
  './manifest.json',
  './mascota.png',
  './portada.png',
  './fondo.png',
  './flyer.jpeg',    // Asegúrate de que este archivo exista con este nombre
  './favicon.png',   // Importante si lo tienes
  './kote.jpg',
  './oso.jpg',
  './waren.jpg',
  './hana.jpg',
  './yukito.webp'
];

// Instalación
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching files');
      return cache.addAll(ASSETS);
    })
  );
});

// Activación y limpieza
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Estrategia: Cache First, falling back to Network (Ideal para imágenes estáticas)
self.addEventListener('fetch', (e) => {
  // Solo interceptamos peticiones http/https (evita errores con chrome-extension://)
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    caches.match(e.request).then((response) => {
      // Si está en caché, lo devuelve. Si no, lo busca en internet.
      return response || fetch(e.request).catch(() => {
          // Opcional: Si falla todo (sin internet), podrías retornar una imagen placeholder aquí
      });
    })
  );
});