// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const interceptSwErrors = () => {
    self.addEventListener('error', onError, true);
    self.addEventListener('unhandledrejection', onUnhandledRejection, true);
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
const panic = (type, stack) => {
    self.clients.matchAll().then(function (clients) {
        if (clients) {
            for (const client of clients) {
                client.postMessage({
                    type: 'PANIC',
                    panic: {type, stack},
                });
            }
        }
    });
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
interceptSwErrors();
