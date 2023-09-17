import localforage from 'localforage';
import {LOCAL_TOKENS_KEY} from './SW.js';
import assume from '../utils/assume.js';
import checkPojo from '../utils/checkPojo.js';
import requestJson from '../utils/requestJson.js';
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from '../../src/COMMON.js';
import writeTokens from './writeTokens.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const ensureTokens = async () => {
    const storedTokens = await readTokensFromStorage();
    if (Date.now() < storedTokens.expiration) {
        return storedTokens;
    } else {
        // Tokens expired
        await refreshTokens();
        return await readTokensFromStorage();
    }
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const readTokensFromStorage = async () => {
    const tokens = await localforage.getItem(LOCAL_TOKENS_KEY);
    assume(tokens, 'Tokens not found in database!');
    assume(checkPojo(tokens), `Unexpected tokens type! ${typeof tokens}`);
    assume(tokens.access_token && tokens.refresh_token, 'Unexpected tokens shape!');
    return tokens;
};

/**
 *
 */
const refreshTokens = async () => {
    let tokens = await localforage.getItem(LOCAL_TOKENS_KEY);

    const freshTokens = await requestJson('https://oauth2.googleapis.com/token', {
        body: {
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            refresh_token: tokens.refresh_token,
            grant_type: 'refresh_token',
        },
    });

    const freshAccess = freshTokens.access_token;
    assume(freshAccess, `Unexpected tokens shape after refresh! ${JSON.stringify(freshTokens)}`);
    tokens = {...tokens, access_token: freshAccess};

    await writeTokens(tokens);

    return tokens;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default ensureTokens;
