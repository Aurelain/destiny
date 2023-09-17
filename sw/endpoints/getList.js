import requestJson from '../utils/requestJson.js';
import {USE_MOCK} from '../system/SW.js';
import getList_MOCK from './getList_MOCK.js';
import ensureTokens from '../system/ensureTokens.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function getList() {
    if (USE_MOCK) {
        return getList_MOCK.items;
    }

    const tokens = await ensureTokens();
    const result = await requestJson('https://content.googleapis.com/calendar/v3/calendars/primary/events', {
        searchParams: {
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 9,
            orderBy: 'startTime',
        },
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        },
    });
    console.log('result:', result);
    return result.items;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getList;
