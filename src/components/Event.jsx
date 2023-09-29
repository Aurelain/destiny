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
import getYYYYMMDD from '../utils/getYYYYMMDD.js';
import Bell from '../icons/Bell.jsx';
import ContentDuplicate from '../icons/ContentDuplicate.jsx';

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
        borderRadius: 6,
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
    titleExpanded: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    content: {
        padding: 8,
        background: '#fff',
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        border: 'solid 1px #0b8043',
    },
    toolbar: {
        marginTop: 4,
        display: 'flex',
    },
    btn: {
        margin: 2,
        padding: 4,
    },
    grow: {
        flexGrow: 1,
    },
};
const TODAY = getYYYYMMDD();

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Event extends React.PureComponent {
    state = {
        isExpanded: false,
    };
    render() {
        const {title, backgroundColor, start} = this.props;
        const {isExpanded} = this.state;

        return (
            <div css={SX.root}>
                <div css={this.memoTitleCss(backgroundColor, isExpanded)} onClick={this.onTitleClick}>
                    {title}
                </div>
                {isExpanded && (
                    <div css={this.memoContentCss(backgroundColor)}>
                        {title}
                        <div css={SX.toolbar}>
                            <Button // Bell
                                cssNormal={SX.btn}
                                icon={Bell}
                                onClick={this.onBellClick}
                            />
                            <Button // Duplicate
                                cssNormal={SX.btn}
                                icon={ContentDuplicate}
                                onClick={this.onDuplicateClick}
                            />
                            <div css={SX.grow} />
                            <Button
                                disabled={start.startsWith(TODAY)}
                                cssNormal={SX.btn}
                                icon={ArrowCollapseUp}
                                onClick={this.onTodayClick}
                            />
                            <Button // 1
                                cssNormal={SX.btn}
                                icon={ChevronDown}
                                onClick={this.onOneClick}
                            />
                            <Button // 7
                                cssNormal={SX.btn}
                                icon={ChevronDoubleDown}
                                onClick={this.onSevenClick}
                            />
                            <Button // 30
                                cssNormal={SX.btn}
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

    onBellClick = () => {};

    onDuplicateClick = () => {};

    onTodayClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, null, start, end);
        this.collapse();
    };

    onOneClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, 1, start, end);
        this.collapse();
    };

    onSevenClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, 7, start, end);
        this.collapse();
    };

    onThirtyClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, 30, start, end);
        this.collapse();
    };

    onCalendarClick = () => {
        this.collapse();
    };

    collapse = () => {
        this.setState({
            isExpanded: false,
        });
    };

    memoTitleCss = memoize((backgroundColor, isExpanded) => {
        const output = {...SX.title, backgroundColor};
        if (isExpanded) {
            Object.assign(output, SX.titleExpanded);
        }
        return output;
    });

    memoContentCss = memoize((backgroundColor) => {
        return {...SX.content, borderColor: backgroundColor};
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
