import React from 'react';
import {VERSION} from '../COMMON.js';
import Bar from './Bar.jsx';
import Connect from './Connect.jsx';
import Calendar from './Calendar.jsx';
import New from './New.jsx';
import assume from '../utils/assume.js';
import {CLIENT_EVENTS_KEY, CLIENT_USER_KEY} from '../system/CLIENT.js';

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
                {!user && <Connect onUser={this.onConnectUser} />}
                {user && <Calendar events={events} onChange={this.onCalendarChange} />}
                {user && <New />}
            </>
        );
    }

    async componentDidMount() {
        console.log(`Version ${VERSION}`);
        document.addEventListener('visibilitychange', this.onDocumentVisibilityChange);
        document.body.removeChild(document.getElementById('spinner'));
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onConnectUser = (user) => {
        this.setState({
            user,
        });
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
        console.log(e);
        return undefined;
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
