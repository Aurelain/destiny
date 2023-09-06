import React from 'react';
import connectGoogle from '../system/connectGoogle.js';
import {ENDPOINT_GET_USER, VERSION} from '../COMMON.js';
import requestEndpoint from '../system/requestEndpoint.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends React.PureComponent {
    state = {
        isInitialized: false,
        user: null,
        database: [], // ALL known events
    };

    render() {
        const {isInitialized, user} = this.state;

        if (!isInitialized) {
            // The initialization is performed upon mount.
            return (
                <div>
                    <button onClick={this.onReload}>Reload {VERSION}</button>
                </div>
            );
        }

        if (!user) {
            return (
                <div>
                    <button onClick={this.onReload}>Reload {VERSION}</button>
                    <button onClick={this.onConnectClick}>Connect your Google Calendar</button>
                </div>
            );
        }

        return (
            <div>
                <button onClick={this.onReload}>Reload {VERSION}</button>
                Hello, {user.email}
            </div>
        );
    }

    async componentDidMount() {
        let user;
        try {
            user = await requestEndpoint(ENDPOINT_GET_USER);
        } catch (e) {
            console.log(`Could not get user! ${e.message}`);
            user = null;
        }

        document.body.removeChild(document.getElementById('spinner'));
        this.setState({
            isInitialized: true,
            user,
        });
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onReload = () => {
        window.location.reload();
    };

    /**
     *
     */
    onConnectClick = async () => {
        console.log('Connecting to Google...');
        const result = await connectGoogle();
        console.log('Finished connecting:', result);
    };

    /**
     *
     */
    onSendClick = async () => {
        const data = {
            type: 'DESTINY',
            payload: Math.random(),
        };
        console.log('Client will send:', data.payload);
        navigator.serviceWorker.controller.postMessage(data);
    };

    /**
     *
     */
    onFetchClick = async () => {
        const response = await fetch('foo');
        console.log('response:', response.text());
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
