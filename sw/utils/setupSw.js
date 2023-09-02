import announceClients from './announceClients.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let currentVersion;
let currentCachedPaths;
let currentVirtualEndpoints;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Service_workers
 */
const setupSw = async (version, cachedPaths, virtualEndpoints) => {
    currentVersion = version;
    currentCachedPaths = cachedPaths;
    currentVirtualEndpoints = virtualEndpoints;

    console.log('SW: Setup of', version);
    self.skipWaiting();
    self.addEventListener('install', onWorkerInstall);
    self.addEventListener('activate', onWorkerActivate);
    self.addEventListener('fetch', onWorkerFetch);
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const onWorkerInstall = (event) => {
    console.log('SW: Install of', currentVersion);
    event.waitUntil(
        (async () => {
            const cache = await caches.open(currentVersion);
            await cache.addAll(currentCachedPaths);
        })(),
    );
};

/**
 *
 */
const onWorkerActivate = (event) => {
    console.log('SW: Activation of', currentVersion);
    event.waitUntil(
        (async () => {
            const names = await caches.keys();
            await Promise.all(
                names.map((name) => {
                    if (name !== currentVersion) {
                        return caches.delete(name);
                    }
                }),
            );
            await self.clients.claim();
            announceClients({type: 'ACTIVATED', version: currentVersion});
        })(),
    );
};

/**
 *
 */
const onWorkerFetch = (event) => {
    // console.log('SW: Fetch', event.request.url);
    const {url, mode} = event.request;
    const endpoint = url.split('/').pop();
    let responsePromise;
    if (endpoint in currentVirtualEndpoints) {
        responsePromise = respondToEndpoint(endpoint);
    } else if (mode === 'navigate') {
        responsePromise = respondToRoot();
    } else {
        responsePromise = respondToFile(url);
    }
    event.respondWith(responsePromise);
};

/**
 *
 */
const onWorkerFetch1 = (event) => {
    // console.log('SW: Fetch', event.request.url);
    // logHowWeWouldRespond(event);
    const endpoint = event.request.url.split('/').pop();
    if (endpoint in currentVirtualEndpoints) {
        event.respondWith(
            (async () => {
                const body = {};
                try {
                    body.data = await currentVirtualEndpoints[endpoint]();
                } catch (e) {
                    body.error = e.message;
                }
                console.log(`Reply to ${event.request.url} with body!`);
                return new Response(JSON.stringify(body));
            })(),
        );
        return;
    }

    // when seeking an HTML page
    if (event.request.mode === 'navigate') {
        // Return to the index.html page
        console.log(`Reply to ${event.request.url} with cached root!`);
        event.respondWith(caches.match('/'));
        return;
    }

    // For every other request type
    event.respondWith(
        (async () => {
            const cache = await caches.open(currentVersion);
            const cachedResponse = await cache.match(event.request.url);
            if (cachedResponse) {
                // Return the cached response if it's available.
                console.log(`Reply to ${event.request.url} with cache!`);
                return cachedResponse;
            } else {
                console.log(`Reply to ${event.request.url} with 404!`);
                // Respond with an HTTP 404 response status.
                return new Response(null, {status: 404});
            }
        })(),
    );
};

/**
 *
 */
const respondToEndpoint = async (endpoint) => {
    const body = {};
    try {
        body.data = await currentVirtualEndpoints[endpoint]();
    } catch (e) {
        body.error = e.message;
    }
    return new Response(JSON.stringify(body));
};

/**
 *
 */
const respondToRoot = async () => {
    return caches.match('/');
};

/**
 *
 */
const respondToFile = async (url) => {
    // const cache = await caches.open(currentVersion);
    const cachedResponse = await caches.match(url);
    return cachedResponse || new Response(null, {status: 404});
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default setupSw;
