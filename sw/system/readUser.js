import localforage from 'localforage';
import {LOCAL_USER_KEY} from './SW.js';
import assume from '../utils/assume.js';
import checkPojo from '../utils/checkPojo.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

/**
 *
 */
const readUser = async () => {
    let user;
    try {
        user = await localforage.getItem(LOCAL_USER_KEY);
    } catch (e) {
        throw new Error('No cached user!');
    }
    assume(checkPojo(user), 'Unexpected user type!');
    assume(user.email, 'Unexpected user shape!');
    return user;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default readUser;
