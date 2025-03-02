self.addEventListener('install', (event) => {  
    event.waitUntil(  
        caches.open('my-cache').then((cache) => {  
            return cache.addAll([  // Archivos a cachear  
                '/',  
                '/index.html',  
                '/style.css',  
                '/main.js',  
                '/icon-192.png',  
                '/icon-512.png',  
                '/doc1.jpg',
                '/doc2.jpg',
                '/dra1.jpg', 
                '/dra2.jpg', 
                '/banner_desk.jpg',
                '/urgencia_icono.jpg',
                '/especialidades_icono.jpg', 

                '/team',  
            ]);  
        })  
    );  
});  

self.addEventListener('activate', (event) => {  
    // Elimina cachés antiguas si es necesario  
    const cacheWhitelist = ['my-cache'];  
    event.waitUntil(  
        caches.keys().then((cacheNames) => {  
            return Promise.all(  
                cacheNames.map((cacheName) => {  
                    // Elimina cachés que no están en la lista blanca  
                    if (cacheWhitelist.indexOf(cacheName) === -1) {  
                        return caches.delete(cacheName);  
                    }  
                })  
            );  
        })  
    );  
});  

self.addEventListener('fetch', (event) => {  
    event.respondWith(  
        caches.match(event.request).then((cachedResponse) => {  
            // Si hay una respuesta en caché, devuélvela  
            if (cachedResponse) {  
                return cachedResponse;  
            }  

            // Realiza la solicitud de red  
            return fetch(event.request).then((response) => {  
                // Solo almacenar en caché si la respuesta es válida  
                if (response && response.status === 200 && response.type === 'basic') {  
                    const responseToCache = response.clone();  
                    caches.open('my-cache').then((cache) => {  
                        cache.put(event.request, responseToCache);  
                    });  
                }  

                // Devuelve la respuesta original  
                return response;  
            }).catch((error) => {  
                console.error('Fetching failed:', error);  
                // Aquí podrías devolver una página offline si lo deseas  
                // return caches.match('/offline.html'); // Ejemplo de manejo de error  
            });  
        })  
    );  
});