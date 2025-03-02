self.addEventListener('install', (event) => {  
    event.waitUntil(  
        caches.open('my-cache').then((cache) => {  
            return cache.addAll([  // archivos a cachear
                '/',  
                '/index.html',  
                '/style.css',  
                '/main.js',  
                '/icon-192.png',  
                '/icon-512.png',  
                
            ]);  
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
            });  
        })  
    );  
});