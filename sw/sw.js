import './utils/interceptSwErrors.js';
import {cleanupOutdatedCaches, precacheAndRoute} from 'workbox-precaching';
import {clientsClaim} from 'workbox-core';
import listen from './system/listen.js';

/**
 *
 */
const run = async () => {
    self.skipWaiting();
    clientsClaim();
    cleanupOutdatedCaches();
    precacheAndRoute(self.__WB_MANIFEST);

    listen();
};

run();
