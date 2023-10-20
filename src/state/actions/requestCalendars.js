import {setState} from '../store.js';
import CalendarsSchema from '../../schemas/CalendarsSchema.js';
import requestApi from '../../system/requestApi.js';
import checkOffline from '../../system/checkOffline.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
/**
 * - https://www.googleapis.com/calendar/v3/colors offers just the left-side.
 * - https://calendar.google.com/calendar offers just the right-side
 */
const GOOGLE_DARKER_REPLACEMENTS = {
    '#cca6ac': '#ad1457',
    '#fa573c': '#f4511e',
    '#fbe983': '#e4c441',
    '#16a765': '#0b8043',
    '#4986e7': '#3f51b5',
    '#cd74e6': '#8e24aa',
    '#f691b2': '#d81b60',
    '#ff7537': '#ef6c00',
    '#b3dc6c': '#c0ca33',
    '#42d692': '#009688',
    '#9a9cff': '#7986cb',
    '#ac725e': '#795548',
    '#f83a22': '#d50000',
    '#ffad46': '#f09300',
    '#7bd148': '#7cb342',
    '#9fe1e7': '#039be5',
    '#b99aff': '#b39ddb',
    '#c2c2c2': '#616161',
    '#d06b64': '#e67c73',
    '#fad165': '#f6bf26',
    '#92e1c0': '#33b679',
    '#9fc6e7': '#4285f4',
    '#a47ae2': '#9e69af',
    '#cabdbf': '#a79b8e',
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestCalendars = async () => {
    if (checkOffline()) {
        return;
    }

    const result = await requestApi('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
        schema: CalendarsSchema,
    });

    const calendars = [];
    for (const {id, summary, backgroundColor, selected, timeZone, primary} of result.items) {
        calendars.push({
            id,
            summary,
            backgroundColor: convertColor(backgroundColor),
            timeZone,
            selected: Boolean(selected),
            primary: Boolean(primary),
        });
    }
    calendars.sort(compareCalendars);

    setState((state) => {
        state.calendars = calendars;
    });
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const convertColor = (color) => {
    if (color in GOOGLE_DARKER_REPLACEMENTS) {
        return GOOGLE_DARKER_REPLACEMENTS[color];
    } else {
        return color;
        // Alternative 1: return tinyColor(color).darken(15).toHexString(); // https://github.com/bgrins/TinyColor
        // Alternative 2: `pSBC()` from here: https://stackoverflow.com/a/13542669
    }
};

/**
 *
 */
const compareCalendars = (a, b) => {
    return a.summary.localeCompare(b.summary);
};
// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestCalendars;
