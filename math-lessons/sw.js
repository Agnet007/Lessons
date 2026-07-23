const CACHE="math-lessons-v5";
const ASSETS=["./", "./index.html", "./lesson.html", "./css/app.css", "./js/app.js", "./js/tasks.js", "./js/demos.js", "./js/bootstrap.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./lessons/01-linear.json", "./lessons/02-motion.json", "./lessons/03-perimeter.json", "./lessons/04-area.json", "./lessons/05-volume.json", "./lessons/06-quadratic.json", "./lessons/07-acceleration.json", "./lessons/08-density.json", "./lessons/09-sum.json", "./lessons/10-product.json", "./lessons/11-composition.json", "./lessons/12-modeling.json", "./lessons/13-analysis.json", "./lessons/14-rate.json", "./lessons/15-derivative.json", "./lessons/catalog.json"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    const copy=response.clone(); caches.open(CACHE).then(cache=>cache.put(event.request,copy)); return response;
  }).catch(()=>caches.match('./index.html'))));
});
