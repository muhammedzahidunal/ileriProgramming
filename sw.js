const CACHE ='JS'
const FILES = ['/ileriPrograming/','/ileriPrograming/data_analiseCW3/inspector.html','/ileriPrograming/CW7/CW7.html',
'/ileriPrograming/ArrayDemo_m.zahidunal.html','/ileriPrograming/HW3/animation.html','/ileriProgramming/CW4',
'/ileriProgramming/CW5/readFile.html','/ileriProgramming/CW6/Timing.html','/ileriProgramming/HW1Array.html'
,'/ileriProgramming/HW2/Database.html']
function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)

function cacheCB(e) { //cache first
  let req = e.request
  e.respondWith(
    caches.match(req)
    .then(r1 => r1 || fetch(req))
    .catch(console.log)
  )
}
self.addEventListener('fetch', cacheCB)

function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  }) 
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)