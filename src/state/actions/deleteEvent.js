import requestApi from '../../system/requestApi.js';
import {setState} from '../store.js';
import checkOffline from '../../system/checkOffline.js';
import findEvent from '../../system/findEvent.js';
import assume from '../../utils/assume.js';
import {USE_MOCK} from '../../SETTINGS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const deleteEvent = async (calendarId, eventId) => {
    // Change the state as soon as possible, without waiting for the cloud:
    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        event.status = 'cancelled';
    });

    if (checkOffline()) {
        // TODO: add to pending operations
        return;
    }

    if (USE_MOCK) {
        return;
    }

    const response = await requestApi(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
        {
            method: 'DELETE',
        },
    );
    assume(!response, 'Expecting empty body!');
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default deleteEvent;
