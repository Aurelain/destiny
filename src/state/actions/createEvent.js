import requestApi from '../../system/requestApi.js';
import getYYYYMMDD from '../../utils/getYYYYMMDD.js';
import EventSchema from '../../schemas/EventSchema.js';
import {selectCalendars, selectEvents} from '../selectors.js';
import {getState, setState} from '../store.js';
import sortEvents from '../../system/sortEvents.js';
import checkOffline from '../../system/checkOffline.js';
import findEvent from '../../system/findEvent.js';
import toggleEvent from './toggleEvent.js';
import sanitizeSummary from '../../system/sanitizeSummary.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const createEvent = async (summary) => {
    const today = getYYYYMMDD();
    const eventId = Math.random().toString();
    summary = sanitizeSummary(summary);

    const state = getState();
    const calendars = selectCalendars(state);
    const calendarId = calendars.find((calendar) => calendar.primary).id;

    // Change the state as soon as possible, without waiting for the cloud:
    setState((state) => {
        const events = selectEvents(state);
        events.push({
            id: eventId,
            calendarId,
            summary,
            start: today,
            end: today,
            status: 'confirmed',
            reminders: false,
        });
        sortEvents(events);
    });

    toggleEvent(eventId, true);

    if (checkOffline()) {
        // TODO: add to pending operations
        return;
    }
    const cloudEvent = await requestApi(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
        method: 'POST',
        body: {
            summary,
            start: {
                date: today,
            },
            end: {
                date: today,
            },
            reminders: {
                useDefault: false,
            },
        },
        schema: EventSchema,
    });

    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        event.id = cloudEvent.id;
        state.options.expandedEvents = {
            [event.id]: true,
        };
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default createEvent;
