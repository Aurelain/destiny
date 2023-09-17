import './utils/interceptSwErrors.js';
import setupSw from './utils/setupSw.js';
import {
    ENDPOINT_GET_LIST,
    ENDPOINT_GET_USER,
    ENDPOINT_GET_VERSION,
    ENDPOINT_SET_TOKENS,
    VERSION,
} from '../src/COMMON.js';
import getList from './endpoints/getList.js';
import getVersion from './endpoints/getVersion.js';
import getUser from './endpoints/getUser.js';
import setTokens from './endpoints/setTokens.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const CACHED_PATHS = '@CACHED_PATHS'; // DO NOT EDIT MANUALLY! This is handled  by the build script.

const VIRTUAL_ENDPOINTS = {
    [ENDPOINT_GET_LIST]: getList,
    [ENDPOINT_GET_VERSION]: getVersion,
    [ENDPOINT_GET_USER]: getUser,
    [ENDPOINT_SET_TOKENS]: setTokens,
};

// TODO: find another way
const IGNORED_ENDPOINTS = {
    client: true, // https://accounts.google.com/gsi/client
    token: true, // https://oauth2.googleapis.com/token
    'dot.png': true, // ./meta/dot.png
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const run = async () => {
    await setupSw(VERSION, CACHED_PATHS, VIRTUAL_ENDPOINTS, IGNORED_ENDPOINTS);
};

// =====================================================================================================================
//  R U N
// =====================================================================================================================
run();
