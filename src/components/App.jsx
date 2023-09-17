import React from 'react';
import {VERSION} from '../COMMON.js';
import Bar from './Bar.jsx';
import Connect from './Connect.jsx';
import Calendar from './Calendar.jsx';
import New from './New.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends React.PureComponent {
    state = {
        user: null,
        database: [], // ALL known events
    };

    render() {
        const {user, database} = this.state;
        return (
            <>
                <Bar />
                {!user && <Connect onUser={this.onConnectUser} />}
                {user && <Calendar database={database} onChange={this.onCalendarChange} />}
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
    onCalendarChange = (database) => {
        this.setState({
            database,
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
//  E X P O R T
// =====================================================================================================================
export default App;
