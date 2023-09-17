import React from 'react';
import PropTypes from 'prop-types';
import requestEndpoint from '../system/requestEndpoint.js';
import {ENDPOINT_GET_LIST} from '../COMMON.js';
import {BAR_HEIGHT, CLIENT_EVENTS_KEY, NEW_HEIGHT} from '../system/CLIENT.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        padding: 16,
        paddingTop: BAR_HEIGHT,
        paddingBottom: NEW_HEIGHT,
    },
    event: {
        borderBottom: 'solid 1px silver',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Calendar extends React.PureComponent {
    render() {
        const {events} = this.props;
        const list = events || [];
        return (
            <div css={SX.root}>
                {list.map((item, index) => (
                    <div css={SX.event} key={index}>
                        {item.summary}
                    </div>
                ))}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    componentDidMount() {
        this.requestEvents();
    }

    /**
     *
     */
    requestEvents = async () => {
        const events = await requestEndpoint(ENDPOINT_GET_LIST);
        localStorage.setItem(CLIENT_EVENTS_KEY, JSON.stringify(events));
        this.props.onChange(events);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Calendar.propTypes = {
    events: PropTypes.array,
    onChange: PropTypes.func.isRequired,
};
export default Calendar;
