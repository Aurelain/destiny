import {selectHiddenCalendars} from '../selectors.js';
import {setState} from '../store.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleCalendar = (calendarId) => {
    setState((state) => {
        const hiddenCalendars = selectHiddenCalendars(state);
        if (calendarId in hiddenCalendars) {
            delete hiddenCalendars[calendarId];
        } else {
            hiddenCalendars[calendarId] = true;
        }
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleCalendar;
