import requestApi from '../../system/requestApi.js';
import getYYYYMMDD from '../../utils/getYYYYMMDD.js';
import {MILLISECONDS_IN_A_DAY} from '../../SETTINGS.js';
import EventSchema from '../../schemas/EventSchema.js';
import {selectCalendars, selectEvents} from '../selectors.js';
import {getState, setState} from '../store.js';
import sortEvents from '../../system/sortEvents.js';
import checkOffline from '../../system/checkOffline.js';
import findEvent from '../../system/findEvent.js';
import toggleEvent from './toggleEvent.js';
import findCalendar from '../../system/findCalendar.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const scheduleEvent = async (calendarId, eventId, destination) => {
    const {freshStart, freshEnd} = analyzeDestination(calendarId, eventId, destination);
    const patchProp = freshStart.length === 10 ? 'date' : 'dateTime';

    // Change the state as soon as possible, without waiting for the cloud:
    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        event.start = freshStart;
        event.end = freshEnd;
        const events = selectEvents(state);
        sortEvents(events);
    });

    toggleEvent(eventId, false);

    if (checkOffline()) {
        // TODO: add to pending operations
        return;
    }

    /*
    Note: We're using PUT instead of PATCH because the PATCH fails when switching an event from "all-day" to a
    precise timestamp or the other way around.
     */

    const state = getState();
    const calendars = selectCalendars(state);
    const {timeZone} = findCalendar(calendarId, calendars);
    const existingEvent = findEvent(state, calendarId, eventId);
    await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`, {
        method: 'PUT',
        body: {
            start: {
                [patchProp]: freshStart,
                timeZone,
            },
            end: {
                [patchProp]: freshEnd,
                timeZone,
            },
            // Ensure we don't lose the other properties, since we're using `update` (PUT):
            summary: existingEvent.summary,
            reminders: existingEvent.reminders,
        },
        schema: EventSchema,
    });
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const analyzeDestination = (calendarId, eventId, destination) => {
    let freshStart;
    let freshEnd;
    if (typeof destination === 'number') {
        // Move by a few days
        const state = getState();
        const event = findEvent(state, calendarId, eventId);
        const {start, end} = event;
        freshStart = getOffsetDestination(destination, start);
        freshEnd = getOffsetDestination(destination, end);
    } else {
        freshStart = destination.start;
        freshEnd = destination.end;
    }
    return {freshStart, freshEnd};
};

/**
 *
 */
const getOffsetDestination = (destination, origin) => {
    const originDay = getYYYYMMDD(origin);
    const originMorningMillisecond = Number(new Date(originDay));
    const destinationMorningMillisecond = originMorningMillisecond + destination * MILLISECONDS_IN_A_DAY;
    const destinationDay = getYYYYMMDD(new Date(destinationMorningMillisecond));
    return destinationDay + origin.substring(10);
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default scheduleEvent;
