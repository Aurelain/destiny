import {IDB_STORE_KEY, MILLISECONDS_IN_A_DAY} from '../system/SW.js';
import {USE_MOCK} from '../../src/COMMON.js';
import checkOffline from '../utils/checkOffline.js';
import localforage from 'localforage';
import requestApiEndpoint from '../system/requestApiEndpoint.js';
import getStore_MOCK from './getStore_MOCK.js';
import CalendarEventsSchema from '../../src/schemas/CalendarEventsSchema.js';
import CalendarsSchema from '../../src/schemas/CalendarsSchema.js';
import UserSchema from '../../misc/UnusedSchemas/UserSchema.js';
import validateJson from '../../src/utils/validateJson.js';
import StoreSchema from '../../src/schemas/StoreSchema.js';
import convertColor from '../system/convertColor.js';
import StoreEmpty from '../../src/schemas/StoreEmpty.js';

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

    const idbStore = await readStoreFromIdb();
    if (await checkOffline()) {
        // TODO: handle offline better
        return idbStore;
    }

    const user = await getUser();
    const calendars = await getCalendars();

    const events = [];
    for (const {id: calendarId} of calendars) {
        const calendarEvents = await getCalendarEvents(calendarId);
        events.push(...calendarEvents);
    }
    events.sort(compareEvents);

    const database = {
        user,
        calendars,
        events,
        options: idbStore.options,
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
const readStoreFromIdb = async () => {
    let store = await localforage.getItem(IDB_STORE_KEY);
    try {
        validateJson(store, StoreSchema);
        return store;
    } catch (e) {
        return StoreEmpty;
    }
};

/**
 *
 */
const getUser = async () => {
    const result = await requestApiEndpoint('https://www.googleapis.com/oauth2/v3/userinfo', UserSchema);
    return {
        email: result.email,
    };
};

/**
 *
 */
const getCalendars = async () => {
    const result = await requestApiEndpoint(
        'https://www.googleapis.com/calendar/v3/users/me/calendarList',
        CalendarsSchema,
    );
    const output = [];
    for (const {id, summary, backgroundColor} of result.items) {
        output.push({
            id,
            summary,
            backgroundColor: convertColor(backgroundColor),
        });
    }
    return output;
};

/**
 *
 */
const getCalendarEvents = async (calendarId) => {
    const now = Date.now();
    const lastWeek = now - MILLISECONDS_IN_A_DAY;
    const nextMonth = now + 31 * MILLISECONDS_IN_A_DAY;
    const result = await requestApiEndpoint(
        'https://content.googleapis.com/calendar/v3/calendars/primary/events',
        CalendarEventsSchema,
        {
            searchParams: {
                calendarId: calendarId,
                timeMin: new Date(lastWeek).toISOString(),
                timeMax: new Date(nextMonth).toISOString(),
                showDeleted: true,
                singleEvents: true,
                maxResults: 2000,
                // maxResults: 3,
                orderBy: 'startTime',
            },
        },
    );
    const cleanEvents = result.items.map((event) => sanitizeAndEnhanceEvent(event, calendarId));
    return cleanEvents;
};

/**
 *
 */
const sanitizeAndEnhanceEvent = (event, calendarId) => {
    const {id, summary, start, end} = event;
    const unifiedStart = start.date || start.dateTime;
    const unifiedEnd = end.date || end.dateTime;
    return {
        id,
        calendarId,
        summary,
        start: unifiedStart,
        end: unifiedEnd,
    };
};

/**
 *
 */
const compareEvents = (a, b) => {
    if (a.start < b.start) {
        return -1;
    } else if (a.start > b.start) {
        return 1;
    } else {
        if (a.summary < b.summary) {
            return -1;
        } else if (a.summary > b.summary) {
            return 1;
        } else {
            return 0;
        }
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getStore;
