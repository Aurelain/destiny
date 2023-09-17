// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestJson = async (url, options = null) => {
    const fetchOptions = {...options};

    let tolerateFail;
    if (fetchOptions?.tolerateFail) {
        tolerateFail = true;
        delete fetchOptions.tolerateFail;
    }

    if (fetchOptions.searchParams) {
        url += '?' + new URLSearchParams(fetchOptions.searchParams).toString();
        delete fetchOptions.searchParams;
    }

    if (fetchOptions.body) {
        fetchOptions.method = fetchOptions.method || 'POST';
        fetchOptions.body = JSON.stringify(fetchOptions.body);
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
        response = await fetch(url, fetchOptions);
    } catch (e) {
        if (tolerateFail) {
            return null;
        } else {
            throw new Error(`Failed to fetch "${url}"!`);
        }
    }

    let json;
    try {
        json = await response.json();
    } catch (e) {
        throw new Error(`Cannot parse response from "${url}" as json! ${e.message}`);
    }
    return json;
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default requestJson;
