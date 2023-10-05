import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import Button from '../utils/ui/Button.jsx';
import CalendarMonth from '../icons/CalendarMonth.jsx';
import ArrowCollapseUp from '../icons/ArrowCollapseUp.jsx';
import scheduleEvent from '../state/actions/scheduleEvent.js';
import getYYYYMMDD from '../utils/getYYYYMMDD.js';
import Bell from '../icons/Bell.jsx';
import ContentDuplicate from '../icons/ContentDuplicate.jsx';
import CheckCircle from '../icons/CheckCircle.jsx';
import classifyEvent from '../state/actions/classifyEvent.js';
import {DONE_MATCH} from '../SETTINGS.js';
import toggleEvent from '../state/actions/toggleEvent.js';
import ChooseCalendar from './ChooseCalendar.jsx';
import deleteEvent from '../state/actions/deleteEvent.js';
import moveEvent from '../state/actions/moveEvent.js';
import BellRing from '../icons/BellRing.jsx';
import toggleReminder from '../state/actions/toggleReminder.js';
import CircleMedium from '../icons/CircleMedium.jsx';
import CircleOutline from '../icons/CircleOutline.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        marginTop: 4,
    },
    title: {
        height: 32,
        borderRadius: 6,
        color: '#fff',
        display: 'flex',
    },
    titleHeading: {
        height: '100%',
        borderRadius: 6,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        flexShrink: 0,
    },
    titleText: {
        lineHeight: '32px',
        borderRadius: 0,
        flexGrow: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        boxShadow: 'none',
        textAlign: 'left',
        display: 'block',
        padding: 0,
        paddingLeft: 4,
        height: '100%',
        backgroundColor: 'inherit',
    },
    titleTimeInterval: {
        whiteSpace: 'nowrap',
        flexShrink: 0,
        lineHeight: '32px',
    },
    titleStatus: {
        height: '100%',
        borderRadius: 6,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        flexShrink: 0,
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
    content: {
        padding: 4,
        background: '#fff',
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        border: 'solid 1px #0b8043',
        borderTop: 0,
        transition: 'height 300ms ease',
    },
    toolbar: {
        margin: 4,
        display: 'flex',
    },
    btn: {
        margin: 2,
        padding: 4,
    },
    btnWithReminder: {
        color: 'yellow',
    },
    grow: {
        flexGrow: 1,
    },
    text: {
        padding: 8,
    },
};
const TODAY = getYYYYMMDD();

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Event extends React.PureComponent {
    state = {
        contentHeight: null,
    };
    render() {
        const {title, backgroundColor, start, end, isDone, isExpanded, calendarId, reminder} = this.props;
        const {contentHeight} = this.state;

        const timeInterval = this.memoTimeInterval(start, end);
        return (
            <div css={SX.root}>
                <div css={this.memoTitleCss(backgroundColor, isExpanded)}>
                    <Button
                        cssNormal={SX.titleHeading}
                        icon={CircleMedium}
                        onClick={this.onHeadingClick}
                        onHold={this.onHeadingHold}
                        variant={'inverted'}
                    />
                    <Button
                        cssNormal={SX.titleText}
                        label={this.memoCleanTitle(title)}
                        allowTouch={true}
                        onClick={this.onTitleClick}
                        onHold={this.onTitleHold}
                    />
                    {timeInterval && <div css={SX.titleTimeInterval}>{timeInterval}</div>}
                    <Button
                        cssNormal={SX.titleStatus}
                        icon={isDone ? CheckCircle : CircleOutline}
                        onClick={this.onStatusClick}
                        onHold={this.onStatusHold}
                        variant={'inverted'}
                    />
                </div>

                {(isExpanded || contentHeight !== null) && (
                    <div css={this.memoContentCss(backgroundColor)} style={{height: contentHeight}}>
                        <div
                            css={SX.text}
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={this.onTextBlur}
                            spellCheck={false}
                        >
                            {title}
                        </div>
                        <div css={SX.toolbar}>
                            <ChooseCalendar calendarId={calendarId} onSelect={this.onCalendarSelect} />
                            <Button // Bell
                                cssNormal={[SX.btn, reminder && SX.btnWithReminder]}
                                icon={reminder ? BellRing : Bell}
                                onClick={this.onBellClick}
                            />
                            <Button // Duplicate
                                cssNormal={SX.btn}
                                icon={ContentDuplicate}
                                onClick={this.onDuplicateClick}
                            />
                            <div css={SX.grow} />
                            {!start.startsWith(TODAY) && (
                                <Button // Move Today
                                    cssNormal={SX.btn}
                                    icon={ArrowCollapseUp}
                                    onClick={this.onTodayClick}
                                />
                            )}
                            <Button // Move Custom
                                cssNormal={SX.btn}
                                icon={CalendarMonth}
                                onClick={this.onCalendarClick}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isExpanded !== this.props.isExpanded) {
            // TODO
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    memoTimeInterval = memoize((start, end) => {
        start = start.substring(11, 16);
        if (start) {
            end = end.substring(11, 16);
            return start + '-' + end;
        }
    });

    onHeadingClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, 1, start, end);
    };

    onHeadingHold = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, 7, start, end);
    };

    onTitleClick = () => {
        const {eventId} = this.props;
        toggleEvent(eventId);
    };

    onTitleHold = () => {
        const {calendarId, eventId} = this.props;
        classifyEvent(calendarId, eventId);
    };

    onStatusClick = () => {
        const {calendarId, eventId} = this.props;
        classifyEvent(calendarId, eventId);
    };

    onStatusHold = () => {
        const {calendarId, eventId} = this.props;
        deleteEvent(calendarId, eventId);
    };

    onBellClick = () => {
        const {calendarId, eventId} = this.props;
        toggleReminder(calendarId, eventId);
    };

    onDuplicateClick = () => {
        // TODO
    };

    onTodayClick = async () => {
        const {calendarId, eventId, start, end} = this.props;
        await scheduleEvent(calendarId, eventId, null, start, end);
    };

    onCalendarClick = () => {
        // TODO
    };

    onCalendarSelect = (destinationCalendarId) => {
        const {calendarId, eventId} = this.props;
        if (calendarId !== destinationCalendarId) {
            moveEvent(calendarId, eventId, destinationCalendarId);
        }
    };

    onTextBlur = (event) => {
        const {innerHTML} = event.target;
        console.log('innerHTML:', innerHTML);
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

    memoCleanTitle = memoize((title) => {
        return title.replace(DONE_MATCH, '');
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
    isExpanded: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    reminder: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
};
export default Event;
