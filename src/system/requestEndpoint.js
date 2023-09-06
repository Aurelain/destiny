import requestJson from '../utils/requestJson.js';
import assume from '../utils/assume.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestEndpoint = async (endpoint, body = null) => {
    const json = await requestJson(endpoint, body);
    assume(!json.error, json.error);
    return json.data;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestEndpoint;