(()=>{var u=e=>{self.clients.matchAll().then(function(t){if(t)for(let n of t)n.postMessage(e)})},c=u;var w=()=>{self.addEventListener("error",m,!0),self.addEventListener("unhandledrejection",g,!0)},m=e=>{l(e.type,e.error.stack)},g=e=>{l(e.type,e.reason.stack)},l=(e,t)=>{c({type:"PANIC",panic:{type:e,stack:t}})};w();var f=!1,a,i,y=async(e,t={})=>{a=e,i=t,self.skipWaiting(),self.addEventListener("install",E),self.addEventListener("activate",A),self.addEventListener("fetch",C)},h=()=>self.location.href.replace(/\/[^/]*$/,""),E=e=>{self.skipWaiting(),e.waitUntil((async()=>{let t=await caches.open(a),n=h(),o=[],{cachedPaths:s=[]}=i;for(let r of s)o.push(n+r);await t.addAll(o)})())},A=e=>{e.waitUntil((async()=>{let t=await caches.keys();await Promise.all(t.map(n=>{if(n!==a)return caches.delete(n)})),await self.clients.claim(),c({type:"ACTIVATED",version:a})})())},C=e=>{if(f)return;let{url:t,mode:n}=e.request,{ignoredFetches:o=[]}=i;for(let r of o)if(t.includes(r))return;let s;n==="navigate"?s=k():s=T(t),e.respondWith(s)},k=async()=>{let e=h(),t=await caches.match(e+"/"),n=await P(e+"/");if(n){if(t){let o=await t.clone().text(),s=await n.clone().text();o!==s&&(f=!0,await self.registration.unregister())}return n}else return t},P=async e=>{try{return await fetch(e)}catch{}},T=async e=>await caches.match(e)||new Response(null,{status:404}),d=y;var p=["/","/index.html","/js/main-PusMTUfT.js","/manifest.json","/meta/192.png","/meta/512.png","/meta/apple-splash-1080-2340.png","/meta/destiny-1024.png","/meta/destiny.png","/meta/destiny.svg","/meta/dot.png"],v=["googleapis","google","dot.png"],R=async()=>{let e=JSON.stringify(p);await d(e,{cachedPaths:p,ignoredFetches:v})};R();})();
