import React from 'react';
import PropTypes from 'prop-types';
import {BAR_HEIGHT, NEW_HEIGHT} from '../system/CLIENT.js';

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
        const {store} = this.props;
        return (
            <div css={SX.root}>
                {store.events.map((item, index) => (
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
