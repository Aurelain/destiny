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

    await requestCalendarPatch(calendarId, futureSelected);

    if (futureSelected) {
        await requestEvents(calendarId);
    }
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestCalendarPatch = async (calendarId, selected) => {
    return await requestApi(`https://www.googleapis.com/calendar/v3/users/me/calendarList/${calendarId}`, {
        method: 'PATCH',
        body: {
            selected,
        },
        schema: CalendarSchema,
        mock: {
            selected,
            // TODO: properly mock the other props...
            id: 'foo',
            summary: 'foo',
            backgroundColor: '#f4511e',
            timeZone: 'foo',
            accessRole: 'owner',
            primary: true,
        },
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default toggleCalendar;
