import requestApi from '../../system/requestApi.js';
import EventSchema from '../../schemas/EventSchema.js';
import {setState} from '../store.js';
import checkOffline from '../../system/checkOffline.js';
import findEvent from '../../system/findEvent.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleReminder = async (calendarId, eventId) => {
    const overrides = [];

    // Change the state as soon as possible, without waiting for the cloud:
    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        if (event.reminder) {
            event.reminder = false;
        } else {
            overrides.push({
                method: 'popup',
                minutes: 0,
            });
            event.reminder = true;
        }
    });

    if (checkOffline()) {
        // TODO: add to pending operations
        return;
    }
    await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`, {
        method: 'PATCH',
        body: {
            reminders: {
                useDefault: false,
                overrides,
            },
        },
        schema: EventSchema,
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleReminder;
