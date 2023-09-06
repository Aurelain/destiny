import localforage from 'localforage';
import {LOCAL_TOKENS_KEY} from '../system/SW.js';
import assume from '../utils/assume.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const setTokens = async (request) => {
    let tokens;
    try {
        tokens = await request.json();
    } catch (e) {
        throw new Error('Expecting json payload in request body!');
    }
    assume(tokens.access_token && tokens.refresh_token, 'Unexpected tokens shape!');
    await localforage.setItem(LOCAL_TOKENS_KEY, tokens);
    return true;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default setTokens;
