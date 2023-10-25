import requestApi from '../../system/requestApi.js';
import {setState} from '../store.js';
import checkOffline from '../../system/checkOffline.js';
import findEvent from '../../system/findEvent.js';
import EventSchema from '../../schemas/EventSchema.js';
import sortEvents from '../../system/sortEvents.js';
import {selectEvents} from '../selectors.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const moveEvent = async (calendarId, eventId, destinationCalendarId) => {
    // TODO: ensure this is not a recurring event, to avoid "cannotChangeOrganizerOfInstance"

    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        event.calendarId = destinationCalendarId;
        const events = selectEvents(state);
        sortEvents(events);
    });

    if (checkOffline()) {
        // TODO: add to pending operations
        return;
    }

    const cloudEvent = await requestMove(calendarId, eventId, destinationCalendarId);

    setState((state) => {
        const event = findEvent(state, destinationCalendarId, eventId);
        event.id = cloudEvent.id; // from what we can tell, this hasn't changed
    });
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const requestMove = async (calendarId, eventId, destinationCalendarId) => {
    return await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}/move`, {
        method: 'POST',
        searchParams: {
            destination: destinationCalendarId,
        },
        schema: EventSchema,
        mock: {
            id: eventId,
            // TODO: properly mock the other props...
            start: {date: '2023-10-25'},
            end: {date: '2023-10-25'},
            status: 'confirmed',
        },
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default moveEvent;
