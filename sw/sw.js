import './utils/interceptSwErrors.js';
import setupSw from './utils/setupSw.js';
import {ENDPOINT_GET_LIST, ENDPOINT_GET_VERSION, VERSION} from '../src/COMMON.js';
import getList from './endpoints/getList.js';
import getVersion from './endpoints/getVersion.js';

const CACHED_PATHS = [
    '/', // e.g. https://aurelain.github.io/destiny/
    '/index.html',
    '/assets/xxx.js',
];

const VIRTUAL_ENDPOINTS = {
    [ENDPOINT_GET_LIST]: getList,
    [ENDPOINT_GET_VERSION]: getVersion,
};

/**
 *
 */
const run = async () => {
    setupSw(VERSION, CACHED_PATHS, VIRTUAL_ENDPOINTS);
};

run();
