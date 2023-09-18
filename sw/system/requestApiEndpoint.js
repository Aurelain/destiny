import requestJson from '../utils/requestJson.js';
import ensureTokens from './ensureTokens.js';
import validateJson from '../../src/utils/validateJson.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestApiEndpoint = async (url, schema, options = null) => {
    const tokens = await ensureTokens();
    const result = await requestJson(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        },
    });

    validateJson(result, schema);

    return result;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestApiEndpoint;
