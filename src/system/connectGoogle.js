import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from '../COMMON.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const connectGoogle = async () => {
    const client = window.google.accounts.oauth2.initCodeClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar',
        ux_mode: 'popup',
        access_type: 'offline',
        callback: async (response) => {
            const formData = new FormData();
            formData.set('client_id', GOOGLE_CLIENT_ID);
            formData.set('client_secret', GOOGLE_CLIENT_SECRET);
            formData.set('code', response.code);
            formData.set('grant_type', 'authorization_code');
            formData.set('redirect_uri', window.location.href.replace(/\/$/, ''));
            const fetchResponse = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                body: formData,
            });
            const fetchJson = await fetchResponse.json();
            console.log('fetchJson:', fetchJson);
            // window.localStorage.access_token = fetchJson.access_token;
            // window.localStorage.refresh_token = fetchJson.refresh_token;
            // window.localStorage.token_response = JSON.stringify(fetchJson);
        },
    });
    client.requestCode();
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default connectGoogle;
