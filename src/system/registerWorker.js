import {ENDPOINT_GET_VERSION, VERSION} from '../COMMON.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const registerWorker = async () => {
    // console.log('Client: The Client has version', VERSION);
    await navigator.serviceWorker.register('./sw.js', {scope: './'});
    const swVersion = await requestVersion();
    // console.log('Client: The SW has version', swVersion);
    navigator.serviceWorker.addEventListener('message', onMessageFromWorker);
    return swVersion === VERSION;
};

// =====================================================================================================================
//  P R I V A T E
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

/**
 *
 */
const onMessageFromWorker = (event) => {
    if (event.data?.type === 'ACTIVATED') {
        console.log(`Client: Reloading to get SW ${event.data.version}...`);
        window.location.reload();
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default registerWorker;
