import React from 'react';
import PropTypes from 'prop-types';
import {BAR_HEIGHT, NEW_HEIGHT} from '../system/CLIENT.js';
import Event from './Event.jsx';
import objectify from '../utils/objectify.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        paddingTop: BAR_HEIGHT + 8,
        paddingRight: 8,
        paddingBottom: NEW_HEIGHT + 8,
        paddingLeft: 8,
    },
    event: {
        borderBottom: 'solid 1px silver',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Calendar extends React.PureComponent {
    state = {
        collapsedIds: {},
    };

    render() {
        const {store} = this.props;
        const {calendars, events} = store;
        const calendarsById = objectify(calendars, 'id');
        return (
            <div css={SX.root}>
                {events.map((item, index) => {
                    const {backgroundColor} = calendarsById[item.calendarId];
                    return <Event key={index} backgroundColor={backgroundColor} title={item.summary} />;
                })}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    componentDidMount() {}
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Calendar.propTypes = {
    store: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};
export default Calendar;
