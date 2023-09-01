import announceClients from './announceClients.js';

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
    announceClients({type: 'PANIC', panic: {type, stack}});
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
interceptSwErrors();
