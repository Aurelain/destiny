import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

if ('serviceWorker' in navigator) {
    if (import.meta.env.MODE === 'development') {
        navigator.serviceWorker.register('./dev-sw.js?dev-sw', {scope: './', type: 'module'});
    } else {
        navigator.serviceWorker.register('./sw.js', {scope: './'});
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
