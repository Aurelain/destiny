import {selectHiddenCalendars} from '../selectors.js';
import {setState} from '../store.js';
import requestEvents from './requestEvents.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleCalendar = async (calendarId) => {
    setState((state) => {
        // TODO: use `selected` from each calendar
        const hiddenCalendars = selectHiddenCalendars(state);
        if (calendarId in hiddenCalendars) {
            delete hiddenCalendars[calendarId];
        } else {
            hiddenCalendars[calendarId] = true;
        }
    });

    await requestEvents();
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleCalendar;
