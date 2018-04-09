self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open("offline")
        .then(cache => cache.addAll([
            '/',
            '/index.html',
            '/index.js',
            '/src/App.js',
            '/src/components/Maps.js',
            '/sw.js',
            '/build/bundle.js',
            '/node_modules/sockjs/index.js',
            "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        ]))
    )
})

self.addEventListener('fetch', event =>{
    event.respondWith(caches.match(event.request)
    .then(response => response || fetch(event.request))
    .catch(error =>{
        console.log(error)
    })
)
})