import requestApi from '../../system/requestApi.js';
import EventSchema from '../../schemas/EventSchema.js';
import {selectEvents} from '../selectors.js';
import {setState} from '../store.js';
import sortEvents from '../../system/sortEvents.js';
import checkOffline from '../../system/checkOffline.js';
import findEvent from '../../system/findEvent.js';
import toggleEvent from './toggleEvent.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const updateSummary = async (calendarId, eventId, summary) => {
    // Change the state as soon as possible, without waiting for the cloud:
    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        event.summary = summary;
        const events = selectEvents(state);
        sortEvents(events);
    });

    toggleEvent(eventId, true);

    if (checkOffline()) {
        // TODO: add to pending operations
        return;
    }
    await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`, {
        method: 'PATCH',
        body: {
            summary,
        },
        schema: EventSchema,
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default updateSummary;
