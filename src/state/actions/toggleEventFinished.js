import {getState, setState} from '../store.js';
import findEvent from '../../system/findEvent.js';
import {DONE_MARKER, DONE_MATCH} from '../../SETTINGS.js';
import saveEvent from '../../system/saveEvent.js';
import {selectCalendars, selectForcedDone} from '../selectors.js';
import findCalendar from '../../system/findCalendar.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleEventFinished = async (calendarId, eventId) => {
    const state = getState();
    const calendars = selectCalendars(state);
    const {isReadOnly} = findCalendar(calendarId, calendars);
    const {isLocked} = findEvent(state, calendarId, eventId);
    const isEditable = !isReadOnly && !isLocked;

    setState((state) => {
        if (isEditable) {
            const event = findEvent(state, calendarId, eventId);
            if (event.summary.match(DONE_MATCH)) {
                event.summary = event.summary.replace(DONE_MATCH, '');
            } else {
                event.summary = DONE_MARKER + event.summary;
            }
        } else {
            const forcedDone = selectForcedDone(state);
            if (forcedDone[eventId]) {
                delete forcedDone[eventId];
            } else {
                forcedDone[eventId] = true;
            }
        }
    });

    if (isEditable) {
        await saveEvent(calendarId, eventId);
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleEventFinished;
