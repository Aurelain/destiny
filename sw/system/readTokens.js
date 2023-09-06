import localforage from 'localforage';
import {TOKENS_KEY} from './SW.js';
import assume from '../utils/assume.js';
import checkPojo from '../utils/checkPojo.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

/**
 *
 */
const readTokens = async () => {
    let tokens;
    try {
        tokens = await localforage.getItem(TOKENS_KEY);
    } catch (e) {
        throw new Error('No linked account!');
    }

    assume(checkPojo(tokens), 'Unexpected tokens type!');
    assume(tokens.access_token && tokens.refresh_token, 'Unexpected tokens shape!');
    return tokens;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default readTokens;
