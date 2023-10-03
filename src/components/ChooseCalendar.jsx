import React from 'react';
import PropTypes from 'prop-types';
import {selectCalendars} from '../state/selectors.js';
import {connect} from 'react-redux';
import Avatar from '../utils/ui/Avatar.jsx';
import memoize from 'memoize-one';
import Select from '../utils/ui/Select.jsx';
import {BOX_SHADOW} from '../SETTINGS.js';
import findCalendar from '../system/findCalendar.js';

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
class ChooseCalendar extends React.PureComponent {
    render() {
        const {calendars, calendarId, styling, onSelect} = this.props;
        return (
            <Select
                button={this.memoButtonProps(calendars, calendarId, styling)}
                list={this.memoListProps(calendars)}
                onSelect={onSelect}
            />
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    memoButtonProps = memoize((calendars, calendarId, styling) => {
        const calendar = findCalendar(calendarId, calendars);
        const {summary, backgroundColor} = calendar;
        return {
            cssNormal: {...SX.buttonNormal, ...styling},
            cssActive: SX.buttonActive,
            icon: <Avatar name={summary} color={backgroundColor} />,
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
ChooseCalendar.propTypes = {
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

export default connect(mapStateToProps)(ChooseCalendar);
