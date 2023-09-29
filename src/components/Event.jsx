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
import CheckCircle from '../icons/CheckCircle.jsx';
import classifyEvent from '../state/actions/classifyEvent.js';
import {DONE_MATCH} from '../SETTINGS.js';

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
        padding: 0,
        color: '#fff',
        cursor: 'pointer',
        display: 'block',
        boxShadow: 'none',
        textAlign: 'left',
    },
    titleExpanded: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    titleLabel: {
        padding: '0 6px',
        display: 'flex',
        alignItems: 'center',
    },
    titleLabelText: {
        flexGrow: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    titleLabelDone: {
        flexShrink: 0,
    },
    content: {
        padding: 8,
        background: '#fff',
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        border: 'solid 1px #0b8043',
        borderTop: 0,
        transition: 'height 300ms ease',
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
        contentHeight: null,
    };
    render() {
        const {title, backgroundColor, start, isDone} = this.props;
        const {isExpanded, contentHeight} = this.state;

        return (
            <div css={SX.root}>
                <Button
                    label={this.memoLabel(title, isDone)}
                    cssNormal={this.memoTitleCss(backgroundColor, isExpanded)}
                    allowTouch={true}
                    onClick={this.onTitleClick}
                    onHold={this.onTitleHold}
                />
                {(isExpanded || contentHeight !== null) && (
                    <div css={this.memoContentCss(backgroundColor)} style={{height: contentHeight}}>
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isExpanded !== this.state.isExpanded) {
            // TODO
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    onTitleClick = () => {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    };

    onTitleHold = () => {
        const {calendarId, eventId} = this.props;
        classifyEvent(calendarId, eventId);
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

    memoLabel = memoize((title, isDone) => {
        return (
            <div css={SX.titleLabel}>
                <div css={SX.titleLabelText}>{title.replace(DONE_MATCH, '')}</div>
                {isDone && <CheckCircle styling={SX.titleLabelDone} />}
            </div>
        );
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
    isDone: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
};
export default Event;
