import assume from '../utils/assume.js';
import requestJson from '../utils/requestJson.js';
import localforage from 'localforage';
import {LOCAL_USER_KEY, USE_MOCK} from '../system/SW.js';
import getUser_MOCK from './getUser_MOCK.js';
import ensureTokens from '../system/ensureTokens.js';
import checkPojo from '../utils/checkPojo.js';
import checkOffline from '../utils/checkOffline.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const getUser = async () => {
    if (USE_MOCK) {
        return getUser_MOCK;
    }

    if (await checkOffline()) {
        return await readUserFromStorage();
    }

    const user = await getOnlineUserProfileData();

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
const getOnlineUserProfileData = async () => {
    const tokens = await ensureTokens();
    const user = await requestJson('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        },
    });
    assume(!user.error, user.error + ': ' + user.error_description);
    assume(user.email, 'Missing email from online user info!');
    return user;
};

/**
 *
 */
const readUserFromStorage = async () => {
    const user = await localforage.getItem(LOCAL_USER_KEY);
    assume(user, 'User not found in storage!');
    assume(checkPojo(user), 'Unexpected user type in storage!');
    assume(user.email, 'Missing email from user in storage!');
    return user;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getUser;
