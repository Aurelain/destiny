import React from 'react';
import {FOOTER_SAFETY, NEW_HEIGHT, PRIMARY_COLOR} from '../SETTINGS.js';
import Button from '../ui/Button.jsx';
import Plus from '../ui/Icons/Plus.jsx';
import SelectCalendar from './SelectCalendar.jsx';
import PropTypes from 'prop-types';
import {selectCalendars, selectEvents, selectPreferredCalendar} from '../state/selectors.js';
import {connect} from 'react-redux';
import memoize from 'memoize-one';
import changePreferredCalendar from '../state/actions/changePreferredCalendar.js';
import createEvent from '../state/actions/createEvent.js';
import findCalendar from '../system/findCalendar.js';
import clearShopping from '../state/actions/clearShopping.js';
import TrashCan from '../ui/Icons/TrashCan.jsx';
import checkShopping from '../system/checkShopping.js';
import {getState} from '../state/store.js';
import parseShopping from '../system/parseShopping.js';
import stringifyShopping from '../system/stringifyShopping.js';
import updateSummary from '../state/actions/updateSummary.js';
import defocus from '../utils/defocus.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: NEW_HEIGHT + FOOTER_SAFETY,
        paddingBottom: FOOTER_SAFETY,
        background: PRIMARY_COLOR,
        display: 'flex',
        flexDirection: 'row',
    },
    selectCalendar: {
        padding: '0 8px',
    },
    input: {
        flexGrow: 1,
        width: '100%',
        border: 'none',
        borderRadius: 20,
        padding: '0 16px',
        margin: '8px 2px',
        appearance: 'none',
        background: '#fff',
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
                <SelectCalendar
                    styling={SX.selectCalendar}
                    calendarId={preferredCalendar}
                    onSelect={this.onCalendarSelect}
                />
                <input
                    type={'search'} // https://stackoverflow.com/a/73466347/844393
                    autoComplete={'off'}
                    css={SX.input}
                    spellCheck={false}
                    value={value}
                    placeholder={'Event'}
                    onChange={this.onInputChange}
                    onKeyDown={this.onInputKeyDown}
                />
                <Button
                    icon={Plus}
                    holdIcon={TrashCan}
                    cssNormal={SX.plus}
                    variant={'inverted'}
                    onClick={this.onPlusClick}
                    onHold={this.onPlusHold}
                    disabled={!value}
                />
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
    onInputChange = (event) => {
        const {value} = event.target;
        this.setState({value});
    };

    /**
     *
     */
    onInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.create();
            defocus();
        }
    };

    /**
     *
     */
    onCalendarSelect = ({name}) => {
        changePreferredCalendar(name);
    };

    /**
     *
     */
    onPlusClick = () => {
        this.create();
    };

    /**
     *
     */
    onPlusHold = () => {
        clearShopping();
        this.setState({value: ''});
    };

    /**
     *
     */
    create = () => {
        const {calendars, preferredCalendar} = this.props;
        const {value} = this.state;
        this.setState({value: ''});

        if (checkShopping(value)) {
            const {title, items} = parseShopping(value);
            const state = getState();
            const events = selectEvents(state);
            const pendingEvent = events.find((event) => {
                const {summary} = event;
                return checkShopping(summary) && parseShopping(summary).title === title;
            });
            if (pendingEvent) {
                const {summary, calendarId, id} = pendingEvent;
                const shoppingStructure = parseShopping(summary);
                shoppingStructure.items.push(...items);
                updateSummary(calendarId, id, stringifyShopping(shoppingStructure));
                return;
            }
        }

        const calendar = findCalendar(preferredCalendar, calendars);
        createEvent(calendar.id, value);
    };

    /**
     *
     */
    memoBackgroundColor = memoize((preferredCalendar, calendars) => {
        const calendar = findCalendar(preferredCalendar, calendars);
        return calendar?.backgroundColor || '#000';
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
