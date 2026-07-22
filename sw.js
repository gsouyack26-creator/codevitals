const CACHE='codevitals-v1';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).catch(function(){}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
function isDoc(req){return req.mode==='navigate'||(req.destination==='document')||/\/(index\.html)?$/.test(new URL(req.url).pathname);}
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  if(isDoc(e.request)){
    // network-first so fresh content reaches returning users; fall back to cache offline
    e.respondWith(fetch(e.request).then(function(res){
      if(res&&res.ok){var cp=res.clone();caches.open(CACHE).then(function(c){c.put('./index.html',cp);});}
      return res;
    }).catch(function(){return caches.match('./index.html').then(function(h){return h||caches.match('./');});}));
    return;
  }
  // static assets: cache-first with background fill
  e.respondWith(caches.match(e.request).then(function(hit){
    return hit||fetch(e.request).then(function(res){
      if(res&&res.ok&&res.type==='basic'){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp);});}
      return res;
    }).catch(function(){});
  }));
});
