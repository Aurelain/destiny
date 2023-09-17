import requestJson from '../utils/requestJson.js';
import {LOCAL_LIST_KEY, USE_MOCK} from '../system/SW.js';
import getList_MOCK from './getList_MOCK.js';
import ensureTokens from '../system/ensureTokens.js';
import checkOffline from '../utils/checkOffline.js';
import assume from '../utils/assume.js';
import localforage from 'localforage';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function getList() {
    if (USE_MOCK) {
        return getList_MOCK.items;
    }

    if (await checkOffline()) {
        return await readListFromStorage();
    }

    const list = await getOnlineEvents();

    // Cache the list for later use (e.g. when offline)
    await localforage.setItem(LOCAL_LIST_KEY, list);

    return list;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const getOnlineEvents = async () => {
    const tokens = await ensureTokens();
    const result = await requestJson('https://content.googleapis.com/calendar/v3/calendars/primary/events', {
        searchParams: {
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 9,
            orderBy: 'startTime',
        },
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        },
    });
    const list = result.items;
    assume(list, 'List is missing from online reply!');
    assume(Array.isArray(list), 'Unexpected list type in online reply!');
    return result.items;
};

/**
 *
 */
const readListFromStorage = async () => {
    const list = await localforage.getItem(LOCAL_LIST_KEY);
    assume(list, 'List is missing from storage!');
    assume(Array.isArray(list), 'Unexpected list type in storage!');
    return list;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getList;
