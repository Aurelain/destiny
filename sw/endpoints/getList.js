import {LOCAL_LIST_KEY} from '../system/SW.js';
import getList_MOCK from './getList_MOCK.js';
import {USE_MOCK} from '../../src/COMMON.js';
import checkOffline from '../utils/checkOffline.js';
import assume from '../utils/assume.js';
import localforage from 'localforage';
import requestApiEndpoint from '../system/requestApiEndpoint.js';

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

    const calendarsList = await getOnlineCalendarsList();
    const list = [];
    for (const {id} of calendarsList) {
        const events = await getOnlineEvents(id);
        list.push(...events);
    }

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
const getOnlineCalendarsList = async () => {
    const result = await requestApiEndpoint('https://www.googleapis.com/calendar/v3/users/me/calendarList');
    const list = result.items;
    assume(list, 'Calendar list is missing from online reply!');
    assume(Array.isArray(list), 'Unexpected calendar list type in online reply!');
    return list;
};

/**
 *
 */
const getOnlineEvents = async (calendarId) => {
    const result = await requestApiEndpoint('https://content.googleapis.com/calendar/v3/calendars/primary/events', {
        searchParams: {
            calendarId: calendarId,
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 9,
            orderBy: 'startTime',
        },
    });
    const list = result.items;
    assume(list, 'List is missing from online reply!');
    assume(Array.isArray(list), 'Unexpected list type in online reply!');
    return list;
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
