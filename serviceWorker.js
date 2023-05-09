const staticShoppingCart = "Shopping-Cart-v1" //Cache - staticShoppingCart
const assets = [
  "/",
  "/index.html",
  "/index.js",
  "/style.css",
  "/assets/cat.png",
]

self.addEventListener("install", installEvent =>{
  installEvent.waitUntil (
    caches.open(staticShoppingCart).then(cache =>{
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})