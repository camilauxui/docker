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
                '/banner_mobile.jpg',   
                '/urgencia_icono.jpg',  
                '/especialidades_icono.jpg',   
                '/team'  
            ]);  
        })  
    );  
    self.skipWaiting(); // Activa el nuevo Service Worker inmediatamente  
});  

self.addEventListener('fetch', (event) => {  
    const url = new URL(event.request.url);  

    event.respondWith(  
        caches.match(event.request).then(cachedResponse => {  
            // Devuelve la respuesta caché si existe o realiza una nueva solicitud  
            return cachedResponse || fetch(event.request).then(response => {  
                // Verifica la respuesta antes de almacenarla en caché  
                if (!response || response.status !== 200 || response.type !== 'basic') {  
                    return response;  
                }  
                const responseToCache = response.clone();  
                caches.open('my-cache').then(cache => {  
                    cache.put(event.request, responseToCache);  
                });  
                return response;  
            });  
        }).catch(() => {  
            // Si hay un error en la red, puedes manejarlo aquí  
            console.warn('Error al recuperar los recursos y no se encontró caché');  
            // No retornamos nada en caso de error, por lo que el usuario verá un mensaje de error en la consola  
        })  
    );  
});