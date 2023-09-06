import {ENDPOINT_GET_VERSION, VERSION} from '../COMMON.js';
import requestEndpoint from './requestEndpoint.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const registerWorker = async () => {
    // console.log('Client: The Client has version', VERSION);

    await navigator.serviceWorker.register('./sw.js', {scope: './'});

    // Listen for activation events from the service-worker, even if everything is fine:
    navigator.serviceWorker.addEventListener('message', onMessageFromWorker);

    // Find the version of the current service-worker:
    const swVersion = await requestVersion();
    // console.log('Client: The SW has version', swVersion);

    // Announce success/failure:
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
        return await requestEndpoint(ENDPOINT_GET_VERSION);
    } catch (e) {
        console.log('Failed to find the service-worker version!');
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
