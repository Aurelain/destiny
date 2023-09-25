import './utils/interceptConsole.js';
import './utils/interceptErrors.js';
import './state/store.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import registerWorker from './system/registerWorker.js';
import GlobalStyles from './components/GlobalStyles.jsx';
import restoreState from './state/restoreState.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const run = async () => {
    // TODO: don't wait for this
    if (!(await registerWorker())) {
        return;
    }

    // Restore the state from IndexedDB into Redux. This usually only takes 2 ms.
    console.time('restoreState');
    await restoreState();
    console.timeEnd('restoreState');

    // We're not using <React.StrictMode> to avoid 2 renders:
    // https://upmostly.com/tutorials/why-is-my-useeffect-hook-running-twice-in-react
    ReactDOM.createRoot(document.getElementById('root')).render(
        <GlobalStyles>
            <App />
        </GlobalStyles>,
    );
};

// =====================================================================================================================
//  R U N
// =====================================================================================================================
run();
