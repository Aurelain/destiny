import React from 'react';
import PropTypes from 'prop-types';
import getYYYYMMDD from '../utils/getYYYYMMDD.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        marginTop: 16,
        textAlign: 'center',
    },
    title: {
        display: 'inline-block',
        padding: '2px 4px',
        borderRadius: 4,
        color: '#fff',
        background: '#333',
    },
    isPast: {
        background: '#f00',
    },
    isToday: {
        background: '#1a73e8',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Day extends React.PureComponent {
    render() {
        const {date} = this.props;
        const dayYYYYMMDD = getYYYYMMDD(date);
        const todayYYYYMMDD = getYYYYMMDD(new Date());
        const isPast = dayYYYYMMDD < todayYYYYMMDD; // string comparison, but works
        const isToday = dayYYYYMMDD === todayYYYYMMDD;
        return (
            <div css={SX.root}>
                <div css={[SX.title, isPast && SX.isPast, isToday && SX.isToday]}>{dayYYYYMMDD}</div>
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Day.propTypes = {
    date: PropTypes.object.isRequired,
};
export default Day;
