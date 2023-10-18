import React from 'react';
import PropTypes from 'prop-types';
import {selectCalendars} from '../state/selectors.js';
import {connect} from 'react-redux';
import Avatar from '../ui/Avatar.jsx';
import memoize from 'memoize-one';
import Select from '../ui/Select.jsx';
import {BOX_SHADOW} from '../SETTINGS.js';
import CalendarMonth from '../ui/Icons/CalendarMonth.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    buttonNormal: {
        padding: 2,
        background: 'none',
        boxShadow: 'none',
        '& > *': {
            border: 'solid 1px #fff',
            boxShadow: BOX_SHADOW,
        },
    },
    buttonActive: {
        '& > *': {
            boxShadow: 'none',
        },
    },
    itemCss: {
        padding: 4,
    },
    list: {
        background: '#fff',
        position: 'absolute',
        borderRadius: 4,
        boxShadow: BOX_SHADOW,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class SelectTime extends React.PureComponent {
    render() {
        const {calendars, styling, onSelect} = this.props;
        return (
            <Select button={this.memoButtonProps(styling)} list={this.memoListProps(calendars)} onSelect={onSelect} />
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    memoButtonProps = memoize((styling) => {
        return {
            cssNormal: styling,
            icon: CalendarMonth,
        };
    });

    /**
     *
     */
    memoListProps = memoize((calendars) => {
        const items = [];
        for (const calendarItem of calendars) {
            const {id, summary, backgroundColor} = calendarItem;
            items.push({
                name: id,
                icon: <Avatar name={summary} color={backgroundColor} />,
                label: summary,
            });
        }
        return {
            styling: SX.list,
            items,
            itemCss: SX.itemCss,
        };
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
SelectTime.propTypes = {
    // -------------------------------- direct:
    styling: PropTypes.object,
    calendarId: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    // -------------------------------- redux:
    calendars: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            summary: PropTypes.string.isRequired,
            backgroundColor: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

const mapStateToProps = (state) => ({
    calendars: selectCalendars(state),
});

export default connect(mapStateToProps)(SelectTime);
