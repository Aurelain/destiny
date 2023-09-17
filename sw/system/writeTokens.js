import localforage from 'localforage';
import {LOCAL_TOKENS_KEY} from './SW.js';
import assume from '../utils/assume.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const writeTokens = async (tokens) => {
    assume(tokens.access_token && tokens.refresh_token && tokens.expires_in, 'Unexpected tokens shape!');
    tokens.expiration = Date.now() + tokens.expires_in * 1000;
    console.log('Storing tokens...', tokens);
    await localforage.setItem(LOCAL_TOKENS_KEY, tokens);
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default writeTokens;
