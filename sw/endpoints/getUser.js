import refreshTokens from '../system/refreshTokens.js';
import assume from '../utils/assume.js';
import requestJson from '../utils/requestJson.js';
import readTokens from '../system/readTokens.js';
import readUser from '../system/readUser.js';
import localforage from 'localforage';
import {LOCAL_USER_KEY, USE_MOCK} from '../system/SW.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const MOCK = {
    email: 'foo@bar.com',
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const getUser = async () => {
    if (USE_MOCK) {
        return MOCK;
    }

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

    // Cache the user for later use (e.g. when offline)
    await localforage.setItem(LOCAL_USER_KEY, user);

    return user;
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 * https://stackoverflow.com/a/72387301/844393
 */
const getUserProfileData = async (accessToken) => {
    const user = await requestJson('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        tolerateFail: true,
    });
    if (!user) {
        console.log('We are offline.');
        return await readUser();
    }
    return user;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getUser;
