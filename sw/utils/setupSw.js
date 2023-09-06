import announceClients from './announceClients.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let currentVersion;
let currentCachedPaths;
let currentVirtualEndpoints;
let currentIgnoredEndpoints;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Service_workers
 */
const setupSw = async (version, cachedPaths, virtualEndpoints, ignoredEndpoints) => {
    currentVersion = version;
    currentCachedPaths = cachedPaths;
    currentVirtualEndpoints = virtualEndpoints;
    currentIgnoredEndpoints = ignoredEndpoints;

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
    // console.log('SW: Install of', currentVersion);
    event.waitUntil(
        (async () => {
            const cache = await caches.open(currentVersion);
            const prefix = self.location.href.replace(/\/[^/]*$/, '');
            const absolutePaths = [];
            for (const relativePath of currentCachedPaths) {
                absolutePaths.push(prefix + relativePath);
            }
            console.log('absolutePaths: ' + JSON.stringify(absolutePaths, null, 4));
            await cache.addAll(absolutePaths);
        })(),
    );
};

/**
 *
 */
const onWorkerActivate = (event) => {
    // console.log('SW: Activation of', currentVersion);
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
    if (endpoint in currentIgnoredEndpoints) {
        return;
    }

    let responsePromise;
    if (endpoint in currentVirtualEndpoints) {
        responsePromise = respondToEndpoint(endpoint, event.request);
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
const respondToEndpoint = async (endpoint, request) => {
    const body = {};
    try {
        body.data = await currentVirtualEndpoints[endpoint](request);
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
