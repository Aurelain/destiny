import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import interceptErrors from './utils/interceptErrors.js';
import registerWorker from './system/registerWorker.js';

/**
 *
 */
const run = async () => {
    interceptErrors();

    if (!(await registerWorker())) {
        return;
    }

    // We're not using <React.StrictMode> to avoid 2 renders:
    // https://upmostly.com/tutorials/why-is-my-useeffect-hook-running-twice-in-react
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
};

run();
