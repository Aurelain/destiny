import requestApi from '../../system/requestApi.js';
import getYYYYMMDD from '../../utils/getYYYYMMDD.js';
import {MILLISECONDS_IN_A_DAY} from '../../SETTINGS.js';
import EventSchema from '../../schemas/EventSchema.js';
import {selectEvents} from '../selectors.js';
import {setState} from '../store.js';
import sortEvents from '../../system/sortEvents.js';
import checkOffline from '../../system/checkOffline.js';
import findEvent from '../../system/findEvent.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const scheduleEvent = async (calendarId, eventId, destination, start, end) => {
    const patchProp = start.length === 10 ? 'date' : 'dateTime';
    const freshStart = parseDestination(destination, start);
    const freshEnd = parseDestination(destination, end);

    // Change the state as soon as possible, without waiting for the cloud:
    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        event.start = freshStart;
        event.end = freshEnd;
        const events = selectEvents(state);
        sortEvents(events);
    });

    if (checkOffline()) {
        // TODO: add to pending operations
        return;
    }
    await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`, {
        method: 'PATCH',
        body: {
            start: {
                [patchProp]: freshStart,
            },
            end: {
                [patchProp]: freshEnd,
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
        const today = getYYYYMMDD();
        return today + origin.substring(10);
    } else if (typeof destination === 'number') {
        // Move by a few days
        const originDay = getYYYYMMDD(origin);
        const originMorningMillisecond = Number(new Date(originDay));
        const destinationMorningMillisecond = originMorningMillisecond + destination * MILLISECONDS_IN_A_DAY;
        const destinationDay = getYYYYMMDD(new Date(destinationMorningMillisecond));
        return destinationDay + origin.substring(10);
    } else {
        // Move to a precise point in time
        // TODO
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default scheduleEvent;
