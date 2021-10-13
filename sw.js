const CACHE_NAME = "cache-v1"
const CACHE_STATIC_NAME = "static-v1"
const CACHE_DYNAMIC_NAME = "dynamic-v1"
const CACHE_INMUTABLE_NAME = "inmutable-v1"

const cleanCache = (cacheName, cacheSize) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    console.log(keys)
                    if (keys.length >= cacheSize) {
                        cache.delete(keys[0])
                            .then(() => {
                                cleanCache(cacheName, cacheSize)
                            })
                    }
                })
        });
}

self.addEventListener("install", (event) => {
    console.log("SW instalado")
        //Crear y guardar en el APPSHEEL
    const cachePromise = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/css/page.css",
                "/img/inicio.jpg",
                "js/app.js"
            ]);
        })

    const cacheInmutableProm = caches.open(CACHE_INMUTABLE_NAME)
        .then(cacheInmutable => {
            return cacheInmutable.addAll([
                "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
            ])
        })
    event.waitUntil(Promise.all([cachePromise, cacheInmutableProm]));
});

self.addEventListener("fetch", (event) => {

    //2.- Cache with network fallback
    //Primero busca en cache y si no lo encuentra va a la red
    const request = caches.match(event.request)
        .then(resp => {
            if (resp) {
                return resp
            }
            console.log("No esta en cache", event.request.url);
            return fetch(event.request)
                .then(respNet => {
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(cache => {
                            cache.put(event.request, respNet)
                                .then(() => {
                                    cleanCache(CACHE_DYNAMIC_NAME, 5)

                                });
                        })
                    return respNet.clone()
                })
        })

    event.respondWith(request)

    // 1.- Only cache
    // event.respondWith(caches.match(event.request));
});