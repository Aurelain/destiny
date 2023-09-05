import React from 'react';
import requestUser from '../system/requestUser.js';
import connectGoogle from '../system/connectGoogle.js';

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
            return null;
        }

        if (!user) {
            return (
                <div>
                    <button onClick={this.onConnectClick}>Connect your Google Calendar</button>
                </div>
            );
        }

        return <div>Hello</div>;
    }

    async componentDidMount() {
        const user = await requestUser();
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
    onConnectClick = async () => {
        await connectGoogle();
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
