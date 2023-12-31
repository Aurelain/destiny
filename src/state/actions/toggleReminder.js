import {setState} from '../store.js';
import findEvent from '../../system/findEvent.js';
import saveEvent from '../../system/saveEvent.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleReminder = async (calendarId, eventId) => {
    // Change the state as soon as possible, without waiting for the cloud:
    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        if (!event.reminders?.overrides?.length) {
            event.reminders = {
                useDefault: false,
                overrides: [
                    {
                        method: 'popup',
                        minutes: 0,
                    },
                ],
            };
        } else {
            event.reminders = {
                useDefault: false,
                overrides: [],
            };
        }
    });

    await saveEvent(calendarId, eventId);
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleReminder;
