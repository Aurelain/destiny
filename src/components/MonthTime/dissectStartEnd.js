// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const dissectStartEnd = ({start, end}) => {
    if (start.length === 10) {
        return {
            monthDate: start,
            startMinute: 0,
            duration: 0,
        };
    }
    const startHours = Number(start.substring(11, 13));
    const startMinutes = Number(start.substring(14, 16));
    const startMinute = startHours * 60 + startMinutes;

    const endHours = Number(end.substring(11, 13));
    const endMinutes = Number(end.substring(14, 16));
    const endMinute = endHours * 60 + endMinutes;

    return {
        monthDate: start.substring(0, 10),
        startMinute,
        duration: endMinute - startMinute,
    };
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default dissectStartEnd;
