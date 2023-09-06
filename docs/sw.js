(()=>{var ot=Object.create;var Ge=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var it=Object.getOwnPropertyNames;var ft=Object.getPrototypeOf,ut=Object.prototype.hasOwnProperty;var te=(h=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(h,{get:(m,N)=>(typeof require<"u"?require:m)[N]}):h)(function(h){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+h+'" is not supported')});var st=(h,m)=>()=>(m||h((m={exports:{}}).exports,m),m.exports);var ct=(h,m,N,x)=>{if(m&&typeof m=="object"||typeof m=="function")for(let I of it(m))!ut.call(h,I)&&I!==N&&Ge(h,I,{get:()=>m[I],enumerable:!(x=at(m,I))||x.enumerable});return h};var lt=(h,m,N)=>(N=h!=null?ot(ft(h)):{},ct(m||!h||!h.__esModule?Ge(N,"default",{value:h,enumerable:!0}):N,h));var tr=st((rr,Ee)=>{(function(h){if(typeof rr=="object"&&typeof Ee<"u")Ee.exports=h();else if(typeof define=="function"&&define.amd)define([],h);else{var m;typeof window<"u"?m=window:typeof global<"u"?m=global:typeof self<"u"?m=self:m=this,m.localforage=h()}})(function(){var h,m,N;return function x(I,k,T){function U(P,z){if(!k[P]){if(!I[P]){var d=typeof te=="function"&&te;if(!z&&d)return d(P,!0);if(S)return S(P,!0);var p=new Error("Cannot find module '"+P+"'");throw p.code="MODULE_NOT_FOUND",p}var A=k[P]={exports:{}};I[P][0].call(A.exports,function(O){var G=I[P][1][O];return U(G||O)},A,A.exports,x,I,k,T)}return k[P].exports}for(var S=typeof te=="function"&&te,F=0;F<T.length;F++)U(T[F]);return U}({1:[function(x,I,k){(function(T){"use strict";var U=T.MutationObserver||T.WebKitMutationObserver,S;if(U){var F=0,P=new U(O),z=T.document.createTextNode("");P.observe(z,{characterData:!0}),S=function(){z.data=F=++F%2}}else if(!T.setImmediate&&typeof T.MessageChannel<"u"){var d=new T.MessageChannel;d.port1.onmessage=O,S=function(){d.port2.postMessage(0)}}else"document"in T&&"onreadystatechange"in T.document.createElement("script")?S=function(){var C=T.document.createElement("script");C.onreadystatechange=function(){O(),C.onreadystatechange=null,C.parentNode.removeChild(C),C=null},T.document.documentElement.appendChild(C)}:S=function(){setTimeout(O,0)};var p,A=[];function O(){p=!0;for(var C,$,L=A.length;L;){for($=A,A=[],C=-1;++C<L;)$[C]();L=A.length}p=!1}I.exports=G;function G(C){A.push(C)===1&&!p&&S()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],2:[function(x,I,k){"use strict";var T=x(1);function U(){}var S={},F=["REJECTED"],P=["FULFILLED"],z=["PENDING"];I.exports=d;function d(l){if(typeof l!="function")throw new TypeError("resolver must be a function");this.state=z,this.queue=[],this.outcome=void 0,l!==U&&G(this,l)}d.prototype.catch=function(l){return this.then(null,l)},d.prototype.then=function(l,_){if(typeof l!="function"&&this.state===P||typeof _!="function"&&this.state===F)return this;var g=new this.constructor(U);if(this.state!==z){var w=this.state===P?l:_;A(g,w,this.outcome)}else this.queue.push(new p(g,l,_));return g};function p(l,_,g){this.promise=l,typeof _=="function"&&(this.onFulfilled=_,this.callFulfilled=this.otherCallFulfilled),typeof g=="function"&&(this.onRejected=g,this.callRejected=this.otherCallRejected)}p.prototype.callFulfilled=function(l){S.resolve(this.promise,l)},p.prototype.otherCallFulfilled=function(l){A(this.promise,this.onFulfilled,l)},p.prototype.callRejected=function(l){S.reject(this.promise,l)},p.prototype.otherCallRejected=function(l){A(this.promise,this.onRejected,l)};function A(l,_,g){T(function(){var w;try{w=_(g)}catch(B){return S.reject(l,B)}w===l?S.reject(l,new TypeError("Cannot resolve promise with itself")):S.resolve(l,w)})}S.resolve=function(l,_){var g=C(O,_);if(g.status==="error")return S.reject(l,g.value);var w=g.value;if(w)G(l,w);else{l.state=P,l.outcome=_;for(var B=-1,M=l.queue.length;++B<M;)l.queue[B].callFulfilled(_)}return l},S.reject=function(l,_){l.state=F,l.outcome=_;for(var g=-1,w=l.queue.length;++g<w;)l.queue[g].callRejected(_);return l};function O(l){var _=l&&l.then;if(l&&(typeof l=="object"||typeof l=="function")&&typeof _=="function")return function(){_.apply(l,arguments)}}function G(l,_){var g=!1;function w(V){g||(g=!0,S.reject(l,V))}function B(V){g||(g=!0,S.resolve(l,V))}function M(){_(B,w)}var Y=C(M);Y.status==="error"&&w(Y.value)}function C(l,_){var g={};try{g.value=l(_),g.status="success"}catch(w){g.status="error",g.value=w}return g}d.resolve=$;function $(l){return l instanceof this?l:S.resolve(new this(U),l)}d.reject=L;function L(l){var _=new this(U);return S.reject(_,l)}d.all=se;function se(l){var _=this;if(Object.prototype.toString.call(l)!=="[object Array]")return this.reject(new TypeError("must be an array"));var g=l.length,w=!1;if(!g)return this.resolve([]);for(var B=new Array(g),M=0,Y=-1,V=new this(U);++Y<g;)H(l[Y],Y);return V;function H(q,ne){_.resolve(q).then(ce,function(Z){w||(w=!0,S.reject(V,Z))});function ce(Z){B[ne]=Z,++M===g&&!w&&(w=!0,S.resolve(V,B))}}}d.race=X;function X(l){var _=this;if(Object.prototype.toString.call(l)!=="[object Array]")return this.reject(new TypeError("must be an array"));var g=l.length,w=!1;if(!g)return this.resolve([]);for(var B=-1,M=new this(U);++B<g;)Y(l[B]);return M;function Y(V){_.resolve(V).then(function(H){w||(w=!0,S.resolve(M,H))},function(H){w||(w=!0,S.reject(M,H))})}}},{1:1}],3:[function(x,I,k){(function(T){"use strict";typeof T.Promise!="function"&&(T.Promise=x(2))}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{2:2}],4:[function(x,I,k){"use strict";var T=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function U(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function S(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch{return}}var F=S();function P(){try{if(!F||!F.open)return!1;var e=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!e||t)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch{return!1}}function z(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(n){if(n.name!=="TypeError")throw n;for(var r=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,o=new r,a=0;a<e.length;a+=1)o.append(e[a]);return o.getBlob(t.type)}}typeof Promise>"u"&&x(3);var d=Promise;function p(e,t){t&&e.then(function(r){t(null,r)},function(r){t(r)})}function A(e,t,r){typeof t=="function"&&e.then(t),typeof r=="function"&&e.catch(r)}function O(e){return typeof e!="string"&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function G(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}var C="local-forage-detect-blob-support",$=void 0,L={},se=Object.prototype.toString,X="readonly",l="readwrite";function _(e){for(var t=e.length,r=new ArrayBuffer(t),o=new Uint8Array(r),a=0;a<t;a++)o[a]=e.charCodeAt(a);return r}function g(e){return new d(function(t){var r=e.transaction(C,l),o=z([""]);r.objectStore(C).put(o,"key"),r.onabort=function(a){a.preventDefault(),a.stopPropagation(),t(!1)},r.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);t(n||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function w(e){return typeof $=="boolean"?d.resolve($):g(e).then(function(t){return $=t,$})}function B(e){var t=L[e.name],r={};r.promise=new d(function(o,a){r.resolve=o,r.reject=a}),t.deferredOperations.push(r),t.dbReady?t.dbReady=t.dbReady.then(function(){return r.promise}):t.dbReady=r.promise}function M(e){var t=L[e.name],r=t.deferredOperations.pop();if(r)return r.resolve(),r.promise}function Y(e,t){var r=L[e.name],o=r.deferredOperations.pop();if(o)return o.reject(t),o.promise}function V(e,t){return new d(function(r,o){if(L[e.name]=L[e.name]||we(),e.db)if(t)B(e),e.db.close();else return r(e.db);var a=[e.name];t&&a.push(e.version);var n=F.open.apply(F,a);t&&(n.onupgradeneeded=function(i){var f=n.result;try{f.createObjectStore(e.storeName),i.oldVersion<=1&&f.createObjectStore(C)}catch(u){if(u.name==="ConstraintError")console.warn('The database "'+e.name+'" has been upgraded from version '+i.oldVersion+" to version "+i.newVersion+', but the storage "'+e.storeName+'" already exists.');else throw u}}),n.onerror=function(i){i.preventDefault(),o(n.error)},n.onsuccess=function(){var i=n.result;i.onversionchange=function(f){f.target.close()},r(i),M(e)}})}function H(e){return V(e,!1)}function q(e){return V(e,!0)}function ne(e,t){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),o=e.version<e.db.version,a=e.version>e.db.version;if(o&&(e.version!==t&&console.warn('The database "'+e.name+`" can't be downgraded from version `+e.db.version+" to version "+e.version+"."),e.version=e.db.version),a||r){if(r){var n=e.db.version+1;n>e.version&&(e.version=n)}return!0}return!1}function ce(e){return new d(function(t,r){var o=new FileReader;o.onerror=r,o.onloadend=function(a){var n=btoa(a.target.result||"");t({__local_forage_encoded_blob:!0,data:n,type:e.type})},o.readAsBinaryString(e)})}function Z(e){var t=_(atob(e.data));return z([t],{type:e.type})}function Se(e){return e&&e.__local_forage_encoded_blob}function ar(e){var t=this,r=t._initReady().then(function(){var o=L[t._dbInfo.name];if(o&&o.dbReady)return o.dbReady});return A(r,e,e),r}function ir(e){B(e);for(var t=L[e.name],r=t.forages,o=0;o<r.length;o++){var a=r[o];a._dbInfo.db&&(a._dbInfo.db.close(),a._dbInfo.db=null)}return e.db=null,H(e).then(function(n){return e.db=n,ne(e)?q(e):n}).then(function(n){e.db=t.db=n;for(var i=0;i<r.length;i++)r[i]._dbInfo.db=n}).catch(function(n){throw Y(e,n),n})}function Q(e,t,r,o){o===void 0&&(o=1);try{var a=e.db.transaction(e.storeName,t);r(null,a)}catch(n){if(o>0&&(!e.db||n.name==="InvalidStateError"||n.name==="NotFoundError"))return d.resolve().then(function(){if(!e.db||n.name==="NotFoundError"&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),q(e)}).then(function(){return ir(e).then(function(){Q(e,t,r,o-1)})}).catch(r);r(n)}}function we(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function fr(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=e[o];var a=L[r.name];a||(a=we(),L[r.name]=a),a.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=ar);var n=[];function i(){return d.resolve()}for(var f=0;f<a.forages.length;f++){var u=a.forages[f];u!==t&&n.push(u._initReady().catch(i))}var s=a.forages.slice(0);return d.all(n).then(function(){return r.db=a.db,H(r)}).then(function(c){return r.db=c,ne(r,t._defaultConfig.version)?q(r):c}).then(function(c){r.db=a.db=c,t._dbInfo=r;for(var v=0;v<s.length;v++){var y=s[v];y!==t&&(y._dbInfo.db=r.db,y._dbInfo.version=r.version)}})}function ur(e,t){var r=this;e=O(e);var o=new d(function(a,n){r.ready().then(function(){Q(r._dbInfo,X,function(i,f){if(i)return n(i);try{var u=f.objectStore(r._dbInfo.storeName),s=u.get(e);s.onsuccess=function(){var c=s.result;c===void 0&&(c=null),Se(c)&&(c=Z(c)),a(c)},s.onerror=function(){n(s.error)}}catch(c){n(c)}})}).catch(n)});return p(o,t),o}function sr(e,t){var r=this,o=new d(function(a,n){r.ready().then(function(){Q(r._dbInfo,X,function(i,f){if(i)return n(i);try{var u=f.objectStore(r._dbInfo.storeName),s=u.openCursor(),c=1;s.onsuccess=function(){var v=s.result;if(v){var y=v.value;Se(y)&&(y=Z(y));var b=e(y,v.key,c++);b!==void 0?a(b):v.continue()}else a()},s.onerror=function(){n(s.error)}}catch(v){n(v)}})}).catch(n)});return p(o,t),o}function cr(e,t,r){var o=this;e=O(e);var a=new d(function(n,i){var f;o.ready().then(function(){return f=o._dbInfo,se.call(t)==="[object Blob]"?w(f.db).then(function(u){return u?t:ce(t)}):t}).then(function(u){Q(o._dbInfo,l,function(s,c){if(s)return i(s);try{var v=c.objectStore(o._dbInfo.storeName);u===null&&(u=void 0);var y=v.put(u,e);c.oncomplete=function(){u===void 0&&(u=null),n(u)},c.onabort=c.onerror=function(){var b=y.error?y.error:y.transaction.error;i(b)}}catch(b){i(b)}})}).catch(i)});return p(a,r),a}function lr(e,t){var r=this;e=O(e);var o=new d(function(a,n){r.ready().then(function(){Q(r._dbInfo,l,function(i,f){if(i)return n(i);try{var u=f.objectStore(r._dbInfo.storeName),s=u.delete(e);f.oncomplete=function(){a()},f.onerror=function(){n(s.error)},f.onabort=function(){var c=s.error?s.error:s.transaction.error;n(c)}}catch(c){n(c)}})}).catch(n)});return p(o,t),o}function dr(e){var t=this,r=new d(function(o,a){t.ready().then(function(){Q(t._dbInfo,l,function(n,i){if(n)return a(n);try{var f=i.objectStore(t._dbInfo.storeName),u=f.clear();i.oncomplete=function(){o()},i.onabort=i.onerror=function(){var s=u.error?u.error:u.transaction.error;a(s)}}catch(s){a(s)}})}).catch(a)});return p(r,e),r}function vr(e){var t=this,r=new d(function(o,a){t.ready().then(function(){Q(t._dbInfo,X,function(n,i){if(n)return a(n);try{var f=i.objectStore(t._dbInfo.storeName),u=f.count();u.onsuccess=function(){o(u.result)},u.onerror=function(){a(u.error)}}catch(s){a(s)}})}).catch(a)});return p(r,e),r}function hr(e,t){var r=this,o=new d(function(a,n){if(e<0){a(null);return}r.ready().then(function(){Q(r._dbInfo,X,function(i,f){if(i)return n(i);try{var u=f.objectStore(r._dbInfo.storeName),s=!1,c=u.openKeyCursor();c.onsuccess=function(){var v=c.result;if(!v){a(null);return}e===0||s?a(v.key):(s=!0,v.advance(e))},c.onerror=function(){n(c.error)}}catch(v){n(v)}})}).catch(n)});return p(o,t),o}function mr(e){var t=this,r=new d(function(o,a){t.ready().then(function(){Q(t._dbInfo,X,function(n,i){if(n)return a(n);try{var f=i.objectStore(t._dbInfo.storeName),u=f.openKeyCursor(),s=[];u.onsuccess=function(){var c=u.result;if(!c){o(s);return}s.push(c.key),c.continue()},u.onerror=function(){a(u.error)}}catch(c){a(c)}})}).catch(a)});return p(r,e),r}function pr(e,t){t=G.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;if(!e.name)a=d.reject("Invalid arguments");else{var n=e.name===r.name&&o._dbInfo.db,i=n?d.resolve(o._dbInfo.db):H(e).then(function(f){var u=L[e.name],s=u.forages;u.db=f;for(var c=0;c<s.length;c++)s[c]._dbInfo.db=f;return f});e.storeName?a=i.then(function(f){if(f.objectStoreNames.contains(e.storeName)){var u=f.version+1;B(e);var s=L[e.name],c=s.forages;f.close();for(var v=0;v<c.length;v++){var y=c[v];y._dbInfo.db=null,y._dbInfo.version=u}var b=new d(function(E,D){var R=F.open(e.name,u);R.onerror=function(W){var re=R.result;re.close(),D(W)},R.onupgradeneeded=function(){var W=R.result;W.deleteObjectStore(e.storeName)},R.onsuccess=function(){var W=R.result;W.close(),E(W)}});return b.then(function(E){s.db=E;for(var D=0;D<c.length;D++){var R=c[D];R._dbInfo.db=E,M(R._dbInfo)}}).catch(function(E){throw(Y(e,E)||d.resolve()).catch(function(){}),E})}}):a=i.then(function(f){B(e);var u=L[e.name],s=u.forages;f.close();for(var c=0;c<s.length;c++){var v=s[c];v._dbInfo.db=null}var y=new d(function(b,E){var D=F.deleteDatabase(e.name);D.onerror=function(){var R=D.result;R&&R.close(),E(D.error)},D.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},D.onsuccess=function(){var R=D.result;R&&R.close(),b(R)}});return y.then(function(b){u.db=b;for(var E=0;E<s.length;E++){var D=s[E];M(D._dbInfo)}}).catch(function(b){throw(Y(e,b)||d.resolve()).catch(function(){}),b})})}return p(a,t),a}var yr={_driver:"asyncStorage",_initStorage:fr,_support:P(),iterate:sr,getItem:ur,setItem:cr,removeItem:lr,clear:dr,length:vr,key:hr,keys:mr,dropInstance:pr};function gr(){return typeof openDatabase=="function"}var K="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_r="~~local_forage_type~",Ie=/^~~local_forage_type~([^~]+)~/,oe="__lfsc__:",le=oe.length,de="arbf",ve="blob",Ne="si08",Te="ui08",Re="uic8",Ae="si16",De="si32",xe="ur16",Oe="ui32",Ce="fl32",Le="fl64",Pe=le+de.length,Be=Object.prototype.toString;function Fe(e){var t=e.length*.75,r=e.length,o,a=0,n,i,f,u;e[e.length-1]==="="&&(t--,e[e.length-2]==="="&&t--);var s=new ArrayBuffer(t),c=new Uint8Array(s);for(o=0;o<r;o+=4)n=K.indexOf(e[o]),i=K.indexOf(e[o+1]),f=K.indexOf(e[o+2]),u=K.indexOf(e[o+3]),c[a++]=n<<2|i>>4,c[a++]=(i&15)<<4|f>>2,c[a++]=(f&3)<<6|u&63;return s}function he(e){var t=new Uint8Array(e),r="",o;for(o=0;o<t.length;o+=3)r+=K[t[o]>>2],r+=K[(t[o]&3)<<4|t[o+1]>>4],r+=K[(t[o+1]&15)<<2|t[o+2]>>6],r+=K[t[o+2]&63];return t.length%3===2?r=r.substring(0,r.length-1)+"=":t.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}function br(e,t){var r="";if(e&&(r=Be.call(e)),e&&(r==="[object ArrayBuffer]"||e.buffer&&Be.call(e.buffer)==="[object ArrayBuffer]")){var o,a=oe;e instanceof ArrayBuffer?(o=e,a+=de):(o=e.buffer,r==="[object Int8Array]"?a+=Ne:r==="[object Uint8Array]"?a+=Te:r==="[object Uint8ClampedArray]"?a+=Re:r==="[object Int16Array]"?a+=Ae:r==="[object Uint16Array]"?a+=xe:r==="[object Int32Array]"?a+=De:r==="[object Uint32Array]"?a+=Oe:r==="[object Float32Array]"?a+=Ce:r==="[object Float64Array]"?a+=Le:t(new Error("Failed to get type for BinaryArray"))),t(a+he(o))}else if(r==="[object Blob]"){var n=new FileReader;n.onload=function(){var i=_r+e.type+"~"+he(this.result);t(oe+ve+i)},n.readAsArrayBuffer(e)}else try{t(JSON.stringify(e))}catch(i){console.error("Couldn't convert value into a JSON string: ",e),t(null,i)}}function Er(e){if(e.substring(0,le)!==oe)return JSON.parse(e);var t=e.substring(Pe),r=e.substring(le,Pe),o;if(r===ve&&Ie.test(t)){var a=t.match(Ie);o=a[1],t=t.substring(a[0].length)}var n=Fe(t);switch(r){case de:return n;case ve:return z([n],{type:o});case Ne:return new Int8Array(n);case Te:return new Uint8Array(n);case Re:return new Uint8ClampedArray(n);case Ae:return new Int16Array(n);case xe:return new Uint16Array(n);case De:return new Int32Array(n);case Oe:return new Uint32Array(n);case Ce:return new Float32Array(n);case Le:return new Float64Array(n);default:throw new Error("Unkown type: "+r)}}var me={serialize:br,deserialize:Er,stringToBuffer:Fe,bufferToString:he};function Ue(e,t,r,o){e.executeSql("CREATE TABLE IF NOT EXISTS "+t.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],r,o)}function Sr(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=typeof e[o]!="string"?e[o].toString():e[o];var a=new d(function(n,i){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(f){return i(f)}r.db.transaction(function(f){Ue(f,r,function(){t._dbInfo=r,n()},function(u,s){i(s)})},i)});return r.serializer=me,a}function j(e,t,r,o,a,n){e.executeSql(r,o,a,function(i,f){f.code===f.SYNTAX_ERR?i.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[t.storeName],function(u,s){s.rows.length?n(u,f):Ue(u,t,function(){u.executeSql(r,o,a,n)},n)},n):n(i,f)},n)}function wr(e,t){var r=this;e=O(e);var o=new d(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){j(f,i,"SELECT * FROM "+i.storeName+" WHERE key = ? LIMIT 1",[e],function(u,s){var c=s.rows.length?s.rows.item(0).value:null;c&&(c=i.serializer.deserialize(c)),a(c)},function(u,s){n(s)})})}).catch(n)});return p(o,t),o}function Ir(e,t){var r=this,o=new d(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){j(f,i,"SELECT * FROM "+i.storeName,[],function(u,s){for(var c=s.rows,v=c.length,y=0;y<v;y++){var b=c.item(y),E=b.value;if(E&&(E=i.serializer.deserialize(E)),E=e(E,b.key,y+1),E!==void 0){a(E);return}}a()},function(u,s){n(s)})})}).catch(n)});return p(o,t),o}function Me(e,t,r,o){var a=this;e=O(e);var n=new d(function(i,f){a.ready().then(function(){t===void 0&&(t=null);var u=t,s=a._dbInfo;s.serializer.serialize(t,function(c,v){v?f(v):s.db.transaction(function(y){j(y,s,"INSERT OR REPLACE INTO "+s.storeName+" (key, value) VALUES (?, ?)",[e,c],function(){i(u)},function(b,E){f(E)})},function(y){if(y.code===y.QUOTA_ERR){if(o>0){i(Me.apply(a,[e,u,r,o-1]));return}f(y)}})})}).catch(f)});return p(n,r),n}function Nr(e,t,r){return Me.apply(this,[e,t,r,1])}function Tr(e,t){var r=this;e=O(e);var o=new d(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){j(f,i,"DELETE FROM "+i.storeName+" WHERE key = ?",[e],function(){a()},function(u,s){n(s)})})}).catch(n)});return p(o,t),o}function Rr(e){var t=this,r=new d(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){j(i,n,"DELETE FROM "+n.storeName,[],function(){o()},function(f,u){a(u)})})}).catch(a)});return p(r,e),r}function Ar(e){var t=this,r=new d(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){j(i,n,"SELECT COUNT(key) as c FROM "+n.storeName,[],function(f,u){var s=u.rows.item(0).c;o(s)},function(f,u){a(u)})})}).catch(a)});return p(r,e),r}function Dr(e,t){var r=this,o=new d(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){j(f,i,"SELECT key FROM "+i.storeName+" WHERE id = ? LIMIT 1",[e+1],function(u,s){var c=s.rows.length?s.rows.item(0).key:null;a(c)},function(u,s){n(s)})})}).catch(n)});return p(o,t),o}function xr(e){var t=this,r=new d(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){j(i,n,"SELECT key FROM "+n.storeName,[],function(f,u){for(var s=[],c=0;c<u.rows.length;c++)s.push(u.rows.item(c).key);o(s)},function(f,u){a(u)})})}).catch(a)});return p(r,e),r}function Or(e){return new d(function(t,r){e.transaction(function(o){o.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(a,n){for(var i=[],f=0;f<n.rows.length;f++)i.push(n.rows.item(f).name);t({db:e,storeNames:i})},function(a,n){r(n)})},function(o){r(o)})})}function Cr(e,t){t=G.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;return e.name?a=new d(function(n){var i;e.name===r.name?i=o._dbInfo.db:i=openDatabase(e.name,"","",0),e.storeName?n({db:i,storeNames:[e.storeName]}):n(Or(i))}).then(function(n){return new d(function(i,f){n.db.transaction(function(u){function s(b){return new d(function(E,D){u.executeSql("DROP TABLE IF EXISTS "+b,[],function(){E()},function(R,W){D(W)})})}for(var c=[],v=0,y=n.storeNames.length;v<y;v++)c.push(s(n.storeNames[v]));d.all(c).then(function(){i()}).catch(function(b){f(b)})},function(u){f(u)})})}):a=d.reject("Invalid arguments"),p(a,t),a}var Lr={_driver:"webSQLStorage",_initStorage:Sr,_support:gr(),iterate:Ir,getItem:wr,setItem:Nr,removeItem:Tr,clear:Rr,length:Ar,key:Dr,keys:xr,dropInstance:Cr};function Pr(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch{return!1}}function Ye(e,t){var r=e.name+"/";return e.storeName!==t.storeName&&(r+=e.storeName+"/"),r}function Br(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch{return!0}}function Fr(){return!Br()||localStorage.length>0}function Ur(e){var t=this,r={};if(e)for(var o in e)r[o]=e[o];return r.keyPrefix=Ye(e,t._defaultConfig),Fr()?(t._dbInfo=r,r.serializer=me,d.resolve()):d.reject()}function Mr(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo.keyPrefix,a=localStorage.length-1;a>=0;a--){var n=localStorage.key(a);n.indexOf(o)===0&&localStorage.removeItem(n)}});return p(r,e),r}function Yr(e,t){var r=this;e=O(e);var o=r.ready().then(function(){var a=r._dbInfo,n=localStorage.getItem(a.keyPrefix+e);return n&&(n=a.serializer.deserialize(n)),n});return p(o,t),o}function Vr(e,t){var r=this,o=r.ready().then(function(){for(var a=r._dbInfo,n=a.keyPrefix,i=n.length,f=localStorage.length,u=1,s=0;s<f;s++){var c=localStorage.key(s);if(c.indexOf(n)===0){var v=localStorage.getItem(c);if(v&&(v=a.serializer.deserialize(v)),v=e(v,c.substring(i),u++),v!==void 0)return v}}});return p(o,t),o}function Wr(e,t){var r=this,o=r.ready().then(function(){var a=r._dbInfo,n;try{n=localStorage.key(e)}catch{n=null}return n&&(n=n.substring(a.keyPrefix.length)),n});return p(o,t),o}function zr(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo,a=localStorage.length,n=[],i=0;i<a;i++){var f=localStorage.key(i);f.indexOf(o.keyPrefix)===0&&n.push(f.substring(o.keyPrefix.length))}return n});return p(r,e),r}function Gr(e){var t=this,r=t.keys().then(function(o){return o.length});return p(r,e),r}function $r(e,t){var r=this;e=O(e);var o=r.ready().then(function(){var a=r._dbInfo;localStorage.removeItem(a.keyPrefix+e)});return p(o,t),o}function Hr(e,t,r){var o=this;e=O(e);var a=o.ready().then(function(){t===void 0&&(t=null);var n=t;return new d(function(i,f){var u=o._dbInfo;u.serializer.serialize(t,function(s,c){if(c)f(c);else try{localStorage.setItem(u.keyPrefix+e,s),i(n)}catch(v){(v.name==="QuotaExceededError"||v.name==="NS_ERROR_DOM_QUOTA_REACHED")&&f(v),f(v)}})})});return p(a,r),a}function Qr(e,t){if(t=G.apply(this,arguments),e=typeof e!="function"&&e||{},!e.name){var r=this.config();e.name=e.name||r.name,e.storeName=e.storeName||r.storeName}var o=this,a;return e.name?a=new d(function(n){e.storeName?n(Ye(e,o._defaultConfig)):n(e.name+"/")}).then(function(n){for(var i=localStorage.length-1;i>=0;i--){var f=localStorage.key(i);f.indexOf(n)===0&&localStorage.removeItem(f)}}):a=d.reject("Invalid arguments"),p(a,t),a}var kr={_driver:"localStorageWrapper",_initStorage:Ur,_support:Pr(),iterate:Vr,getItem:Yr,setItem:Hr,removeItem:$r,clear:Mr,length:Gr,key:Wr,keys:zr,dropInstance:Qr},Kr=function(t,r){return t===r||typeof t=="number"&&typeof r=="number"&&isNaN(t)&&isNaN(r)},jr=function(t,r){for(var o=t.length,a=0;a<o;){if(Kr(t[a],r))return!0;a++}return!1},Ve=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},ee={},We={},J={INDEXEDDB:yr,WEBSQL:Lr,LOCALSTORAGE:kr},Xr=[J.INDEXEDDB._driver,J.WEBSQL._driver,J.LOCALSTORAGE._driver],ae=["dropInstance"],pe=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(ae),Zr={description:"",driver:Xr.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function Jr(e,t){e[t]=function(){var r=arguments;return e.ready().then(function(){return e[t].apply(e,r)})}}function ye(){for(var e=1;e<arguments.length;e++){var t=arguments[e];if(t)for(var r in t)t.hasOwnProperty(r)&&(Ve(t[r])?arguments[0][r]=t[r].slice():arguments[0][r]=t[r])}return arguments[0]}var qr=function(){function e(t){U(this,e);for(var r in J)if(J.hasOwnProperty(r)){var o=J[r],a=o._driver;this[r]=a,ee[a]||this.defineDriver(o)}this._defaultConfig=ye({},Zr),this._config=ye({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(r){if((typeof r>"u"?"undefined":T(r))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var o in r){if(o==="storeName"&&(r[o]=r[o].replace(/\W/g,"_")),o==="version"&&typeof r[o]!="number")return new Error("Database version must be a number.");this._config[o]=r[o]}return"driver"in r&&r.driver?this.setDriver(this._config.driver):!0}else return typeof r=="string"?this._config[r]:this._config},e.prototype.defineDriver=function(r,o,a){var n=new d(function(i,f){try{var u=r._driver,s=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!r._driver){f(s);return}for(var c=pe.concat("_initStorage"),v=0,y=c.length;v<y;v++){var b=c[v],E=!jr(ae,b);if((E||r[b])&&typeof r[b]!="function"){f(s);return}}var D=function(){for(var re=function(tt){return function(){var nt=new Error("Method "+tt+" is not implemented by the current driver"),ze=d.reject(nt);return p(ze,arguments[arguments.length-1]),ze}},ge=0,rt=ae.length;ge<rt;ge++){var _e=ae[ge];r[_e]||(r[_e]=re(_e))}};D();var R=function(re){ee[u]&&console.info("Redefining LocalForage driver: "+u),ee[u]=r,We[u]=re,i()};"_support"in r?r._support&&typeof r._support=="function"?r._support().then(R,f):R(!!r._support):R(!0)}catch(W){f(W)}});return A(n,o,a),n},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(r,o,a){var n=ee[r]?d.resolve(ee[r]):d.reject(new Error("Driver not found."));return A(n,o,a),n},e.prototype.getSerializer=function(r){var o=d.resolve(me);return A(o,r),o},e.prototype.ready=function(r){var o=this,a=o._driverSet.then(function(){return o._ready===null&&(o._ready=o._initDriver()),o._ready});return A(a,r,r),a},e.prototype.setDriver=function(r,o,a){var n=this;Ve(r)||(r=[r]);var i=this._getSupportedDrivers(r);function f(){n._config.driver=n.driver()}function u(v){return n._extend(v),f(),n._ready=n._initStorage(n._config),n._ready}function s(v){return function(){var y=0;function b(){for(;y<v.length;){var E=v[y];return y++,n._dbInfo=null,n._ready=null,n.getDriver(E).then(u).catch(b)}f();var D=new Error("No available storage method found.");return n._driverSet=d.reject(D),n._driverSet}return b()}}var c=this._driverSet!==null?this._driverSet.catch(function(){return d.resolve()}):d.resolve();return this._driverSet=c.then(function(){var v=i[0];return n._dbInfo=null,n._ready=null,n.getDriver(v).then(function(y){n._driver=y._driver,f(),n._wrapLibraryMethodsWithReady(),n._initDriver=s(i)})}).catch(function(){f();var v=new Error("No available storage method found.");return n._driverSet=d.reject(v),n._driverSet}),A(this._driverSet,o,a),this._driverSet},e.prototype.supports=function(r){return!!We[r]},e.prototype._extend=function(r){ye(this,r)},e.prototype._getSupportedDrivers=function(r){for(var o=[],a=0,n=r.length;a<n;a++){var i=r[a];this.supports(i)&&o.push(i)}return o},e.prototype._wrapLibraryMethodsWithReady=function(){for(var r=0,o=pe.length;r<o;r++)Jr(this,pe[r])},e.prototype.createInstance=function(r){return new e(r)},e}(),et=new qr;I.exports=et},{3:3}]},{},[4])(4)})});var dt=h=>{self.clients.matchAll().then(function(m){if(m)for(let N of m)N.postMessage(h)})},ie=dt;var vt=()=>{self.addEventListener("error",ht,!0),self.addEventListener("unhandledrejection",mt,!0)},ht=h=>{$e(h.type,h.error.stack)},mt=h=>{$e(h.type,h.reason.stack)},$e=(h,m)=>{ie({type:"PANIC",panic:{type:h,stack:m}})};vt();var fe,He,be,Qe,pt=async(h,m,N,x)=>{fe=h,He=m,be=N,Qe=x,self.skipWaiting(),self.addEventListener("install",yt),self.addEventListener("activate",gt),self.addEventListener("fetch",_t)},yt=h=>{h.waitUntil((async()=>{await(await caches.open(fe)).addAll(He)})())},gt=h=>{h.waitUntil((async()=>{let m=await caches.keys();await Promise.all(m.map(N=>{if(N!==fe)return caches.delete(N)})),await self.clients.claim(),ie({type:"ACTIVATED",version:fe})})())},_t=h=>{let{url:m,mode:N}=h.request,x=m.split("/").pop();if(x in Qe)return;let I;x in be?I=bt(x,h.request):N==="navigate"?I=Et():I=St(m),h.respondWith(I)},bt=async(h,m)=>{let N={};try{N.data=await be[h](m)}catch(x){N.error=x.message}return new Response(JSON.stringify(N))},Et=async()=>caches.match("/"),St=async h=>await caches.match(h)||new Response(null,{status:404}),ke=pt;var ue="w8K3m1y1JjupbWmS8tVKRiHEvd0=",Ke="getList",je="getVersion",Xe="getUser",Ze="setTokens",Ut=atob("NjQ2ODk2ODY2NjY2LWdsb2ZvbnVjOTZoaTY5Z3I0N3FhczY3MnFncGI2bnA4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t"),Mt=atob("R09DU1BYLW9tVW5nMjVNbnZxVkxia19OWS1BaHpCSlFzTzI="),Yt=atob("QUl6YVN5QnR0M2dSSGN6SjdnazhmaEd1M0Y4VVM0VE5KcHVCSUQ4");async function wt(){return["a","b","c"]}var Je=wt;var It=()=>ue,qe=It;async function Nt(){return null}var er=Nt;var nr=lt(tr(),1),Tt=async h=>{let m=await h.json();return console.log("tokens in localforage:",m),await nr.default.setItem("destiny-tokens",m),!0},or=Tt;var Rt=["/","/index.html","/js/main-WK5LRLZK.js","/manifest.json","/meta/192.png","/meta/512.png","/meta/apple-splash-1080-2340.png","/meta/destiny-1024.png","/meta/destiny.png","/meta/destiny.svg"],At={[Ke]:Je,[je]:qe,[Xe]:er,[Ze]:or},Dt={client:!0,token:!0},xt=async()=>{await ke(ue,Rt,At,Dt)};xt();})();
