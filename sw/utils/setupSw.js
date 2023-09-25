import announceClients from './announceClients.js';
import getSwHome from './getSwHome.js';
import assume from './assume.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let isUnregistered = false;
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

    self.skipWaiting(); // TODO find out if this is working
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
    self.skipWaiting(); // TODO find out if this is working
    event.waitUntil(
        (async () => {
            const cache = await caches.open(currentVersion);
            const home = getSwHome();
            const absolutePaths = [];
            for (const relativePath of currentCachedPaths) {
                absolutePaths.push(home + relativePath);
            }
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
    if (isUnregistered) {
        return;
    }
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
        let json;
        if (request.method === 'POST') {
            try {
                json = await request.json();
            } catch (e) {
                assume(false, 'Expecting json payload in request body!');
            }
        }
        body.data = await currentVirtualEndpoints[endpoint](json);
    } catch (e) {
        body.error = e.message;
    }
    return new Response(JSON.stringify(body));
};

/**
 *
 */
const respondToRoot = async () => {
    const home = getSwHome(); // without trailing slash, e.g. https://foo.com/bar
    const cachedResponse = await caches.match(home + '/');
    const freshResponse = await fetchUrl(home + '/');
    if (freshResponse) {
        // console.log('We are online.');
        if (cachedResponse) {
            // console.log('We have cache.');
            const cachedText = await cachedResponse.clone().text();
            const freshText = await freshResponse.clone().text();
            if (cachedText !== freshText) {
                // console.log('Something changed!');
                isUnregistered = true;
                await self.registration.unregister();
            }
        }
        return freshResponse;
    } else {
        // console.log('We are offline!');
        return cachedResponse;
    }
};

/**
 *
 */
const fetchUrl = async (url) => {
    try {
        return await fetch(url);
    } catch (e) {
        // Nothing
    }
};

/**
 *
 */
const respondToFile = async (url) => {
    const cachedResponse = await caches.match(url);
    return cachedResponse || new Response(null, {status: 404});
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default setupSw;
