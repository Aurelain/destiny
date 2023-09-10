/*
WIP
*/

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const CONSOLE_HEIGHT = 300;
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
let emuc;
let initialConsoleHeight;
let initialPointerY;

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
        }
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
        }
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

        emuc = document.getElementById('emuc');
        const consoleHeight = localStorage.getItem('consoleHeight') || CONSOLE_HEIGHT;
        emuc.style.height = consoleHeight + 'px';

        document.getElementById('emucClear').addEventListener('click', onClearClick);
        document.getElementById('emucClose').addEventListener('click', onCloseClick);
        document.getElementById('emucResize').addEventListener('pointerdown', onResizePointerDown);

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
            #emuc {
                position:fixed;
                bottom:0;
                left:0;
                right:0;
                background:#fff;
                font-size:16px;
            }
            #emucBar {
                height: 28px;
                background: #f1f3f4;
                border:solid 1px #cacdd1;
                border-left:0;
                border-right:0;
                display: flex;
            }
            .emucButton {
                width:26px;
                height:26px;
                line-height: 26px;
                text-align: center;
                cursor:pointer;
                color:#6e6e6e;
            }
            .emucButton:hover {
                color:#000;
                background: #dee1e6;
            }
            .emucButton:active {
                background: #cecece;
            }
            #emucResize {
                flex-grow:1;
                cursor:ns-resize;
                touch-action: none;
            }
            #emulatedConsoleText {
                width:100%;
                height:calc(100% - 26px);
                padding:4px;
                overflow-y:scroll;
                resize: none;
                border:0;
                border-radius: 0;
                font-family: Consolas, monospace;
                outline: 0;
            }
            
        </style>
        <div id='emuc'>
            <div id='emucBar'>
                <div id='emucClear' class='emucButton'>🛇</div>
                <div id='emucResize'></div>
                <div id='emucClose' class='emucButton'>✕</div>
            </div>
            <textarea id='emulatedConsoleText' spellcheck='false'></textarea>
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

/**
 *
 */
const onClearClick = () => {
    lines = [];
    updateTextArea();
};

/**
 *
 */
const onCloseClick = () => {
    localStorage.removeItem('console');
    window.location.reload();
};

/**
 *
 */
const onResizePointerDown = (event) => {
    window.addEventListener('pointermove', onWindowPointerMove);
    window.addEventListener('pointerup', onWindowPointerUp);
    initialConsoleHeight = emuc.offsetHeight;
    initialPointerY = event.clientY;
};

/**
 *
 */
const onWindowPointerMove = (event) => {
    const deltaY = event.clientY - initialPointerY;
    const futureHeight = Math.max(initialConsoleHeight - deltaY, 50);
    localStorage.setItem('consoleHeight', String(futureHeight));
    emuc.style.height = futureHeight + 'px';
};

/**
 *
 */
const onWindowPointerUp = () => {
    window.removeEventListener('pointermove', onWindowPointerMove);
    window.removeEventListener('pointerup', onWindowPointerUp);
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
