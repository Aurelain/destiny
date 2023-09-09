(()=>{var bt=Object.create;var Xe=Object.defineProperty;var Et=Object.getOwnPropertyDescriptor;var wt=Object.getOwnPropertyNames;var St=Object.getPrototypeOf,It=Object.prototype.hasOwnProperty;var ae=(c=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(c,{get:(v,_)=>(typeof require<"u"?require:v)[_]}):c)(function(c){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+c+'" is not supported')});var Nt=(c,v)=>()=>(v||c((v={exports:{}}).exports,v),v.exports);var Tt=(c,v,_,T)=>{if(v&&typeof v=="object"||typeof v=="function")for(let w of wt(v))!It.call(c,w)&&w!==_&&Xe(c,w,{get:()=>v[w],enumerable:!(T=Et(v,w))||T.enumerable});return c};var ie=(c,v,_)=>(_=c!=null?bt(St(c)):{},Tt(v||!c||!c.__esModule?Xe(_,"default",{value:c,enumerable:!0}):_,c));var re=Nt((cr,Ae)=>{(function(c){if(typeof cr=="object"&&typeof Ae<"u")Ae.exports=c();else if(typeof define=="function"&&define.amd)define([],c);else{var v;typeof window<"u"?v=window:typeof global<"u"?v=global:typeof self<"u"?v=self:v=this,v.localforage=c()}})(function(){var c,v,_;return function T(w,$,R){function C(B,z){if(!$[B]){if(!w[B]){var h=typeof ae=="function"&&ae;if(!z&&h)return h(B,!0);if(I)return I(B,!0);var p=new Error("Cannot find module '"+B+"'");throw p.code="MODULE_NOT_FOUND",p}var x=$[B]={exports:{}};w[B][0].call(x.exports,function(O){var G=w[B][1][O];return C(G||O)},x,x.exports,T,w,$,R)}return $[B].exports}for(var I=typeof ae=="function"&&ae,F=0;F<R.length;F++)C(R[F]);return C}({1:[function(T,w,$){(function(R){"use strict";var C=R.MutationObserver||R.WebKitMutationObserver,I;if(C){var F=0,B=new C(O),z=R.document.createTextNode("");B.observe(z,{characterData:!0}),I=function(){z.data=F=++F%2}}else if(!R.setImmediate&&typeof R.MessageChannel<"u"){var h=new R.MessageChannel;h.port1.onmessage=O,I=function(){h.port2.postMessage(0)}}else"document"in R&&"onreadystatechange"in R.document.createElement("script")?I=function(){var L=R.document.createElement("script");L.onreadystatechange=function(){O(),L.onreadystatechange=null,L.parentNode.removeChild(L),L=null},R.document.documentElement.appendChild(L)}:I=function(){setTimeout(O,0)};var p,x=[];function O(){p=!0;for(var L,K,P=x.length;P;){for(K=x,x=[],L=-1;++L<P;)K[L]();P=x.length}p=!1}w.exports=G;function G(L){x.push(L)===1&&!p&&I()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],2:[function(T,w,$){"use strict";var R=T(1);function C(){}var I={},F=["REJECTED"],B=["FULFILLED"],z=["PENDING"];w.exports=h;function h(d){if(typeof d!="function")throw new TypeError("resolver must be a function");this.state=z,this.queue=[],this.outcome=void 0,d!==C&&G(this,d)}h.prototype.catch=function(d){return this.then(null,d)},h.prototype.then=function(d,b){if(typeof d!="function"&&this.state===B||typeof b!="function"&&this.state===F)return this;var g=new this.constructor(C);if(this.state!==z){var N=this.state===B?d:b;x(g,N,this.outcome)}else this.queue.push(new p(g,d,b));return g};function p(d,b,g){this.promise=d,typeof b=="function"&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),typeof g=="function"&&(this.onRejected=g,this.callRejected=this.otherCallRejected)}p.prototype.callFulfilled=function(d){I.resolve(this.promise,d)},p.prototype.otherCallFulfilled=function(d){x(this.promise,this.onFulfilled,d)},p.prototype.callRejected=function(d){I.reject(this.promise,d)},p.prototype.otherCallRejected=function(d){x(this.promise,this.onRejected,d)};function x(d,b,g){R(function(){var N;try{N=b(g)}catch(U){return I.reject(d,U)}N===d?I.reject(d,new TypeError("Cannot resolve promise with itself")):I.resolve(d,N)})}I.resolve=function(d,b){var g=L(O,b);if(g.status==="error")return I.reject(d,g.value);var N=g.value;if(N)G(d,N);else{d.state=B,d.outcome=b;for(var U=-1,Y=d.queue.length;++U<Y;)d.queue[U].callFulfilled(b)}return d},I.reject=function(d,b){d.state=F,d.outcome=b;for(var g=-1,N=d.queue.length;++g<N;)d.queue[g].callRejected(b);return d};function O(d){var b=d&&d.then;if(d&&(typeof d=="object"||typeof d=="function")&&typeof b=="function")return function(){b.apply(d,arguments)}}function G(d,b){var g=!1;function N(V){g||(g=!0,I.reject(d,V))}function U(V){g||(g=!0,I.resolve(d,V))}function Y(){b(U,N)}var M=L(Y);M.status==="error"&&N(M.value)}function L(d,b){var g={};try{g.value=d(b),g.status="success"}catch(N){g.status="error",g.value=N}return g}h.resolve=K;function K(d){return d instanceof this?d:I.resolve(new this(C),d)}h.reject=P;function P(d){var b=new this(C);return I.reject(b,d)}h.all=pe;function pe(d){var b=this;if(Object.prototype.toString.call(d)!=="[object Array]")return this.reject(new TypeError("must be an array"));var g=d.length,N=!1;if(!g)return this.resolve([]);for(var U=new Array(g),Y=0,M=-1,V=new this(C);++M<g;)j(d[M],M);return V;function j(te,fe){b.resolve(te).then(ye,function(q){N||(N=!0,I.reject(V,q))});function ye(q){U[fe]=q,++Y===g&&!N&&(N=!0,I.resolve(V,U))}}}h.race=X;function X(d){var b=this;if(Object.prototype.toString.call(d)!=="[object Array]")return this.reject(new TypeError("must be an array"));var g=d.length,N=!1;if(!g)return this.resolve([]);for(var U=-1,Y=new this(C);++U<g;)M(d[U]);return Y;function M(V){b.resolve(V).then(function(j){N||(N=!0,I.resolve(Y,j))},function(j){N||(N=!0,I.reject(Y,j))})}}},{1:1}],3:[function(T,w,$){(function(R){"use strict";typeof R.Promise!="function"&&(R.Promise=T(2))}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{2:2}],4:[function(T,w,$){"use strict";var R=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function C(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function I(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch{return}}var F=I();function B(){try{if(!F||!F.open)return!1;var e=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!e||t)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch{return!1}}function z(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(n){if(n.name!=="TypeError")throw n;for(var r=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,o=new r,a=0;a<e.length;a+=1)o.append(e[a]);return o.getBlob(t.type)}}typeof Promise>"u"&&T(3);var h=Promise;function p(e,t){t&&e.then(function(r){t(null,r)},function(r){t(r)})}function x(e,t,r){typeof t=="function"&&e.then(t),typeof r=="function"&&e.catch(r)}function O(e){return typeof e!="string"&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function G(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}var L="local-forage-detect-blob-support",K=void 0,P={},pe=Object.prototype.toString,X="readonly",d="readwrite";function b(e){for(var t=e.length,r=new ArrayBuffer(t),o=new Uint8Array(r),a=0;a<t;a++)o[a]=e.charCodeAt(a);return r}function g(e){return new h(function(t){var r=e.transaction(L,d),o=z([""]);r.objectStore(L).put(o,"key"),r.onabort=function(a){a.preventDefault(),a.stopPropagation(),t(!1)},r.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);t(n||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function N(e){return typeof K=="boolean"?h.resolve(K):g(e).then(function(t){return K=t,K})}function U(e){var t=P[e.name],r={};r.promise=new h(function(o,a){r.resolve=o,r.reject=a}),t.deferredOperations.push(r),t.dbReady?t.dbReady=t.dbReady.then(function(){return r.promise}):t.dbReady=r.promise}function Y(e){var t=P[e.name],r=t.deferredOperations.pop();if(r)return r.resolve(),r.promise}function M(e,t){var r=P[e.name],o=r.deferredOperations.pop();if(o)return o.reject(t),o.promise}function V(e,t){return new h(function(r,o){if(P[e.name]=P[e.name]||Oe(),e.db)if(t)U(e),e.db.close();else return r(e.db);var a=[e.name];t&&a.push(e.version);var n=F.open.apply(F,a);t&&(n.onupgradeneeded=function(i){var f=n.result;try{f.createObjectStore(e.storeName),i.oldVersion<=1&&f.createObjectStore(L)}catch(s){if(s.name==="ConstraintError")console.warn('The database "'+e.name+'" has been upgraded from version '+i.oldVersion+" to version "+i.newVersion+', but the storage "'+e.storeName+'" already exists.');else throw s}}),n.onerror=function(i){i.preventDefault(),o(n.error)},n.onsuccess=function(){var i=n.result;i.onversionchange=function(f){f.target.close()},r(i),Y(e)}})}function j(e){return V(e,!1)}function te(e){return V(e,!0)}function fe(e,t){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),o=e.version<e.db.version,a=e.version>e.db.version;if(o&&(e.version!==t&&console.warn('The database "'+e.name+`" can't be downgraded from version `+e.db.version+" to version "+e.version+"."),e.version=e.db.version),a||r){if(r){var n=e.db.version+1;n>e.version&&(e.version=n)}return!0}return!1}function ye(e){return new h(function(t,r){var o=new FileReader;o.onerror=r,o.onloadend=function(a){var n=btoa(a.target.result||"");t({__local_forage_encoded_blob:!0,data:n,type:e.type})},o.readAsBinaryString(e)})}function q(e){var t=b(atob(e.data));return z([t],{type:e.type})}function De(e){return e&&e.__local_forage_encoded_blob}function Er(e){var t=this,r=t._initReady().then(function(){var o=P[t._dbInfo.name];if(o&&o.dbReady)return o.dbReady});return x(r,e,e),r}function wr(e){U(e);for(var t=P[e.name],r=t.forages,o=0;o<r.length;o++){var a=r[o];a._dbInfo.db&&(a._dbInfo.db.close(),a._dbInfo.db=null)}return e.db=null,j(e).then(function(n){return e.db=n,fe(e)?te(e):n}).then(function(n){e.db=t.db=n;for(var i=0;i<r.length;i++)r[i]._dbInfo.db=n}).catch(function(n){throw M(e,n),n})}function H(e,t,r,o){o===void 0&&(o=1);try{var a=e.db.transaction(e.storeName,t);r(null,a)}catch(n){if(o>0&&(!e.db||n.name==="InvalidStateError"||n.name==="NotFoundError"))return h.resolve().then(function(){if(!e.db||n.name==="NotFoundError"&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),te(e)}).then(function(){return wr(e).then(function(){H(e,t,r,o-1)})}).catch(r);r(n)}}function Oe(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function Sr(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=e[o];var a=P[r.name];a||(a=Oe(),P[r.name]=a),a.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=Er);var n=[];function i(){return h.resolve()}for(var f=0;f<a.forages.length;f++){var s=a.forages[f];s!==t&&n.push(s._initReady().catch(i))}var u=a.forages.slice(0);return h.all(n).then(function(){return r.db=a.db,j(r)}).then(function(l){return r.db=l,fe(r,t._defaultConfig.version)?te(r):l}).then(function(l){r.db=a.db=l,t._dbInfo=r;for(var m=0;m<u.length;m++){var y=u[m];y!==t&&(y._dbInfo.db=r.db,y._dbInfo.version=r.version)}})}function Ir(e,t){var r=this;e=O(e);var o=new h(function(a,n){r.ready().then(function(){H(r._dbInfo,X,function(i,f){if(i)return n(i);try{var s=f.objectStore(r._dbInfo.storeName),u=s.get(e);u.onsuccess=function(){var l=u.result;l===void 0&&(l=null),De(l)&&(l=q(l)),a(l)},u.onerror=function(){n(u.error)}}catch(l){n(l)}})}).catch(n)});return p(o,t),o}function Nr(e,t){var r=this,o=new h(function(a,n){r.ready().then(function(){H(r._dbInfo,X,function(i,f){if(i)return n(i);try{var s=f.objectStore(r._dbInfo.storeName),u=s.openCursor(),l=1;u.onsuccess=function(){var m=u.result;if(m){var y=m.value;De(y)&&(y=q(y));var E=e(y,m.key,l++);E!==void 0?a(E):m.continue()}else a()},u.onerror=function(){n(u.error)}}catch(m){n(m)}})}).catch(n)});return p(o,t),o}function Tr(e,t,r){var o=this;e=O(e);var a=new h(function(n,i){var f;o.ready().then(function(){return f=o._dbInfo,pe.call(t)==="[object Blob]"?N(f.db).then(function(s){return s?t:ye(t)}):t}).then(function(s){H(o._dbInfo,d,function(u,l){if(u)return i(u);try{var m=l.objectStore(o._dbInfo.storeName);s===null&&(s=void 0);var y=m.put(s,e);l.oncomplete=function(){s===void 0&&(s=null),n(s)},l.onabort=l.onerror=function(){var E=y.error?y.error:y.transaction.error;i(E)}}catch(E){i(E)}})}).catch(i)});return p(a,r),a}function Rr(e,t){var r=this;e=O(e);var o=new h(function(a,n){r.ready().then(function(){H(r._dbInfo,d,function(i,f){if(i)return n(i);try{var s=f.objectStore(r._dbInfo.storeName),u=s.delete(e);f.oncomplete=function(){a()},f.onerror=function(){n(u.error)},f.onabort=function(){var l=u.error?u.error:u.transaction.error;n(l)}}catch(l){n(l)}})}).catch(n)});return p(o,t),o}function Ar(e){var t=this,r=new h(function(o,a){t.ready().then(function(){H(t._dbInfo,d,function(n,i){if(n)return a(n);try{var f=i.objectStore(t._dbInfo.storeName),s=f.clear();i.oncomplete=function(){o()},i.onabort=i.onerror=function(){var u=s.error?s.error:s.transaction.error;a(u)}}catch(u){a(u)}})}).catch(a)});return p(r,e),r}function xr(e){var t=this,r=new h(function(o,a){t.ready().then(function(){H(t._dbInfo,X,function(n,i){if(n)return a(n);try{var f=i.objectStore(t._dbInfo.storeName),s=f.count();s.onsuccess=function(){o(s.result)},s.onerror=function(){a(s.error)}}catch(u){a(u)}})}).catch(a)});return p(r,e),r}function Dr(e,t){var r=this,o=new h(function(a,n){if(e<0){a(null);return}r.ready().then(function(){H(r._dbInfo,X,function(i,f){if(i)return n(i);try{var s=f.objectStore(r._dbInfo.storeName),u=!1,l=s.openKeyCursor();l.onsuccess=function(){var m=l.result;if(!m){a(null);return}e===0||u?a(m.key):(u=!0,m.advance(e))},l.onerror=function(){n(l.error)}}catch(m){n(m)}})}).catch(n)});return p(o,t),o}function Or(e){var t=this,r=new h(function(o,a){t.ready().then(function(){H(t._dbInfo,X,function(n,i){if(n)return a(n);try{var f=i.objectStore(t._dbInfo.storeName),s=f.openKeyCursor(),u=[];s.onsuccess=function(){var l=s.result;if(!l){o(u);return}u.push(l.key),l.continue()},s.onerror=function(){a(s.error)}}catch(l){a(l)}})}).catch(a)});return p(r,e),r}function Lr(e,t){t=G.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;if(!e.name)a=h.reject("Invalid arguments");else{var n=e.name===r.name&&o._dbInfo.db,i=n?h.resolve(o._dbInfo.db):j(e).then(function(f){var s=P[e.name],u=s.forages;s.db=f;for(var l=0;l<u.length;l++)u[l]._dbInfo.db=f;return f});e.storeName?a=i.then(function(f){if(f.objectStoreNames.contains(e.storeName)){var s=f.version+1;U(e);var u=P[e.name],l=u.forages;f.close();for(var m=0;m<l.length;m++){var y=l[m];y._dbInfo.db=null,y._dbInfo.version=s}var E=new h(function(S,D){var A=F.open(e.name,s);A.onerror=function(W){var oe=A.result;oe.close(),D(W)},A.onupgradeneeded=function(){var W=A.result;W.deleteObjectStore(e.storeName)},A.onsuccess=function(){var W=A.result;W.close(),S(W)}});return E.then(function(S){u.db=S;for(var D=0;D<l.length;D++){var A=l[D];A._dbInfo.db=S,Y(A._dbInfo)}}).catch(function(S){throw(M(e,S)||h.resolve()).catch(function(){}),S})}}):a=i.then(function(f){U(e);var s=P[e.name],u=s.forages;f.close();for(var l=0;l<u.length;l++){var m=u[l];m._dbInfo.db=null}var y=new h(function(E,S){var D=F.deleteDatabase(e.name);D.onerror=function(){var A=D.result;A&&A.close(),S(D.error)},D.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},D.onsuccess=function(){var A=D.result;A&&A.close(),E(A)}});return y.then(function(E){s.db=E;for(var S=0;S<u.length;S++){var D=u[S];Y(D._dbInfo)}}).catch(function(E){throw(M(e,E)||h.resolve()).catch(function(){}),E})})}return p(a,t),a}var Cr={_driver:"asyncStorage",_initStorage:Sr,_support:B(),iterate:Nr,getItem:Ir,setItem:Tr,removeItem:Rr,clear:Ar,length:xr,key:Dr,keys:Or,dropInstance:Lr};function Pr(){return typeof openDatabase=="function"}var Q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Br="~~local_forage_type~",Le=/^~~local_forage_type~([^~]+)~/,se="__lfsc__:",ge=se.length,_e="arbf",be="blob",Ce="si08",Pe="ui08",Be="uic8",Ue="si16",Fe="si32",Ye="ur16",ke="ui32",Me="fl32",Ve="fl64",We=ge+_e.length,$e=Object.prototype.toString;function ze(e){var t=e.length*.75,r=e.length,o,a=0,n,i,f,s;e[e.length-1]==="="&&(t--,e[e.length-2]==="="&&t--);var u=new ArrayBuffer(t),l=new Uint8Array(u);for(o=0;o<r;o+=4)n=Q.indexOf(e[o]),i=Q.indexOf(e[o+1]),f=Q.indexOf(e[o+2]),s=Q.indexOf(e[o+3]),l[a++]=n<<2|i>>4,l[a++]=(i&15)<<4|f>>2,l[a++]=(f&3)<<6|s&63;return u}function Ee(e){var t=new Uint8Array(e),r="",o;for(o=0;o<t.length;o+=3)r+=Q[t[o]>>2],r+=Q[(t[o]&3)<<4|t[o+1]>>4],r+=Q[(t[o+1]&15)<<2|t[o+2]>>6],r+=Q[t[o+2]&63];return t.length%3===2?r=r.substring(0,r.length-1)+"=":t.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}function Ur(e,t){var r="";if(e&&(r=$e.call(e)),e&&(r==="[object ArrayBuffer]"||e.buffer&&$e.call(e.buffer)==="[object ArrayBuffer]")){var o,a=se;e instanceof ArrayBuffer?(o=e,a+=_e):(o=e.buffer,r==="[object Int8Array]"?a+=Ce:r==="[object Uint8Array]"?a+=Pe:r==="[object Uint8ClampedArray]"?a+=Be:r==="[object Int16Array]"?a+=Ue:r==="[object Uint16Array]"?a+=Ye:r==="[object Int32Array]"?a+=Fe:r==="[object Uint32Array]"?a+=ke:r==="[object Float32Array]"?a+=Me:r==="[object Float64Array]"?a+=Ve:t(new Error("Failed to get type for BinaryArray"))),t(a+Ee(o))}else if(r==="[object Blob]"){var n=new FileReader;n.onload=function(){var i=Br+e.type+"~"+Ee(this.result);t(se+be+i)},n.readAsArrayBuffer(e)}else try{t(JSON.stringify(e))}catch(i){console.error("Couldn't convert value into a JSON string: ",e),t(null,i)}}function Fr(e){if(e.substring(0,ge)!==se)return JSON.parse(e);var t=e.substring(We),r=e.substring(ge,We),o;if(r===be&&Le.test(t)){var a=t.match(Le);o=a[1],t=t.substring(a[0].length)}var n=ze(t);switch(r){case _e:return n;case be:return z([n],{type:o});case Ce:return new Int8Array(n);case Pe:return new Uint8Array(n);case Be:return new Uint8ClampedArray(n);case Ue:return new Int16Array(n);case Ye:return new Uint16Array(n);case Fe:return new Int32Array(n);case ke:return new Uint32Array(n);case Me:return new Float32Array(n);case Ve:return new Float64Array(n);default:throw new Error("Unkown type: "+r)}}var we={serialize:Ur,deserialize:Fr,stringToBuffer:ze,bufferToString:Ee};function Ge(e,t,r,o){e.executeSql("CREATE TABLE IF NOT EXISTS "+t.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],r,o)}function Yr(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=typeof e[o]!="string"?e[o].toString():e[o];var a=new h(function(n,i){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(f){return i(f)}r.db.transaction(function(f){Ge(f,r,function(){t._dbInfo=r,n()},function(s,u){i(u)})},i)});return r.serializer=we,a}function J(e,t,r,o,a,n){e.executeSql(r,o,a,function(i,f){f.code===f.SYNTAX_ERR?i.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[t.storeName],function(s,u){u.rows.length?n(s,f):Ge(s,t,function(){s.executeSql(r,o,a,n)},n)},n):n(i,f)},n)}function kr(e,t){var r=this;e=O(e);var o=new h(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){J(f,i,"SELECT * FROM "+i.storeName+" WHERE key = ? LIMIT 1",[e],function(s,u){var l=u.rows.length?u.rows.item(0).value:null;l&&(l=i.serializer.deserialize(l)),a(l)},function(s,u){n(u)})})}).catch(n)});return p(o,t),o}function Mr(e,t){var r=this,o=new h(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){J(f,i,"SELECT * FROM "+i.storeName,[],function(s,u){for(var l=u.rows,m=l.length,y=0;y<m;y++){var E=l.item(y),S=E.value;if(S&&(S=i.serializer.deserialize(S)),S=e(S,E.key,y+1),S!==void 0){a(S);return}}a()},function(s,u){n(u)})})}).catch(n)});return p(o,t),o}function Ke(e,t,r,o){var a=this;e=O(e);var n=new h(function(i,f){a.ready().then(function(){t===void 0&&(t=null);var s=t,u=a._dbInfo;u.serializer.serialize(t,function(l,m){m?f(m):u.db.transaction(function(y){J(y,u,"INSERT OR REPLACE INTO "+u.storeName+" (key, value) VALUES (?, ?)",[e,l],function(){i(s)},function(E,S){f(S)})},function(y){if(y.code===y.QUOTA_ERR){if(o>0){i(Ke.apply(a,[e,s,r,o-1]));return}f(y)}})})}).catch(f)});return p(n,r),n}function Vr(e,t,r){return Ke.apply(this,[e,t,r,1])}function Wr(e,t){var r=this;e=O(e);var o=new h(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){J(f,i,"DELETE FROM "+i.storeName+" WHERE key = ?",[e],function(){a()},function(s,u){n(u)})})}).catch(n)});return p(o,t),o}function $r(e){var t=this,r=new h(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){J(i,n,"DELETE FROM "+n.storeName,[],function(){o()},function(f,s){a(s)})})}).catch(a)});return p(r,e),r}function zr(e){var t=this,r=new h(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){J(i,n,"SELECT COUNT(key) as c FROM "+n.storeName,[],function(f,s){var u=s.rows.item(0).c;o(u)},function(f,s){a(s)})})}).catch(a)});return p(r,e),r}function Gr(e,t){var r=this,o=new h(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){J(f,i,"SELECT key FROM "+i.storeName+" WHERE id = ? LIMIT 1",[e+1],function(s,u){var l=u.rows.length?u.rows.item(0).key:null;a(l)},function(s,u){n(u)})})}).catch(n)});return p(o,t),o}function Kr(e){var t=this,r=new h(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){J(i,n,"SELECT key FROM "+n.storeName,[],function(f,s){for(var u=[],l=0;l<s.rows.length;l++)u.push(s.rows.item(l).key);o(u)},function(f,s){a(s)})})}).catch(a)});return p(r,e),r}function jr(e){return new h(function(t,r){e.transaction(function(o){o.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(a,n){for(var i=[],f=0;f<n.rows.length;f++)i.push(n.rows.item(f).name);t({db:e,storeNames:i})},function(a,n){r(n)})},function(o){r(o)})})}function Hr(e,t){t=G.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;return e.name?a=new h(function(n){var i;e.name===r.name?i=o._dbInfo.db:i=openDatabase(e.name,"","",0),e.storeName?n({db:i,storeNames:[e.storeName]}):n(jr(i))}).then(function(n){return new h(function(i,f){n.db.transaction(function(s){function u(E){return new h(function(S,D){s.executeSql("DROP TABLE IF EXISTS "+E,[],function(){S()},function(A,W){D(W)})})}for(var l=[],m=0,y=n.storeNames.length;m<y;m++)l.push(u(n.storeNames[m]));h.all(l).then(function(){i()}).catch(function(E){f(E)})},function(s){f(s)})})}):a=h.reject("Invalid arguments"),p(a,t),a}var Qr={_driver:"webSQLStorage",_initStorage:Yr,_support:Pr(),iterate:Mr,getItem:kr,setItem:Vr,removeItem:Wr,clear:$r,length:zr,key:Gr,keys:Kr,dropInstance:Hr};function Jr(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch{return!1}}function je(e,t){var r=e.name+"/";return e.storeName!==t.storeName&&(r+=e.storeName+"/"),r}function Xr(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch{return!0}}function Zr(){return!Xr()||localStorage.length>0}function qr(e){var t=this,r={};if(e)for(var o in e)r[o]=e[o];return r.keyPrefix=je(e,t._defaultConfig),Zr()?(t._dbInfo=r,r.serializer=we,h.resolve()):h.reject()}function et(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo.keyPrefix,a=localStorage.length-1;a>=0;a--){var n=localStorage.key(a);n.indexOf(o)===0&&localStorage.removeItem(n)}});return p(r,e),r}function rt(e,t){var r=this;e=O(e);var o=r.ready().then(function(){var a=r._dbInfo,n=localStorage.getItem(a.keyPrefix+e);return n&&(n=a.serializer.deserialize(n)),n});return p(o,t),o}function tt(e,t){var r=this,o=r.ready().then(function(){for(var a=r._dbInfo,n=a.keyPrefix,i=n.length,f=localStorage.length,s=1,u=0;u<f;u++){var l=localStorage.key(u);if(l.indexOf(n)===0){var m=localStorage.getItem(l);if(m&&(m=a.serializer.deserialize(m)),m=e(m,l.substring(i),s++),m!==void 0)return m}}});return p(o,t),o}function nt(e,t){var r=this,o=r.ready().then(function(){var a=r._dbInfo,n;try{n=localStorage.key(e)}catch{n=null}return n&&(n=n.substring(a.keyPrefix.length)),n});return p(o,t),o}function ot(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo,a=localStorage.length,n=[],i=0;i<a;i++){var f=localStorage.key(i);f.indexOf(o.keyPrefix)===0&&n.push(f.substring(o.keyPrefix.length))}return n});return p(r,e),r}function at(e){var t=this,r=t.keys().then(function(o){return o.length});return p(r,e),r}function it(e,t){var r=this;e=O(e);var o=r.ready().then(function(){var a=r._dbInfo;localStorage.removeItem(a.keyPrefix+e)});return p(o,t),o}function ft(e,t,r){var o=this;e=O(e);var a=o.ready().then(function(){t===void 0&&(t=null);var n=t;return new h(function(i,f){var s=o._dbInfo;s.serializer.serialize(t,function(u,l){if(l)f(l);else try{localStorage.setItem(s.keyPrefix+e,u),i(n)}catch(m){(m.name==="QuotaExceededError"||m.name==="NS_ERROR_DOM_QUOTA_REACHED")&&f(m),f(m)}})})});return p(a,r),a}function st(e,t){if(t=G.apply(this,arguments),e=typeof e!="function"&&e||{},!e.name){var r=this.config();e.name=e.name||r.name,e.storeName=e.storeName||r.storeName}var o=this,a;return e.name?a=new h(function(n){e.storeName?n(je(e,o._defaultConfig)):n(e.name+"/")}).then(function(n){for(var i=localStorage.length-1;i>=0;i--){var f=localStorage.key(i);f.indexOf(n)===0&&localStorage.removeItem(f)}}):a=h.reject("Invalid arguments"),p(a,t),a}var ut={_driver:"localStorageWrapper",_initStorage:qr,_support:Jr(),iterate:tt,getItem:rt,setItem:ft,removeItem:it,clear:et,length:at,key:nt,keys:ot,dropInstance:st},ct=function(t,r){return t===r||typeof t=="number"&&typeof r=="number"&&isNaN(t)&&isNaN(r)},lt=function(t,r){for(var o=t.length,a=0;a<o;){if(ct(t[a],r))return!0;a++}return!1},He=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},ne={},Qe={},ee={INDEXEDDB:Cr,WEBSQL:Qr,LOCALSTORAGE:ut},dt=[ee.INDEXEDDB._driver,ee.WEBSQL._driver,ee.LOCALSTORAGE._driver],ue=["dropInstance"],Se=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(ue),vt={description:"",driver:dt.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function ht(e,t){e[t]=function(){var r=arguments;return e.ready().then(function(){return e[t].apply(e,r)})}}function Ie(){for(var e=1;e<arguments.length;e++){var t=arguments[e];if(t)for(var r in t)t.hasOwnProperty(r)&&(He(t[r])?arguments[0][r]=t[r].slice():arguments[0][r]=t[r])}return arguments[0]}var mt=function(){function e(t){C(this,e);for(var r in ee)if(ee.hasOwnProperty(r)){var o=ee[r],a=o._driver;this[r]=a,ne[a]||this.defineDriver(o)}this._defaultConfig=Ie({},vt),this._config=Ie({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(r){if((typeof r>"u"?"undefined":R(r))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var o in r){if(o==="storeName"&&(r[o]=r[o].replace(/\W/g,"_")),o==="version"&&typeof r[o]!="number")return new Error("Database version must be a number.");this._config[o]=r[o]}return"driver"in r&&r.driver?this.setDriver(this._config.driver):!0}else return typeof r=="string"?this._config[r]:this._config},e.prototype.defineDriver=function(r,o,a){var n=new h(function(i,f){try{var s=r._driver,u=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!r._driver){f(u);return}for(var l=Se.concat("_initStorage"),m=0,y=l.length;m<y;m++){var E=l[m],S=!lt(ue,E);if((S||r[E])&&typeof r[E]!="function"){f(u);return}}var D=function(){for(var oe=function(gt){return function(){var _t=new Error("Method "+gt+" is not implemented by the current driver"),Je=h.reject(_t);return p(Je,arguments[arguments.length-1]),Je}},Ne=0,yt=ue.length;Ne<yt;Ne++){var Te=ue[Ne];r[Te]||(r[Te]=oe(Te))}};D();var A=function(oe){ne[s]&&console.info("Redefining LocalForage driver: "+s),ne[s]=r,Qe[s]=oe,i()};"_support"in r?r._support&&typeof r._support=="function"?r._support().then(A,f):A(!!r._support):A(!0)}catch(W){f(W)}});return x(n,o,a),n},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(r,o,a){var n=ne[r]?h.resolve(ne[r]):h.reject(new Error("Driver not found."));return x(n,o,a),n},e.prototype.getSerializer=function(r){var o=h.resolve(we);return x(o,r),o},e.prototype.ready=function(r){var o=this,a=o._driverSet.then(function(){return o._ready===null&&(o._ready=o._initDriver()),o._ready});return x(a,r,r),a},e.prototype.setDriver=function(r,o,a){var n=this;He(r)||(r=[r]);var i=this._getSupportedDrivers(r);function f(){n._config.driver=n.driver()}function s(m){return n._extend(m),f(),n._ready=n._initStorage(n._config),n._ready}function u(m){return function(){var y=0;function E(){for(;y<m.length;){var S=m[y];return y++,n._dbInfo=null,n._ready=null,n.getDriver(S).then(s).catch(E)}f();var D=new Error("No available storage method found.");return n._driverSet=h.reject(D),n._driverSet}return E()}}var l=this._driverSet!==null?this._driverSet.catch(function(){return h.resolve()}):h.resolve();return this._driverSet=l.then(function(){var m=i[0];return n._dbInfo=null,n._ready=null,n.getDriver(m).then(function(y){n._driver=y._driver,f(),n._wrapLibraryMethodsWithReady(),n._initDriver=u(i)})}).catch(function(){f();var m=new Error("No available storage method found.");return n._driverSet=h.reject(m),n._driverSet}),x(this._driverSet,o,a),this._driverSet},e.prototype.supports=function(r){return!!Qe[r]},e.prototype._extend=function(r){Ie(this,r)},e.prototype._getSupportedDrivers=function(r){for(var o=[],a=0,n=r.length;a<n;a++){var i=r[a];this.supports(i)&&o.push(i)}return o},e.prototype._wrapLibraryMethodsWithReady=function(){for(var r=0,o=Se.length;r<o;r++)ht(this,Se[r])},e.prototype.createInstance=function(r){return new e(r)},e}(),pt=new mt;w.exports=pt},{3:3}]},{},[4])(4)})});var Rt=c=>{self.clients.matchAll().then(function(v){if(v)for(let _ of v)_.postMessage(c)})},ce=Rt;var At=()=>{self.addEventListener("error",xt,!0),self.addEventListener("unhandledrejection",Dt,!0)},xt=c=>{Ze(c.type,c.error.stack)},Dt=c=>{Ze(c.type,c.reason.stack)},Ze=(c,v)=>{ce({type:"PANIC",panic:{type:c,stack:v}})};At();var le,qe,Re,er,Ot=async(c,v,_,T)=>{le=c,qe=v,Re=_,er=T,self.skipWaiting(),self.addEventListener("install",Lt),self.addEventListener("activate",Ct),self.addEventListener("fetch",Pt)},Lt=c=>{c.waitUntil((async()=>{let v=await caches.open(le),_=self.location.href.replace(/\/[^/]*$/,""),T=[];for(let w of qe)T.push(_+w);await v.addAll(T)})())},Ct=c=>{c.waitUntil((async()=>{let v=await caches.keys();await Promise.all(v.map(_=>{if(_!==le)return caches.delete(_)})),await self.clients.claim(),ce({type:"ACTIVATED",version:le})})())},Pt=c=>{let{url:v,mode:_}=c.request,T=v.split("/").pop();if(T in er)return;let w;T in Re?w=Bt(T,c.request):_==="navigate"?w=Ut():w=Ft(v),c.respondWith(w)},Bt=async(c,v)=>{let _={};try{_.data=await Re[c](v)}catch(T){_.error=T.message}return new Response(JSON.stringify(_))},Ut=async()=>{let c=self.location.href.replace(/[^/]*$/,"");return caches.match(c)},Ft=async c=>await caches.match(c)||new Response(null,{status:404}),rr=Ot;var de="l0PDYzho",tr="getList",nr="getVersion",or="getUser",ar="setTokens",ir=atob("NjQ2ODk2ODY2NjY2LWdsb2ZvbnVjOTZoaTY5Z3I0N3FhczY3MnFncGI2bnA4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t"),fr=atob("R09DU1BYLW9tVW5nMjVNbnZxVkxia19OWS1BaHpCSlFzTzI="),on=atob("QUl6YVN5QnR0M2dSSGN6SjdnazhmaEd1M0Y4VVM0VE5KcHVCSUQ4");async function Yt(){return["a","b","c"]}var sr=Yt;var kt=()=>de,ur=kt;var xe=ie(re(),1);var Z="destiny-tokens",ve="destiny-user";var Mt=async(c,v=null,_=null)=>{let T;_?.tolerateFail&&(T=!0,delete _.tolerateFail);let w={};v&&(w.method="POST",w.body=JSON.stringify(v)),_&&Object.assign(w,_);let $;try{$=await fetch(c,w)}catch{if(T)return null;throw new Error(`Failed to fetch "${c}"!`)}let R;try{R=await $.json()}catch(C){throw new Error(`Cannot parse response from "${c}" as json! ${C.message}`)}return R},he=Mt;var Vt=(c,v)=>{if(!c)throw new Error(v)},k=Vt;var Wt=async()=>{let c=await xe.default.getItem(Z),v=await he("https://oauth2.googleapis.com/token",{client_id:ir,client_secret:fr,refresh_token:c.refresh_token,grant_type:"refresh_token"}),_=v.access_token;return k(_,`Unexpected tokens shape after refresh! ${JSON.stringify(v)}`),console.log("freshTokens:",v),c={...c,access_token:_},await xe.default.setItem(Z,c),c},lr=Wt;var dr=ie(re(),1);var $t=c=>!!(c&&typeof c=="object"&&!Array.isArray(c)),me=$t;var zt=async()=>{let c;try{c=await dr.default.getItem(Z)}catch{throw new Error("No linked account!")}return k(me(c),"Unexpected tokens type!"),k(c.access_token&&c.refresh_token,"Unexpected tokens shape!"),c},vr=zt;var hr=ie(re(),1);var Gt=async()=>{let c;try{c=await hr.default.getItem(ve)}catch{throw new Error("No cached user!")}return k(me(c),"Unexpected user type!"),k(c.email,"Unexpected user shape!"),c},mr=Gt;var yr=ie(re(),1);var Kt=async()=>{let c=await vr(),v=await pr(c.access_token);return v.error&&(c=await lr(),v=await pr(c.access_token)),k(!v.error,v.error+": "+v.error_description),k(v.email,"Missing email from user info!"),await yr.default.setItem(ve,v),v},pr=async c=>{let v=new Headers;v.append("Authorization",`Bearer ${c}`);let _=await he("https://www.googleapis.com/oauth2/v3/userinfo",null,{headers:v,tolerateFail:!0});return _||(console.log("We are offline."),await mr())},gr=Kt;var _r=ie(re(),1);var jt=async c=>{let v;try{v=await c.json()}catch{throw new Error("Expecting json payload in request body!")}return k(v.access_token&&v.refresh_token,"Unexpected tokens shape!"),await _r.default.setItem(Z,v),!0},br=jt;var Ht=["/","/index.html","/js/main-l0PDYzho.js","/manifest.json","/meta/192.png","/meta/512.png","/meta/apple-splash-1080-2340.png","/meta/destiny-1024.png","/meta/destiny.png","/meta/destiny.svg"],Qt={[tr]:sr,[nr]:ur,[or]:gr,[ar]:br},Jt={client:!0,token:!0},Xt=async()=>{await rr(de,Ht,Qt,Jt)};Xt();})();
