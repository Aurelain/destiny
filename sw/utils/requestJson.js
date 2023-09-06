// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const requestJson = async (url, body = null, settings = null) => {
    let tolerateFail;
    if (settings?.tolerateFail) {
        tolerateFail = true;
        delete settings.tolerateFail;
    }

    const config = {};
    if (body) {
        config.method = 'POST';
        config.body = JSON.stringify(body);
    }

    if (settings) {
        Object.assign(config, settings);
    }

    let response;
    try {
        response = await fetch(url, config);
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