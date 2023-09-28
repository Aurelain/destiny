import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {VERSION} from '../COMMON.js';
import Bar from './Bar.jsx';
import Connect from './Connect.jsx';
import Calendar from './Calendar.jsx';
import New from './New.jsx';
import {selectAccessToken} from '../state/selectors.js';
import requestCalendars from '../state/actions/requestCalendars.js';
import requestEvents from '../state/actions/requestEvents.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const VISIBILITY_EXPIRATION = 3600 * 1000; // milliseconds

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends React.PureComponent {
    visibilityTimestamp = Date.now();

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
            // We were logged-in sometimes in the past. We should ensure we have the latest data:
            this.syncWithCloud();
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onDocumentVisibilityChange = async () => {
        const {accessToken} = this.props;
        const hasBecomeVisible = !document.hidden;
        const isExpired = Date.now() > this.visibilityTimestamp + VISIBILITY_EXPIRATION;
        if (accessToken && hasBecomeVisible && isExpired) {
            this.visibilityTimestamp = Date.now();
            this.syncWithCloud();
        }
    };

    /**
     *
     */
    syncWithCloud = async () => {
        await requestCalendars();
        await requestEvents();
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
