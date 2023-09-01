import announceClients from './announceClients.js';
import {VERSION} from '../../src/COMMON.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Service_workers
 */
const setupSw = (version, cachedPaths, virtualEndpoints) => {
    console.log('SW: Setup of', version);
    self.skipWaiting();

    self.addEventListener('install', (event) => {
        console.log('SW: Install of', version);
        event.waitUntil(
            (async () => {
                const cache = await caches.open(version);
                //await cache.addAll(cachedPaths);
            })(),
        );
    });

    self.addEventListener('activate', (event) => {
        console.log('SW: Activation of', version);
        event.waitUntil(
            (async () => {
                const names = await caches.keys();
                await Promise.all(
                    names.map((name) => {
                        if (name !== version) {
                            return caches.delete(name);
                        }
                    }),
                );
                await self.clients.claim();
            })(),
        );
        announceClients({type: 'ACTIVATED', version: VERSION});
    });

    self.addEventListener('fetch', (event) => {
        // console.log('event.request.url:', event.request.url);
        const endpoint = event.request.url.split('/').pop();
        if (endpoint in virtualEndpoints) {
            event.respondWith(
                (async () => {
                    const body = {};
                    try {
                        body.data = await virtualEndpoints[endpoint]();
                    } catch (e) {
                        body.error = e.message;
                    }
                    return new Response(JSON.stringify(body));
                })(),
            );
            return;
        }
        return;
        // when seeking an HTML page
        if (event.request.mode === 'navigate') {
            // Return to the index.html page
            event.respondWith(caches.match('/'));
            return;
        }

        // For every other request type
        event.respondWith(
            (async () => {
                const cache = await caches.open(version);
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) {
                    // Return the cached response if it's available.
                    return cachedResponse;
                } else {
                    // Respond with an HTTP 404 response status.
                    return new Response(null, {status: 404});
                }
            })(),
        );
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default setupSw;
