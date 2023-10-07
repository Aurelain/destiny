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
    const cloudEvent = await requestApi(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}/move`,
        {
            method: 'POST',
            searchParams: {
                destination: destinationCalendarId,
            },
            schema: EventSchema,
        },
    );
    setState((state) => {
        const event = findEvent(state, destinationCalendarId, eventId);
        event.id = cloudEvent.id; // from what we can tell, this hasn't changed
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default moveEvent;
