import React from 'react';
import {ENDPOINT_GET_USER, VERSION} from '../COMMON.js';
import Bar from './Bar.jsx';
import Connect from './Connect.jsx';
import Calendar from './Calendar.jsx';
import New from './New.jsx';
import assume from '../utils/assume.js';
import {CLIENT_EVENTS_KEY, CLIENT_USER_KEY} from '../system/CLIENT.js';
import requestEndpoint from '../system/requestEndpoint.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends React.PureComponent {
    state = {
        user: readUserFromStorage(), // user info
        events: readEventsFromStorage(), // ALL known events
    };

    render() {
        const {user, events} = this.state;
        return (
            <>
                <Bar />
                {!user && <Connect user={user} onChange={this.onConnectChange} />}
                {user && <Calendar events={events} onChange={this.onCalendarChange} />}
                {user && <New />}
            </>
        );
    }

    componentDidMount() {
        console.log(`Version ${VERSION}`);
        document.addEventListener('visibilitychange', this.onDocumentVisibilityChange);
        document.body.removeChild(document.getElementById('spinner'));

        if (this.state.user) {
            // We were logged-in sometimes in the past. We should ensure the login is still valid:
            this.requestUser();
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onConnectChange = () => {
        this.requestUser();
    };

    /**
     *
     */
    onCalendarChange = (events) => {
        this.setState({
            events,
        });
    };

    /**
     *
     */
    onDocumentVisibilityChange = async () => {
        console.log('document.hidden', document.hidden);
    };

    /**
     *
     */
    requestUser = async () => {
        try {
            const user = await requestEndpoint(ENDPOINT_GET_USER);
            this.setState({user});
            localStorage.setItem(CLIENT_USER_KEY, JSON.stringify(user));
        } catch (e) {
            this.setState({user: null});
            throw new Error(e);
        }
    };
}

// =====================================================================================================================
//  H E L P E R S
// =====================================================================================================================
/**
 *
 */
const readUserFromStorage = () => {
    try {
        const user = JSON.parse(localStorage.getItem(CLIENT_USER_KEY));
        assume(user.email);
        return user;
    } catch (e) {
        return undefined;
    }
};

/**
 *
 */
const readEventsFromStorage = () => {
    try {
        const events = JSON.parse(localStorage.getItem(CLIENT_EVENTS_KEY));
        assume(Array.isArray(events));
        return events;
    } catch (e) {
        return undefined;
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
