import {DONE_MATCH} from '../SETTINGS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const sortEvents = (events) => {
    events.sort(compareEvents);
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const compareEvents = (a, b) => {
    const startComparison = a.start.localeCompare(b.start);
    if (startComparison) {
        return startComparison;
    }

    const calendarComparison = a.calendarId.localeCompare(b.calendarId);
    if (calendarComparison) {
        return calendarComparison;
    }

    const aCleanSummary = a.summary.replace(DONE_MATCH, '');
    const bCleanSummary = b.summary.replace(DONE_MATCH, '');
    const summaryComparison = aCleanSummary.localeCompare(bCleanSummary);
    return summaryComparison;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default sortEvents;
