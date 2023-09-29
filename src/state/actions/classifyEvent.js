import {selectEvents} from '../selectors.js';
import {setState} from '../store.js';
import checkOffline from '../../system/checkOffline.js';
import requestApi from '../../system/requestApi.js';
import EventSchema from '../../schemas/EventSchema.js';
import findEvent from '../../system/findEvent.js';
import sortEvents from '../../system/sortEvents.js';
import {DONE_MARKER, DONE_MATCH} from '../../SETTINGS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const classifyEvent = async (calendarId, eventId) => {
    let status;
    let summary;

    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        if (event.status === 'cancelled') {
            status = 'confirmed';
            event.status = status;
        } else if (event.summary.match(DONE_MATCH)) {
            summary = event.summary.replace(DONE_MATCH, '');
            event.summary = summary;
        } else {
            summary = DONE_MARKER + event.summary;
            event.summary = summary;
        }
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
            summary,
            status,
        },
        schema: EventSchema,
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default classifyEvent;
