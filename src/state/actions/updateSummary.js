import {selectEvents} from '../selectors.js';
import {setState} from '../store.js';
import sortEvents from '../../system/sortEvents.js';
import findEvent from '../../system/findEvent.js';
import toggleEvent from './toggleEvent.js';
import saveEvent from '../../system/saveEvent.js';

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

    await toggleEvent(eventId, true);
    await saveEvent(calendarId, eventId);
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default updateSummary;
