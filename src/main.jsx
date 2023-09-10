import './utils/interceptConsole.js';
import './utils/interceptErrors.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import registerWorker from './system/registerWorker.js';
import GlobalStyles from './components/GlobalStyles.jsx';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
const run = async () => {
    if (!(await registerWorker())) {
        return;
    }

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
