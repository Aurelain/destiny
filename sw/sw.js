import './utils/interceptSwErrors.js';
import setupSw from './utils/setupSw.js';
import {ENDPOINT_GET_LIST, ENDPOINT_GET_USER, ENDPOINT_GET_VERSION, VERSION} from '../src/COMMON.js';
import getList from './endpoints/getList.js';
import getVersion from './endpoints/getVersion.js';
import getUser from './endpoints/getUser.js';

const CACHED_PATHS = '@CACHED_PATHS'; // DO NOT EDIT MANUALLY! This is handled  by the build script.

const VIRTUAL_ENDPOINTS = {
    [ENDPOINT_GET_LIST]: getList,
    [ENDPOINT_GET_VERSION]: getVersion,
    [ENDPOINT_GET_USER]: getUser,
};

// TODO: find another way
const IGNORED_ENDPOINTS = {
    client: true, // https://accounts.google.com/gsi/client
    token: true, // https://oauth2.googleapis.com/token
};

/**
 *
 */
const run = async () => {
    await setupSw(VERSION, CACHED_PATHS, VIRTUAL_ENDPOINTS, IGNORED_ENDPOINTS);
};

run();
