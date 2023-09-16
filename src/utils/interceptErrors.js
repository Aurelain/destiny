// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const interceptErrors = () => {
    window.addEventListener('error', onError, true);
    window.addEventListener('unhandledrejection', onUnhandledRejection, true);
    navigator.serviceWorker?.addEventListener('message', onServiceWorkerMessage, true);
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const onError = (event) => {
    panic(event.type, event.error.stack);
};

/**
 *
 */
const onUnhandledRejection = (event) => {
    panic(event.type, event.reason.stack);
};

/**
 *
 */
const onServiceWorkerMessage = (event) => {
    if (event.data?.type === 'PANIC') {
        // This message came from a service worker that panicked.
        panic(event.data.panic.type + ' in SW', event.data.panic.stack);
    }
};

/**
 *
 */
const panic = (type, stack) => {
    window.removeEventListener('error', onError, true);
    window.removeEventListener('unhandledrejection', onUnhandledRejection, true);
    document.body.style.cssText = 'background:red;color:white;padding:8px;font-family:monospace;white-space:pre-wrap';
    document.body.innerHTML = `
Unexpected ${type}!
${stack}
`.trim();
};

// =====================================================================================================================
//  R U N
// =====================================================================================================================
interceptErrors();
