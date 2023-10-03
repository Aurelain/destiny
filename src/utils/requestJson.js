import fetchWithLoading from './fetchWithLoading.js';
import validateJson from './validateJson.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestJson = async (url, options = {}) => {
    const fetchOptions = {...options};
    delete fetchOptions.schema;

    if (fetchOptions.searchParams) {
        url += '?' + new URLSearchParams(fetchOptions.searchParams).toString();
        delete fetchOptions.searchParams;
    }

    if (fetchOptions.body) {
        fetchOptions.method = fetchOptions.method || 'POST';
        fetchOptions.body = JSON.stringify(fetchOptions.body);
        fetchOptions.headers = {...fetchOptions.headers};
        fetchOptions.headers['Content-Type'] = 'application/json';
    }

    if (fetchOptions.headers) {
        const headers = new Headers();
        for (const key in fetchOptions.headers) {
            headers.append(key, fetchOptions.headers[key]);
        }
        fetchOptions.headers = headers;
    }

    let response;
    try {
        response = await fetchWithLoading(url, fetchOptions);
    } catch (e) {
        throw new Error(`Failed to fetch "${url}"!`);
    }

    const text = await response.text();
    let json;
    if (text) {
        try {
            json = JSON.parse(text);
        } catch (e) {
            throw new Error(`Cannot parse response from "${url}" as json! ${e.message}`);
        }
    }

    if (options.schema) {
        validateJson(json, options.schema);
    }

    return json;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestJson;
