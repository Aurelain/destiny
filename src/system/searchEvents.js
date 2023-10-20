import requestApi from './requestApi.js';
import {selectCalendars, selectEvents} from '../state/selectors.js';
import {getState} from '../state/store.js';
import checkOffline from './checkOffline.js';
import EventsSchema from '../schemas/EventsSchema.js';
import {MILLISECONDS_IN_A_DAY} from '../SETTINGS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const searchEvents = async (query, isSmart = false) => {
    const state = getState();
    const events = selectEvents(state);
    const offlineEvents = events.filter((event) => event.summary.includes(query));

    if (checkOffline()) {
        return offlineEvents;
    }

    const calendarIds = [];
    if (isSmart && offlineEvents.length) {
        calendarIds.push(offlineEvents[0].calendarId);
    } else {
        const calendars = selectCalendars(state);
        calendarIds.push(...calendars.map((calendar) => calendar.id));
    }

    const now = Date.now();
    const lastMonth = now - 31 * MILLISECONDS_IN_A_DAY;
    const nextMonth = now + 31 * MILLISECONDS_IN_A_DAY;
    const onlineEvents = [];
    for (const calendarId of calendarIds) {
        const foundEvents = await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
            searchParams: {
                calendarId,
                timeMin: new Date(lastMonth).toISOString(),
                timeMax: new Date(nextMonth).toISOString(),
                showDeleted: true,
                singleEvents: true,
                maxResults: 2000,
                orderBy: 'startTime',
                q: query,
            },
            schema: EventsSchema,
        });
        // TODO: use the list
        for (const event of foundEvents.items) {
            onlineEvents.push({
                ...event,
                calendarId,
            });
        }
    }

    return onlineEvents;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default searchEvents;
