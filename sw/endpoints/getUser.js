import refreshTokens from '../system/refreshTokens.js';
import assume from '../utils/assume.js';
import requestJson from '../utils/requestJson.js';
import readTokens from '../system/readTokens.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const getUser = async () => {
    let tokens = await readTokens();
    let user = await getUserProfileData(tokens.access_token);
    if (user.error) {
        // Either the `access_token` is wrong, or it expired. We'll assume it expired...
        tokens = await refreshTokens();

        // Try again, with the new tokens
        user = await getUserProfileData(tokens.access_token);
    }
    assume(!user.error, user.error + ': ' + user.error_description);
    assume(user.email, 'Missing email from user info!');
    return user;
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 * https://stackoverflow.com/a/72387301/844393
 */
const getUserProfileData = async (accessToken) => {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${accessToken}`);
    const user = await requestJson('https://www.googleapis.com/oauth2/v3/userinfo', null, {headers});
    return user;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getUser;
