import {ENDPOINT_GET_VERSION} from '../COMMON.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestVersion = async () => {
    try {
        const response = await fetch(ENDPOINT_GET_VERSION);
        return (await response.json()).data;
    } catch (e) {
        return null;
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestVersion;
