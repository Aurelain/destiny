// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const produceStartEnd = ({monthDate, startMinute, duration, timeZone}) => {
    if (!startMinute) {
        return {
            start: monthDate,
            end: monthDate,
            pretty: monthDate,
        };
    }

    const localized = new Date(monthDate).toLocaleString('en-US', {
        timeZone,
        timeZoneName: 'longOffset',
    });
    const offset = localized.match(/\+.*/)[0];

    const startClock = new Date(startMinute * 60 * 1000).toISOString().substring(11, 16);
    const endClock = new Date((startMinute + duration) * 60 * 1000).toISOString().substring(11, 16);

    const prettySuffix = duration ? '-' + endClock : '';
    return {
        start: monthDate + 'T' + startClock + ':00' + offset,
        end: monthDate + 'T' + endClock + ':00' + offset,
        pretty: monthDate + ', ' + startClock + prettySuffix,
    };
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default produceStartEnd;
