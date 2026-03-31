import announceClients from './announceClients.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const VERBOSE = false;
// const VERBOSE = true;
let isUnregistered = false;
let currentVersion;
let currentOptions;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Service_workers
 */
const setupSw = async (version, options = {}) => {
    currentVersion = version;
    currentOptions = options;
    log('Setup');

    self.skipWaiting(); // TODO find out if this is working
    self.addEventListener('install', onWorkerInstall);
    self.addEventListener('activate', onWorkerActivate);
    self.addEventListener('fetch', onWorkerFetch);
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 * Returns the current directory, without a trailing slash.
 */
const getSwHome = () => {
    return self.location.href.replace(/\/[^/]*$/, '');
};

/**
 *
 */
const onWorkerInstall = (event) => {
    log('Install event');
    self.skipWaiting(); // TODO find out if this is working
    event.waitUntil(
        (async () => {
            const cache = await caches.open(currentVersion);
            const home = getSwHome();
            const absolutePaths = [];
            const {cachedPaths = []} = currentOptions;
            for (const relativePath of cachedPaths) {
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
    log('Activate event');
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

    const {url} = event.request;
    if (!url.startsWith('http')) {
        // e.g. chrome-extension://
        return;
    }

    const {ignoredFetches = []} = currentOptions;
    for (const key of ignoredFetches) {
        if (url.includes(key)) {
            return;
        }
    }

    log('Fetching ' + event.request.url);
    const fileName = url.split('/').pop();
    let responsePromise;
    if (fileName === 'index.html' || !fileName.includes('.')) {
        responsePromise = respondToRoot();
    } else {
        responsePromise = respondToFile(url);
    }

    event.respondWith(responsePromise);
};

/**
 *
 */
const respondToRoot = async () => {
    const home = getSwHome(); // without trailing slash, e.g. https://foo.com/bar
    const cachedResponse = await caches.match(home + '/');
    const freshResponse = await fetchUrl(home + '/index.html?' + Math.random());
    if (freshResponse) {
        log('We are online.');
        if (cachedResponse) {
            log('We have cache.');
            const cachedText = await cachedResponse.clone().text();
            const freshText = await freshResponse.clone().text();
            if (cachedText !== freshText) {
                log('Something changed!');
                isUnregistered = true;
                await self.registration.unregister();
            }
        }
        return freshResponse;
    } else {
        log('We are offline!');
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
    // return cachedResponse || (await fetch(url)) || new Response(null, {status: 404});
    return cachedResponse || (await fetch(url));
};

/**
 *
 */
const log = (message) => {
    if (VERBOSE) {
        console.log(`SW (${currentVersion}): ` + message);
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default setupSw;
