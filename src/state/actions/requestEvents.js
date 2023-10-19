import {selectCalendars, selectEvents} from '../selectors.js';
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
const requestEvents = async (calendarId) => {
    if (checkOffline()) {
        return;
    }

    const state = getState();
    const calendars = selectCalendars(state);
    const events = [];

    if (calendarId) {
        const existingEvents = selectEvents(state);
        const staticEvents = existingEvents.filter((event) => event.calendarId !== calendarId);
        const freshEvents = await getCalendarEvents(calendarId);
        events.push(...staticEvents, ...freshEvents);
    } else {
        for (const {id: calendarId, selected} of calendars) {
            if (selected) {
                const calendarEvents = await getCalendarEvents(calendarId);
                events.push(...calendarEvents);
            }
        }
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
    const lastWeek = now - 7 * MILLISECONDS_IN_A_DAY;
    const nextMonth = now + 31 * MILLISECONDS_IN_A_DAY;
    const result = await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
        searchParams: {
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
    const {id, summary, start, end, status, reminders, recurringEventId, recurrence} = event;
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
        reminders,
        recurringEventId,
        recurrence: recurrence ? recurrence[0] : undefined,
    };
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestEvents;
