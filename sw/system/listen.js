import {ENDPOINT_LIST} from '../../src/COMMON.js';
import localforage from 'localforage';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ENDPOINTS = {
    [ENDPOINT_LIST]: respondToList,
};
// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const listen = () => {
    self.addEventListener('fetch', onFetch);
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const onFetch = async (event) => {
    const endpoint = event.request.url.split('/').pop();
    if (endpoint in ENDPOINTS) {
        event.respondWith(
            (async () => {
                const body = {};
                try {
                    body.data = await ENDPOINTS[endpoint]();
                } catch (e) {
                    body.error = e.message;
                }
                return new Response(JSON.stringify(body));
            })(),
        );
    }
};

/**
 *
 */
async function respondToList() {
    const access_token = await localforage.getItem('access_token');
    if (!access_token) {
        return;
    }
    return [];
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default listen;
