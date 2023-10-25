import {selectCalendars, selectEvents} from '../selectors.js';
import {getState, setState} from '../store.js';
import {MILLISECONDS_IN_A_DAY} from '../../SETTINGS.js';
import requestApi from '../../system/requestApi.js';
import EventsSchema from '../../schemas/EventsSchema.js';
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
    const result = await requestCalendarEvents(calendarId, lastWeek, nextMonth);
    const cleanEvents = result.items.map((event) => sanitizeAndEnhanceEvent(event, calendarId));
    return cleanEvents;
};

/**
 *
 */
const requestCalendarEvents = async (calendarId, timeMin, timeMax) => {
    return await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
        searchParams: {
            timeMin: new Date(timeMin).toISOString(),
            timeMax: new Date(timeMax).toISOString(),
            showDeleted: true,
            singleEvents: true,
            maxResults: 2000,
            // maxResults: 3,
            orderBy: 'startTime',
        },
        schema: EventsSchema,
        mock: mockCalendarEvents,
    });
};

/**
 *
 */
const mockCalendarEvents = (url) => {
    let items;
    if (url.includes('first')) {
        items = [
            {
                id: 'first1',
                calendarId: 'first',
                summary: 'Test',
                start: {dateTime: '2023-12-25T15:00:00+03:00'},
                end: {dateTime: '2023-12-25T16:00:00+03:00'},
                status: 'confirmed',
                reminders: {
                    useDefault: false,
                    overrides: [
                        {
                            method: 'popup',
                            minutes: 0,
                        },
                    ],
                },
            },
        ];
    } else if (url.includes('foo@gmail.com')) {
        items = [
            {
                id: 'foo1',
                calendarId: 'foo@gmail.com',
                summary: 'A Hello World',
                start: {date: '2023-10-25'},
                end: {date: '2023-10-25'},
                status: 'cancelled',
            },
            {
                id: 'foo2',
                calendarId: 'foo@gmail.com',
                summary: 'Borem ipsum dolor sit amet, https://www.google.com adipiscing elit. Phasellus aliquet est',
                start: {dateTime: '2023-10-25T16:00:00+03:00'},
                end: {dateTime: '2023-10-25T17:00:00+03:00'},
                status: 'confirmed',
                recurringEventId: 'myRecurringEventId',
            },
            {
                id: 'foo3',
                calendarId: 'foo@gmail.com',
                summary: `
                    Foo:
                    bar https://google.com ,
                    https://bing.com ,
                    hello Lorem ipsum dolor sit amet consectetuer adipiscing elit Phasellus aliquet est ut quam rutrum,
                    world, lorem ipsum
                `,
                start: {date: '2023-10-25'},
                end: {date: '2023-10-25'},
                status: 'confirmed',
            },
        ];
    } else {
        items = [
            {
                id: 'MyReadOnlyCalendar1',
                calendarId: 'MyReadOnlyCalendar',
                summary: 'My read-only event',
                start: {date: '2023-10-25'},
                end: {date: '2023-10-25'},
                status: 'confirmed',
            },
        ];
    }
    return {items};
};

/**
 *
 */
const sanitizeAndEnhanceEvent = (event, calendarId) => {
    const {id, summary, start, end, status, reminders, recurringEventId, recurrence, locked, visibility} = event;
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
        isLocked: locked || visibility === 'private',
    };
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestEvents;
