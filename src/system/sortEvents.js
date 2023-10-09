import sanitizeSummary from './sanitizeSummary.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const sortEvents = (events) => {
    events.sort(compareEvents);
    return events;
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

    const aCleanSummary = sanitizeSummary(a.summary);
    const bCleanSummary = sanitizeSummary(b.summary);
    const summaryComparison = aCleanSummary.localeCompare(bCleanSummary);
    return summaryComparison;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default sortEvents;
