import requestApi from '../../system/requestApi.js';
import getYYYYMMDD from '../../utils/getYYYYMMDD.js';
import {MILLISECONDS_IN_A_DAY} from '../../SETTINGS.js';
import EventSchema from '../../schemas/EventSchema.js';
import {selectEvents} from '../selectors.js';
import {setState} from '../store.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const scheduleEvent = async (calendarId, eventId, destination, start, end) => {
    const freshStart = parseDestination(destination, start);
    const freshEnd = parseDestination(destination, start); // TODO

    // Change the state as soon as possible, without waiting for the cloud:
    setState((state) => {
        const events = selectEvents(state);
        const event = events.find((event) => event.id === eventId && event.calendarId === calendarId);
        event.start = freshStart;
        event.end = freshEnd;
    });

    await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`, {
        method: 'PATCH',
        body: {
            start: {
                date: freshStart,
            },
            end: {
                date: freshEnd,
            },
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
const parseDestination = (destination, origin) => {
    if (destination === null) {
        // Move today
        return getYYYYMMDD(new Date());
    } else if (typeof destination === 'number') {
        // Move by a few days
        const originMillisecond = Number(new Date(origin));
        const destinationMillisecond = originMillisecond + destination * MILLISECONDS_IN_A_DAY;
        return getYYYYMMDD(new Date(destinationMillisecond));
    } else {
        // Move to a precise point in time
        // TODO
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default scheduleEvent;
