import React from 'react';
import {ENDPOINT_GET_STORE, VERSION} from '../COMMON.js';
import Bar from './Bar.jsx';
import Connect from './Connect.jsx';
import Calendar from './Calendar.jsx';
import New from './New.jsx';
import assume from '../utils/assume.js';
import {LS_STORE_KEY} from '../system/CLIENT.js';
import requestEndpoint from '../system/requestEndpoint.js';
import validateJson from '../utils/validateJson.js';
import UserSchema from '../schemas/UserSchema.js';
import CalendarsSchema from '../schemas/CalendarsSchema.js';
import EventsSchema from '../schemas/EventsSchema.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends React.PureComponent {
    state = {
        store: readStoreFromLocalStorage(), // just for fast caching, will be replaced by the store from SW
    };

    render() {
        const {store} = this.state;
        return (
            <>
                <Bar />
                {!store && <Connect onChange={this.onConnectChange} />}
                {store && <Calendar store={store} onChange={this.onCalendarChange} />}
                {store && <New store={store} />}
            </>
        );
    }

    componentDidMount() {
        console.log(`Version ${VERSION}`);
        document.addEventListener('visibilitychange', this.onDocumentVisibilityChange);
        document.body.removeChild(document.getElementById('spinner'));

        if (this.state.store) {
            // We were logged-in sometimes in the past. We should update the store:
            this.requestStore();
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onConnectChange = () => {
        this.requestStore();
    };

    /**
     *
     */
    onCalendarChange = (store) => {
        this.setState({
            store,
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
    requestStore = async () => {
        try {
            const store = await requestEndpoint(ENDPOINT_GET_STORE);
            this.setState({store});
            localStorage.setItem(LS_STORE_KEY, JSON.stringify(store)); // cache for fast future boot
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
const readStoreFromLocalStorage = () => {
    try {
        const store = JSON.parse(localStorage.getItem(LS_STORE_KEY));
        assume(store, 'Store is missing from LocalStorage!');
        validateJson(store.user, UserSchema);
        validateJson(store.calendars, CalendarsSchema);
        validateJson(store.events, EventsSchema);
        return store;
    } catch (e) {
        console.log('Invalid store in LocalStorage!');
        return {
            user: {
                email: '',
            },
            calendars: {
                items: [],
            },
            events: [],
        };
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
