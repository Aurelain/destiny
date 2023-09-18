import {IDB_STORE_KEY} from '../system/SW.js';
import {USE_MOCK} from '../../src/COMMON.js';
import checkOffline from '../utils/checkOffline.js';
import assume from '../utils/assume.js';
import localforage from 'localforage';
import requestApiEndpoint from '../system/requestApiEndpoint.js';
import getStore_MOCK from './getStore_MOCK.js';
import CalendarEventsSchema from '../../src/schemas/CalendarEventsSchema.js';
import CalendarsSchema from '../../src/schemas/CalendarsSchema.js';
import EventsSchema from '../../src/schemas/EventsSchema.js';
import UserSchema from '../../src/schemas/UserSchema.js';
import validateJson from '../../src/utils/validateJson.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function getStore() {
    if (USE_MOCK) {
        return getStore_MOCK;
    }

    if (await checkOffline()) {
        return await readStoreFromIdb();
    }

    const user = await getUser();
    const calendars = await getCalendars();

    const events = [];
    for (const {id} of calendars.items) {
        const eventsReply = await getCalendarEvents(id);
        events.push(...eventsReply.items);
    }

    const database = {
        user,
        calendars,
        events,
    };

    // Cache the store for later use (e.g. when offline)
    await localforage.setItem(IDB_STORE_KEY, database);

    return database;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const getUser = async () => {
    return await requestApiEndpoint('https://www.googleapis.com/oauth2/v3/userinfo', UserSchema);
};

/**
 *
 */
const getCalendars = async () => {
    return await requestApiEndpoint('https://www.googleapis.com/calendar/v3/users/me/calendarList', CalendarsSchema);
};

/**
 *
 */
const getCalendarEvents = async (calendarId) => {
    return await requestApiEndpoint(
        'https://content.googleapis.com/calendar/v3/calendars/primary/events',
        CalendarEventsSchema,
        {
            searchParams: {
                calendarId: calendarId,
                timeMin: new Date().toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 9,
                orderBy: 'startTime',
            },
        },
    );
};

/**
 *
 */
const readStoreFromIdb = async () => {
    const store = await localforage.getItem(IDB_STORE_KEY);
    assume(store, 'Store is missing from IDB!');
    validateJson(store.user, UserSchema);
    validateJson(store.calendars, CalendarsSchema);
    validateJson(store.events, EventsSchema);
    return store;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getStore;
