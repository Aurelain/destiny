import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import interceptErrors from './utils/interceptErrors.js';
import {VERSION} from './COMMON.js';
import requestVersion from './system/requestVersion.js';

/**
 *
 */
const run = async () => {
    interceptErrors();
    console.log('Client: The Client has version', VERSION);

    await navigator.serviceWorker.register('./sw.js', {scope: './'});

    const swVersion = await requestVersion();
    console.log('Client: The SW has version', swVersion);
    if (swVersion !== VERSION) {
        navigator.serviceWorker.onmessage = (event) => {
            if (event.data?.type === 'ACTIVATED') {
                console.log(`Client: Reloading to get SW ${event.data.version}...`);
                window.location.reload();
            }
        };
        return;
    }

    // We're not using <React.StrictMode> to avoid 2 renders:
    // https://upmostly.com/tutorials/why-is-my-useeffect-hook-running-twice-in-react
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
};

run();
