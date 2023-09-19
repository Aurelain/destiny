import './utils/interceptSwErrors.js';
import setupSw from './utils/setupSw.js';
import {ENDPOINT_GET_STORE, ENDPOINT_GET_VERSION, ENDPOINT_SET_TOKENS, VERSION} from '../src/COMMON.js';
import getVersion from './endpoints/getVersion.js';
import setTokens from './endpoints/setTokens.js';
import getStore from './endpoints/getStore.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const CACHED_PATHS = '@CACHED_PATHS'; // DO NOT EDIT MANUALLY! This is handled  by the build script.

const VIRTUAL_ENDPOINTS = {
    [ENDPOINT_GET_VERSION]: getVersion,
    [ENDPOINT_SET_TOKENS]: setTokens,
    [ENDPOINT_GET_STORE]: getStore,
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
