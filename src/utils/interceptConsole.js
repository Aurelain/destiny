/*
WIP
*/

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const PROPERTIES = ['memory'];
const METHODS = {
    assert: log,
    clear: log,
    count: log,
    debug: log,
    dir: log,
    dirxml: log,
    error: log,
    exception: log,
    group: log,
    groupCollapsed: log,
    groupEnd: log,
    info: log,
    log: log,
    markTimeline: log,
    profile: log,
    profileEnd: log,
    profiles: log,
    show: log,
    table: log,
    time: log,
    timeEnd: log,
    timeline: log,
    timelineEnd: log,
    timeLog: log,
    timeStamp: log,
    trace: log,
    warn: log,
};
let isInitialized = false;
let nativeConsole;
let emulatedConsole;
let lines;
let textArea;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const interceptConsole = () => {
    if (isInitialized) {
        return;
    }
    isInitialized = true;
    switch (localStorage.getItem('console')) {
        case 'native':
            return;
        default:
        case 'emulated': {
            lines = [];
            emulatedConsole = {};

            const emptyObject = {};
            for (const property of PROPERTIES) {
                emulatedConsole[property] = emptyObject;
            }

            nativeConsole = window.console;
            for (const name in METHODS) {
                emulatedConsole[name] = createHandler(name);
            }

            window.console = emulatedConsole;
            createConsoleElement();
            break;
        } /*
        default: {
            // silent
            const noopConsole = {};

            const emptyObject = {};
            for (const property of PROPERTIES) {
                noopConsole[property] = emptyObject;
            }

            const emptyFunction = () => undefined;
            for (const methodName in METHODS) {
                noopConsole[methodName] = emptyFunction;
            }

            window.console = noopConsole;
        }*/
    }
};

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
const createConsoleElement = () => {
    if (document.body) {
        const emulatedConsoleMarkup = createConsoleMarkup();
        document.body.insertAdjacentHTML('beforeend', emulatedConsoleMarkup);
        textArea = document.getElementById('emulatedConsoleText');
        updateTextArea();
    } else {
        document.addEventListener('DOMContentLoaded', onDocumentDomContentLoaded);
    }
};

/**
 *
 */
const onDocumentDomContentLoaded = () => {
    createConsoleElement();
    document.removeEventListener('DOMContentLoaded', onDocumentDomContentLoaded);
};

/**
 *
 */
const createConsoleMarkup = () => {
    return `
        <style>
            #emulatedConsole {
                position:fixed;
                bottom:0;
                left:0;
                right:0;
                height:300px;
                background:#fff;
                border-top:solid 1px silver;
            }
            #emulatedConsoleText {
                width:100%;
                height:100%;
                padding:4px;
                overflow-y:scroll;
                resize: none;
                border:0;
                border-radius: 0;
                font-family: Consolas, monospace;
            }
            #emulatedConsoleClose {
                position:absolute;
                right:0;
                top:0;
                width:17px;
                height:17px;
                line-height: 17px;
                font-size:12px;
                text-align: center;
                background:red;
                color:#fff;
            }
        </style>
        <div id='emulatedConsole'>
            <textarea id='emulatedConsoleText'></textarea>
            <div id='emulatedConsoleClose'>✖</div>
        </div>
    `;
};

/**
 *
 */
const createHandler = (name) => {
    return (...args) => {
        nativeConsole[name].apply(null, args);
        METHODS[name].apply(null, args);
    };
};

/**
 * Called by most API methods to refresh the content of the textarea
 */
const addLine = (line) => {
    lines.push(line);
    if (document.body) {
        updateTextArea();
    }
};

/**
 *
 */
const updateTextArea = () => {
    textArea.value = lines.join('\n');
    textArea.scrollTop = textArea.scrollHeight;
};

// =====================================================================================================================
//  A P I
// =====================================================================================================================
/**
 *
 */
function log(...args) {
    addLine(args.toString());
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
interceptConsole();
