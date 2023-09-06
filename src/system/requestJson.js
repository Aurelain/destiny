// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestJson = async (url, body) => {
    let config;
    if (body) {
        config = {
            method: 'POST',
            body: JSON.stringify(body),
        };
    }
    let response;
    try {
        response = await fetch(url, config);
    } catch (e) {
        throw new Error(`Fetch to "${url}" failed! ${e.message}`);
    }
    let json;
    try {
        json = await response.json();
    } catch (e) {
        throw new Error(`Cannot parse response from "${url}" as json! ${e.message}`);
    }
    return json.data; // TODO
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestJson;
