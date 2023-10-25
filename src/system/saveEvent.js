import requestApi from './requestApi.js';
import EventSchema from '../schemas/EventSchema.js';
import {selectCalendars} from '../state/selectors.js';
import {getState} from '../state/store.js';
import checkOffline from './checkOffline.js';
import findEvent from './findEvent.js';
import findCalendar from './findCalendar.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * We're using PUT to save the event because:
 * 1. the documentation recommends it
 * 2. the PATCH sometimes fails (for example, when switching between "all-day" timestamps and precise timestamps).
 */
const saveEvent = async (calendarId, eventId) => {
    if (checkOffline()) {
        // TODO: add to pending operations
        return;
    }

    // TODO ensure through ETAG that the event hasn't changed in the meantime

    const state = getState();
    const calendars = selectCalendars(state);
    const {timeZone} = findCalendar(calendarId, calendars);
    const existingEvent = findEvent(state, calendarId, eventId);
    // console.log('existingEvent: ' + JSON.stringify(existingEvent, null, 4));

    const {start, end, summary, reminders} = existingEvent;
    const patchProp = start.length === 10 ? 'date' : 'dateTime';

    await requestPut({calendarId, eventId, patchProp, start, end, timeZone, summary, reminders});
    // console.log('saveResult: ' + JSON.stringify(saveResult, null, 4));
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestPut = async ({calendarId, eventId, patchProp, start, end, timeZone, summary, reminders}) => {
    return await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`, {
        method: 'PUT',
        body: {
            start: {
                [patchProp]: start,
                timeZone,
            },
            end: {
                [patchProp]: end,
                timeZone,
            },
            summary,
            reminders,
        },
        schema: EventSchema,
        mock: {
            id: eventId,
            start: {
                [patchProp]: start,
                timeZone,
            },
            end: {
                [patchProp]: end,
                timeZone,
            },
            summary,
            reminders,
            status: 'confirmed',
        },
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default saveEvent;
