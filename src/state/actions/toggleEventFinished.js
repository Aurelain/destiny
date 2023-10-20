import {setState} from '../store.js';
import findEvent from '../../system/findEvent.js';
import {DONE_MARKER, DONE_MATCH} from '../../SETTINGS.js';
import saveEvent from '../../system/saveEvent.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleEventFinished = async (calendarId, eventId) => {
    setState((state) => {
        const event = findEvent(state, calendarId, eventId);
        if (event.summary.match(DONE_MATCH)) {
            event.summary = event.summary.replace(DONE_MATCH, '');
        } else {
            event.summary = DONE_MARKER + event.summary;
        }
    });
    await saveEvent(calendarId, eventId);
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleEventFinished;
