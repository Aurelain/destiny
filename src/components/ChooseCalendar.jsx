import React from 'react';
import PropTypes from 'prop-types';
import Button from '../utils/ui/Button.jsx';
import {selectCalendars} from '../state/selectors.js';
import {connect} from 'react-redux';
import Avatar from '../utils/ui/Avatar.jsx';
import memoize from 'memoize-one';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        padding: 2,
        background: 'none',
        boxShadow: 'none',
        '& > *': {
            border: 'solid 1px #fff',
            boxShadow:
                '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        },
    },
    buttonActive: {
        '& > *': {
            boxShadow: 'none',
        },
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class ChooseCalendar extends React.PureComponent {
    render() {
        const {calendars, calendarId, styling} = this.props;

        return (
            <>
                <Button
                    cssNormal={this.memoCss(styling)}
                    cssActive={SX.buttonActive}
                    icon={this.memoAvatar(calendars, calendarId)}
                />
            </>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    memoAvatar = memoize((calendars, calendarId) => {
        const calendar = calendarId ? calendars.find((item) => item.id === calendarId) : calendars[0];
        const {summary, backgroundColor} = calendar;
        return <Avatar name={summary} color={backgroundColor} />;
    });

    /**
     *
     */
    memoCss = memoize((styling) => {
        // TODO: improve the emotion factory
        return {...SX.root, ...styling};
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
ChooseCalendar.propTypes = {
    // -------------------------------- direct:
    styling: PropTypes.object,
    calendarId: PropTypes.string,
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
