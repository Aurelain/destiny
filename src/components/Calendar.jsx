import React from 'react';
import PropTypes from 'prop-types';
import requestEndpoint from '../system/requestEndpoint.js';
import {ENDPOINT_GET_LIST} from '../COMMON.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
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
                    <div key={index}>{JSON.stringify(item)}</div>
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
