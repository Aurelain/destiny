import {getState, setState} from '../store.js';
import requestApi from '../../system/requestApi.js';
import checkOffline from '../../system/checkOffline.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const discoverRecurrence = async (calendarId, eventId) => {
    if (checkOffline()) {
        return;
    }

    console.log('eventResult:', eventResult);
    const state = getState();
    const eventResult = await requestApi(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
    );

    setState((state) => {});
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default discoverRecurrence;
