import localforage from 'localforage';
import {TOKENS_KEY} from './SW.js';
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from '../../src/COMMON.js';
import requestJson from '../utils/requestJson.js';
import assume from '../utils/assume.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

/**
 *
 */
const refreshTokens = async () => {
    let tokens = await localforage.getItem(TOKENS_KEY);

    // const formData = new FormData();
    // formData.set('client_id', GOOGLE_CLIENT_ID);
    // formData.set('client_secret', GOOGLE_CLIENT_SECRET);
    // formData.set('refresh_token', tokens.refresh_token);
    // formData.set('grant_type', 'refresh_token');
    const freshTokens = await requestJson('https://oauth2.googleapis.com/token', {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        refresh_token: tokens.refresh_token,
        grant_type: 'refresh_token',
    });

    const freshAccess = freshTokens.access_token;
    assume(freshAccess, `Unexpected tokens shape after refresh! ${JSON.stringify(freshTokens)}`);
    console.log('freshTokens:', freshTokens);

    tokens = {...tokens, access_token: freshAccess};
    await localforage.setItem(TOKENS_KEY, tokens);

    return tokens;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default refreshTokens;
