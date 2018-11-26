const CACHE ='mz'
const FILES = ['/ileriProgramming/','/ileriProgramming/CW3/inspector.html','/ileriProgramming/CW7/CW7.html',
'/ileriProgramming/CW2/ArrayDemo_m.zahidunal.html','/ileriProgramming/HW3/animation.html','/ileriProgramming/CW4/index.html',
'/ileriProgramming/CW5/readFile.html','/ileriProgramming/CW6/Timing.html','/ileriProgramming/HW1/HW1Array.html'
,'/ileriProgramming/HW2/Database.html'];


function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)

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
  console.log('JS', req.url);
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)