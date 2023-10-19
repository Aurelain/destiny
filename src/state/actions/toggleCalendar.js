import {selectCalendars} from '../selectors.js';
import {setState} from '../store.js';
import requestEvents from './requestEvents.js';
import checkOffline from '../../system/checkOffline.js';
import requestApi from '../../system/requestApi.js';
import findCalendar from '../../system/findCalendar.js';
import CalendarSchema from '../../schemas/CalendarSchema.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const toggleCalendar = async (calendarId) => {
    let futureSelected;
    setState((state) => {
        const calendars = selectCalendars(state);
        const calendar = findCalendar(calendarId, calendars);
        calendar.selected = !calendar.selected;
        futureSelected = calendar.selected;
    });

    if (checkOffline()) {
        // TODO: add to pending operations
        return;
    }
    await requestApi(`https://www.googleapis.com/calendar/v3/users/me/calendarList/${calendarId}`, {
        method: 'PATCH',
        body: {
            selected: futureSelected,
        },
        schema: CalendarSchema,
    });

    if (futureSelected) {
        await requestEvents(); // TODO only request if we've never requested this calendar
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleCalendar;
