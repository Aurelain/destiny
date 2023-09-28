import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import Button from '../utils/ui/Button.jsx';
import ChevronDown from '../icons/ChevronDown.jsx';
import ChevronDoubleDown from '../icons/ChevronDoubleDown.jsx';
import ChevronTripleDown from '../icons/ChevronTripleDown.jsx';
import CalendarMonth from '../icons/CalendarMonth.jsx';
import ArrowCollapseUp from '../icons/ArrowCollapseUp.jsx';
import scheduleEvent from '../state/actions/scheduleEvent.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        marginTop: 4,
    },
    title: {
        height: 32,
        lineHeight: '32px',
        borderRadius: 4,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '0 0 0 6px',
        color: '#fff',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
        display: 'block',
        boxShadow: 'none',
        textAlign: 'left',
    },
    content: {
        padding: '4px 8px 8px 32px',
    },
    toolbar: {
        marginTop: 4,
        // display: 'flex',
        // justifyContent: 'right',
        textAlign: 'right',
    },
    btn: {
        margin: 2,
        padding: 4,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Event extends React.PureComponent {
    state = {
        isExpanded: false,
    };
    render() {
        const {title, backgroundColor} = this.props;
        const {isExpanded} = this.state;
        return (
            <div css={SX.root}>
                <div css={this.memoTitleCss(backgroundColor)} onClick={this.onTitleClick}>
                    {title}
                </div>
                {isExpanded && (
                    <div css={SX.content}>
                        {title}
                        <div css={SX.toolbar}>
                            <Button cssNormal={SX.btn} icon={ArrowCollapseUp} onClick={this.onTodayClick} />
                            <Button
                                cssNormal={SX.btn} //label={'1'}
                                icon={ChevronDown}
                                onClick={this.onOneClick}
                            />
                            <Button
                                cssNormal={SX.btn}
                                // label={'7'}
                                icon={ChevronDoubleDown}
                                onClick={this.onSevenClick}
                            />
                            <Button
                                cssNormal={SX.btn}
                                // label={'30'}
                                icon={ChevronTripleDown}
                                onClick={this.onThirtyClick}
                            />
                            <Button cssNormal={SX.btn} icon={CalendarMonth} onClick={this.onTodayClick} />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onTitleClick = () => {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    };

    onTodayClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, null, start, end);
    };

    onOneClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, 1, start, end);
    };

    onSevenClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, 7, start, end);
    };

    onThirtyClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, 30, start, end);
    };

    onCalendarClick = () => {};

    memoTitleCss = memoize((backgroundColor) => {
        return {...SX.title, backgroundColor};
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Event.propTypes = {
    calendarId: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
};
export default Event;
