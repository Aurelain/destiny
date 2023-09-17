import React from 'react';
import PropTypes from 'prop-types';
import requestEndpoint from '../system/requestEndpoint.js';
import {ENDPOINT_GET_LIST} from '../COMMON.js';
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
        const {database} = this.props;
        return (
            <div css={SX.root}>
                {database.map((item, index) => (
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
        this.requestDatabase();
    }

    /**
     *
     */
    requestDatabase = async () => {
        const database = await requestEndpoint(ENDPOINT_GET_LIST);
        console.log('database:', database);
        this.props.onChange(database);
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Calendar.propTypes = {
    database: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};
export default Calendar;
