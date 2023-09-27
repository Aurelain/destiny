import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ENDPOINT_GET_STORE, VERSION} from '../COMMON.js';
import Bar from './Bar.jsx';
import Connect from './Connect.jsx';
import Calendar from './Calendar.jsx';
import New from './New.jsx';
import {LS_STORE_KEY} from '../system/CLIENT.js';
import requestEndpoint from '../system/requestEndpoint.js';
import {selectAccessToken} from '../state/selectors.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const STORE_EXPIRATION = 3600 * 1000; // milliseconds

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends React.PureComponent {
    storeTimestamp;

    render() {
        const {accessToken} = this.props;
        return (
            <>
                <Bar />
                {!accessToken && <Connect />}
                {accessToken && <Calendar />}
                {accessToken && <New />}
            </>
        );
    }

    componentDidMount() {
        console.log(`Version ${VERSION}`);
        document.addEventListener('visibilitychange', this.onDocumentVisibilityChange);
        document.body.removeChild(document.getElementById('spinner'));

        if (this.props.accessToken) {
            // We were logged-in sometimes in the past. We should update the store:
            // this.requestStore();
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onDocumentVisibilityChange = async () => {
        const hasBecomeVisible = !document.hidden;
        const isExpired = Date.now() > this.storeTimestamp + STORE_EXPIRATION;
        if (hasBecomeVisible && isExpired) {
            this.requestStore();
        }
    };

    /**
     *
     */
    requestStore = async () => {
        return;
        let store;
        let error;
        try {
            store = await requestEndpoint(ENDPOINT_GET_STORE);
        } catch (e) {
            error = e;
        }
        if (store) {
            this.updateStore(store);
        } else {
            this.setState({user: null});
            // Now that we've changed the state, we can announce the error.
            throw new Error(error);
        }
    };

    /**
     *
     */
    updateStore = (store) => {
        console.log('updateStore:', store);
        this.setState({store});
        this.storeTimestamp = Date.now();
        localStorage.setItem(LS_STORE_KEY, JSON.stringify(store)); // cache for future fast-boot
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
App.propTypes = {
    accessToken: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    accessToken: selectAccessToken(state),
});

export default connect(mapStateToProps)(App);
