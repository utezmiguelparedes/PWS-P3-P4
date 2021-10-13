if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/sw.js");
}

// if (window.caches) {
//     console.log("Tenemos cache")

//     caches.open("Prueba")
//     caches.open("Prueba-v2")

//     caches.has("Prueba")
//         .then((response) => {
//             console.log(response)
//         })
//         .catch(() => {

//         });
//     caches.open("cache-v1")
//         .then(async(cache) => {
//             // cache.add("/index.html");

//             await cache.addAll([
//                 "/index.html",
//                 "/css/page.css",
//                 "/img/inicio.jpg",
//                 "https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
//             ]);

//             // await cache.put("index.html", new Response("Actualizado desde cache"));

//             await cache.match("index.html")
//                 .then((res) => {
//                     res.text()
//                         .then((text) => {
//                             console.log(text);
//                         });
//                     console.log(res);
//                 });

//             await caches.keys()
//                 .then((keys) => {
//                     console.log(keys);
//                 })
//         })
// }