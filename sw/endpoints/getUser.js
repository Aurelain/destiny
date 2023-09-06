import localforage from 'localforage';
import {TOKENS_KEY} from '../system/SW.js';
import refreshTokens from '../system/refreshTokens.js';
import assume from '../utils/assume.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const getUser = async () => {
    let tokens = await localforage.getItem(TOKENS_KEY);
    assume(tokens, 'Calendar is not linked!');

    let user = await getUserProfileData(tokens.access_token);
    if (!user) {
        // Either the access_token is wrong, or it expired
        // Assume it expired...
        tokens = await refreshTokens();

        // Try again, with the new tokens
        user = await getUserProfileData(tokens.access_token);

        assume(user, 'Cannot get user profile!');
    }
    assume(!user.error, user.error + ': ' + user.error_description);
    assume(user.email, 'Missing email from user info!');
    return user;
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const getUserProfileData = async (accessToken) => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);
    headers.append('Accept', 'application/json');
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`, {
        headers,
    });
    const data = await response.json();
    return data;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getUser;
