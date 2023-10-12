import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import Button from '../utils/ui/Button.jsx';
import CalendarMonth from '../icons/CalendarMonth.jsx';
import scheduleEvent from '../state/actions/scheduleEvent.js';
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
import CircleOutline from '../icons/CircleOutline.jsx';
import updateSummary from '../state/actions/updateSummary.js';
import Shopping from './Shopping.jsx';
import Editable from '../utils/ui/Editable.jsx';
import sanitizeSummary from '../system/sanitizeSummary.js';
import Fan from '../icons/Fan.jsx';
import ArrowDownThin from '../icons/ArrowDownThin.jsx';
import ChevronDoubleDown from '../icons/ChevronDoubleDown.jsx';
import TrashCan from '../icons/TrashCan.jsx';

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
        display: 'block',
        boxShadow: 'none',
        padding: 0,
    },
    titleContent: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
    },
    titleHeading: {
        height: '100%',
        borderRadius: 6,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        flexShrink: 0,
    },
    titleText: {
        textAlign: 'left',
        flexGrow: 1,
        lineHeight: '32px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    titleTime: {
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
    btnSpecial: {
        color: 'yellow',
    },
    grow: {
        flexGrow: 1,
    },
    text: {
        padding: 8,
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Event extends React.PureComponent {
    state = {
        contentHeight: null,
    };
    render() {
        const {title, backgroundColor, start, end, isExpanded, calendarId, reminder, isDone} = this.props;
        const {contentHeight} = this.state;

        const timeInterval = this.memoTimeInterval(start, end);
        const sanitizedTitle = this.memoSanitizeTitle(title);
        const titleWithoutAnchors = this.memoTitleWithoutAnchors(sanitizedTitle);
        const SummaryComponent = this.memoSummaryComponent(title);
        return (
            <div css={SX.root}>
                <Button
                    cssNormal={this.memoTitleCss(backgroundColor, isExpanded)}
                    label={this.memoTitleLabel(titleWithoutAnchors, timeInterval, isDone)}
                    allowTouch={true}
                    onClick={this.onTitleClick}
                    onHold={this.onTitleHold}
                />
                {(isExpanded || contentHeight !== null) && (
                    <div css={this.memoContentCss(backgroundColor)} style={{height: contentHeight}}>
                        <SummaryComponent html={sanitizedTitle} onChange={this.onSummaryChange} />
                        <div css={SX.toolbar}>
                            <div css={SX.grow} />
                            <Button // Move Custom
                                cssNormal={SX.btn}
                                icon={CalendarMonth}
                                onClick={this.onCalendarClick}
                            />
                            <Button // Bell
                                cssNormal={[SX.btn, reminder && SX.btnSpecial]}
                                icon={reminder ? BellRing : Bell}
                                onClick={this.onBellClick}
                            />
                            <Button // Repeating
                                cssNormal={SX.btn}
                                icon={Fan}
                                onClick={this.onFanClick}
                            />
                            <Button // Duplicate
                                cssNormal={SX.btn}
                                icon={ContentDuplicate}
                                onClick={this.onDuplicateClick}
                            />
                            <ChooseCalendar calendarId={calendarId} onSelect={this.onCalendarSelect} />
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

    onSummaryChange = (summary) => {
        const {calendarId, eventId} = this.props;
        updateSummary(calendarId, eventId, summary);
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

    onFanClick = async () => {
        // const {calendarId, eventId, start, end} = this.props;
        // await scheduleEvent(calendarId, eventId, null, start, end);
        // TODO
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

    memoTitleCss = memoize((backgroundColor, isExpanded) => {
        const output = {...SX.title, backgroundColor};
        if (isExpanded) {
            Object.assign(output, SX.titleExpanded);
        }
        return output;
    });

    memoTitleLabel = memoize((title, timeInterval, isDone) => {
        return (
            <div css={SX.titleContent}>
                <Button
                    cssNormal={SX.titleStatus}
                    icon={isDone ? CheckCircle : CircleOutline}
                    holdIcon={TrashCan}
                    onClick={this.onStatusClick}
                    onHold={this.onStatusHold}
                    variant={'inverted'}
                />
                <div css={SX.titleText}>{title.replace(DONE_MATCH, '')}</div>
                {timeInterval && <div css={SX.titleTime}>{timeInterval}</div>}
                <Button
                    cssNormal={SX.titleHeading}
                    icon={ArrowDownThin}
                    holdIcon={ChevronDoubleDown}
                    onClick={this.onHeadingClick}
                    onHold={this.onHeadingHold}
                    variant={'inverted'}
                />
            </div>
        );
    });

    memoContentCss = memoize((backgroundColor) => {
        return {...SX.content, borderColor: backgroundColor};
    });

    memoSanitizeTitle = memoize((title) => {
        title = sanitizeSummary(title);
        title = title.replace(DONE_MATCH, '');
        return title;
    });

    memoTitleWithoutAnchors = memoize((title) => {
        return title.replace(/<.*?>/g, '');
    });

    memoSummaryComponent = memoize((title) => {
        const shoppingTitle = title.match(/^[\s-]*\S+:/)?.[0];
        const isShopping = shoppingTitle && !shoppingTitle.match(/http/i);
        return isShopping ? Shopping : Editable;
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
