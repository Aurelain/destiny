// =================================================================================================================
//  P U B L I C
// =================================================================================================================
/**
 *
 */
const checkEventIsDone = (summary, status) => {
    return summary.startsWith('--') || status === 'cancelled';
};

// =================================================================================================================
//  E X P O R T
// =================================================================================================================
export default checkEventIsDone;
