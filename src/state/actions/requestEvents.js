import {selectCalendars} from '../selectors.js';
import {getState, setState} from '../store.js';
import {MILLISECONDS_IN_A_DAY} from '../../SETTINGS.js';
import requestApi from '../../system/requestApi.js';
import CalendarEventsSchema from '../../schemas/CalendarEventsSchema.js';
import sortEvents from '../../system/sortEvents.js';
import checkOffline from '../../system/checkOffline.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestEvents = async () => {
    if (checkOffline()) {
        return;
    }

    const calendars = selectCalendars(getState());

    const events = [];
    for (const {id: calendarId} of calendars) {
        const calendarEvents = await getCalendarEvents(calendarId);
        events.push(...calendarEvents);
    }

    sortEvents(events);

    setState((state) => {
        state.events = events;
    });
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const getCalendarEvents = async (calendarId) => {
    const now = Date.now();
    const lastWeek = now - MILLISECONDS_IN_A_DAY;
    const nextMonth = now + 31 * MILLISECONDS_IN_A_DAY;
    const result = await requestApi('https://content.googleapis.com/calendar/v3/calendars/primary/events', {
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
        schema: CalendarEventsSchema,
    });
    const cleanEvents = result.items.map((event) => sanitizeAndEnhanceEvent(event, calendarId));
    return cleanEvents;
};

/**
 *
 */
const sanitizeAndEnhanceEvent = (event, calendarId) => {
    const {id, summary, start, end, status, reminders} = event;
    // if (summary.includes('nazurro')) {
    //     console.log('event: ' + JSON.stringify(event, null, 4));
    // }
    const unifiedStart = start.date || start.dateTime;
    const unifiedEnd = end.date || end.dateTime;
    return {
        id,
        calendarId,
        summary,
        start: unifiedStart,
        end: unifiedEnd,
        status,
        reminder: Boolean(reminders.overrides?.length),
    };
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestEvents;
