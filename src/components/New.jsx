import React from 'react';
import {NEW_HEIGHT, PRIMARY_COLOR} from '../SETTINGS.js';
import Button from '../utils/ui/Button.jsx';
import Plus from '../icons/Plus.jsx';
import ChooseCalendar from './ChooseCalendar.jsx';
import PropTypes from 'prop-types';
import {selectCalendars, selectPreferredCalendar} from '../state/selectors.js';
import {connect} from 'react-redux';
import memoize from 'memoize-one';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: NEW_HEIGHT,
        background: PRIMARY_COLOR,
        display: 'flex',
        flexDirection: 'row',
    },
    chooseCalendar: {
        padding: '0 8px',
    },
    input: {
        flexGrow: 1,
        width: '100%',
        border: 'none',
        borderRadius: 20,
        padding: '0 16px',
        margin: '8px 2px',
    },
    plus: {
        height: '100%',
        padding: 8,
    },
    sliver: {
        position: 'absolute',
        inset: '0 0 auto 0',
        height: 1,
        background: 'rgba(0,0,0,0.1)',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class New extends React.PureComponent {
    state = {
        value: '',
    };

    render() {
        const {preferredCalendar, calendars} = this.props;
        const {value} = this.state;
        const backgroundColor = this.memoBackgroundColor(preferredCalendar, calendars);
        return (
            <div css={SX.root} style={{backgroundColor}}>
                <ChooseCalendar styling={SX.chooseCalendar} calendarId={preferredCalendar} />
                <input
                    type={'search'} // https://stackoverflow.com/a/73466347/844393
                    autoComplete={'off'}
                    css={SX.input}
                    spellCheck={false}
                    value={value}
                    placeholder={'Event'}
                    onChange={this.onInputChange}
                />
                <Button icon={Plus} cssNormal={SX.plus} variant={'inverted'} />
                <div css={SX.sliver} />
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onInputChange = () => {};

    /**
     *
     */
    memoBackgroundColor = memoize((preferredCalendar, calendars) => {
        const calendar = preferredCalendar ? calendars.find((item) => item.id === preferredCalendar) : calendars[0];
        return calendar.backgroundColor;
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
New.propTypes = {
    // -------------------------------- redux:
    calendars: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            backgroundColor: PropTypes.string.isRequired,
        }),
    ).isRequired,
    preferredCalendar: PropTypes.string,
};

const mapStateToProps = (state) => ({
    calendars: selectCalendars(state),
    preferredCalendar: selectPreferredCalendar(state),
});

export default connect(mapStateToProps)(New);
