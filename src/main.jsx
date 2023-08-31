import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import interceptErrors from './utils/interceptErrors.js';

/**
 *
 */
const run = async () => {
    interceptErrors();

    if (import.meta.env.MODE === 'development') {
        await navigator.serviceWorker.register('./dev-sw.js?dev-sw', {scope: './', type: 'module'});
    } else {
        await navigator.serviceWorker.register('./sw.js', {scope: './'});
    }

    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
};

run();
