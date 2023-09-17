import {ENDPOINT_SET_TOKENS, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from '../COMMON.js';
import requestEndpoint from './requestEndpoint.js';
import embedScriptFile from '../utils/embedScriptFile.js';
import assume from '../utils/assume.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let currentResolve;
const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/userinfo.email'];

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const connectGoogle = async () => {
    await embedScriptFile('https://accounts.google.com/gsi/client');
    const initCodeClient = window.google?.accounts?.oauth2?.initCodeClient;
    assume(typeof initCodeClient === 'function', 'Invalid gis library!');

    return new Promise((resolve) => {
        currentResolve = resolve;

        // https://developers.google.com/identity/oauth2/web/guides/use-code-model
        const client = initCodeClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: SCOPES.join(' '),
            ux_mode: 'popup',
            access_type: 'offline',
            callback: onCodeReceived,
        });
        client.requestCode();
    });
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 * The response is an object with the following shape:
 * {
 *     code: '4/0Adeu5BVGLv0I5DIl2iOh-3AXiy6dCqBI6ENrUBrdra0009gwKGAqsjz3r-oEDJgO0RDDxQ',
 *     scope: 'https://www.googleapis.com/auth/calendar',
 * }
 */
const onCodeReceived = async (response) => {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: JSON.stringify({
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            code: response.code,
            grant_type: 'authorization_code',
            redirect_uri: window.location.origin,
        }),
    });
    const tokens = await tokenResponse.json();
    console.log('tokens from google:', tokens);

    const backEndReply = await requestEndpoint(ENDPOINT_SET_TOKENS, tokens);
    console.log('backEndReply:', backEndReply);
    currentResolve(backEndReply);

    // window.localStorage.access_token = fetchJson.access_token;
    // window.localStorage.refresh_token = fetchJson.refresh_token;
    // window.localStorage.token_response = JSON.stringify(fetchJson);
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default connectGoogle;
