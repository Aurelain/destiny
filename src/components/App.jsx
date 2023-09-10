import React from 'react';
import connectGoogle from '../system/connectGoogle.js';
import {ENDPOINT_GET_USER, VERSION} from '../COMMON.js';
import requestEndpoint from '../system/requestEndpoint.js';
import Button from './Button.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const LIVE = false;
const SX = {
    root: {
        padding: 32,
        // backgroundColor: 'hotpink',
        fontSize: 24,
    },
};

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
        const {user} = this.state;
        return (
            <div css={SX.root}>
                <Button onClick={this.onReloadClick}>Reload {VERSION}</Button>
                <br />
                <br />
                <br />
                <Button>Testing</Button>
                <br />
                <br />
                <br />
                {user ? (
                    <div>Hello, {user.email}</div>
                ) : (
                    <button onClick={this.onConnectClick}>Connect your Google Calendar</button>
                )}
            </div>
        );
    }

    async componentDidMount() {
        console.log('componentDidMount');
        document.addEventListener('visibilitychange', this.onDocumentVisibilityChange);
        let user;
        try {
            if (LIVE) {
                user = await requestEndpoint(ENDPOINT_GET_USER);
            }
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
    onReloadClick = () => {
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
    onDocumentVisibilityChange = async () => {
        console.log('document.hidden', document.hidden);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
