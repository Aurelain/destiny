import {cleanupOutdatedCaches, precacheAndRoute} from 'workbox-precaching';
import {clientsClaim} from 'workbox-core';

self.skipWaiting();
clientsClaim();

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('message', (event) => {
    if (event.data?.type === 'DESTINY') {
        console.log('SW received:', event.data.payload);
        const reply = {type: 'DESTINY', payload: Math.random()};
        console.log('SW will reply:', reply.payload);
        event.source.postMessage(reply);
    }
});
