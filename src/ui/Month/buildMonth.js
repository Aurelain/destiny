import getYYYYMMDD from '../../utils/getYYYYMMDD.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const MILLISECONDS_IN_A_DAY = 1000 * 3600 * 24;
const TODAY_YMD = getYYYYMMDD();

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const buildMonth = ({date, markedDate}) => {
    date = new Date(date);
    const fullYear = date.getFullYear();
    const month = date.getMonth();

    // https://stackoverflow.com/a/13572682/844393
    const firstDay = new Date(fullYear, month, 1, 12); // use 12 hours to get the middle of the day, avoiding DST
    const firstDayTimestamp = Number(firstDay);

    const lastDay = new Date(fullYear, month + 1, 0, 12);
    const lastDayTimestamp = Number(lastDay);

    const markedYmd = getYYYYMMDD(markedDate);

    let startDate;
    const firstDayWeekIndex = firstDay.getDay();
    if (firstDayWeekIndex !== 1) {
        // This month doesn't start on a Monday, so we need to begin with an incomplete row
        let daysFromPreviousMonth = firstDayWeekIndex - 1;
        if (daysFromPreviousMonth < 0) {
            daysFromPreviousMonth = 7 + daysFromPreviousMonth;
        }
        startDate = new Date(fullYear, month, -daysFromPreviousMonth + 1, 12);
    } else {
        // This month starts on a Monday.
        startDate = firstDay;
    }
    const startTimestamp = Number(startDate);

    const output = [];
    for (let r = 0; r < 6; r++) {
        const row = [];
        for (let c = 0; c < 7; c++) {
            const cursorTimestamp = startTimestamp + (r * 7 + c) * MILLISECONDS_IN_A_DAY;
            const cursorDate = new Date(cursorTimestamp);
            const ymd = getYYYYMMDD(cursorDate);
            const info = {ymd};
            if (cursorTimestamp < firstDayTimestamp || cursorTimestamp > lastDayTimestamp) {
                info.isForeign = true;
            }
            if (ymd === TODAY_YMD) {
                info.isToday = true;
            }
            if (ymd === markedYmd) {
                info.isMarked = true;
            }
            row.push(info);
        }
        output.push(row);
    }
    return output;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default buildMonth;
