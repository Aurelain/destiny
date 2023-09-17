// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const DESTROY_TIMEOUT = 1000;
let queue;
let destroyTimeout;
let containerElement;
let isExpanded = false;

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
    clearTimeout(destroyTimeout);
    if (!queue) {
        queue = [];
        containerElement = document.createElement('div');
        containerElement.style.cssText = `
            position:fixed;
            z-index:999999;
            inset:16px 16px auto 16px;
            padding: 8px;
            background:red;
            color:white;
            border-radius:4px;
            font-family:monospace;
            font-size:16px;
            white-space:pre-wrap;
            cursor:pointer;
        `;
        containerElement.addEventListener('click', onContainerClick);
        document.body.appendChild(containerElement);
    }
    if (!isExpanded) {
        destroyTimeout = setTimeout(onDestroyTimeout, DESTROY_TIMEOUT);
    }
    queue.push({type, stack});
    renderQueue();
};

/**
 *
 */
const renderQueue = () => {
    let items = [];
    for (const {type, stack} of queue) {
        if (isExpanded) {
            items.push(type + '<br/>' + stack);
        } else {
            items.push(stack.match(/.*/)[0]);
        }
    }
    containerElement.innerHTML = `<ul><li>${items.join('</li><li>')}</li></ul>`;
};

/**
 *
 */
const onDestroyTimeout = () => {
    destroyContainerElement();
};

/**
 *
 */
const onContainerClick = () => {
    if (!isExpanded) {
        isExpanded = true;
        clearTimeout(destroyTimeout);
        renderQueue();
    } else {
        destroyContainerElement();
    }
};

/**
 *
 */
const destroyContainerElement = () => {
    queue = null;
    document.body.removeChild(containerElement);
    containerElement = null;
    isExpanded = false;
    clearTimeout(destroyTimeout);
};

// =====================================================================================================================
//  R U N
// =====================================================================================================================
interceptErrors();
