import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import Button from '../ui/Button.jsx';
import CalendarMonth from '../ui/Icons/CalendarMonth.jsx';
import scheduleEvent from '../state/actions/scheduleEvent.js';
import Bell from '../ui/Icons/Bell.jsx';
import CheckCircle from '../ui/Icons/CheckCircle.jsx';
import classifyEvent from '../state/actions/classifyEvent.js';
import {BAR_HEIGHT, DONE_MATCH, NEW_HEIGHT} from '../SETTINGS.js';
import toggleEvent from '../state/actions/toggleEvent.js';
import SelectCalendar from './SelectCalendar.jsx';
import deleteEvent from '../state/actions/deleteEvent.js';
import moveEvent from '../state/actions/moveEvent.js';
import BellRing from '../ui/Icons/BellRing.jsx';
import toggleReminder from '../state/actions/toggleReminder.js';
import CircleOutline from '../ui/Icons/CircleOutline.jsx';
import updateSummary from '../state/actions/updateSummary.js';
import Shopping from './Shopping.jsx';
import Editable from '../ui/Editable.jsx';
import sanitizeSummary from '../system/sanitizeSummary.js';
import Fan from '../ui/Icons/Fan.jsx';
import ArrowDownThin from '../ui/Icons/ArrowDownThin.jsx';
import ChevronDoubleDown from '../ui/Icons/ChevronDoubleDown.jsx';
import TrashCan from '../ui/Icons/TrashCan.jsx';
import Select from '../ui/Select.jsx';
import MonthTime from './MonthTime/MonthTime.jsx';
import FanAlert from '../ui/Icons/FanAlert.jsx';
import Recurrence from './Recurrence.jsx';
import checkShopping from '../system/checkShopping.js';
import scrollIntoView from '../utils/scrollIntoView.js';
import {burstAtMouse} from '../ui/Fireworks.jsx';
import collapse from '../system/collapse.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        marginTop: 4,
        overflow: 'hidden',
    },
    title: {
        height: 32,
        borderRadius: 6,
        color: '#fff',
        display: 'flex',
        boxShadow: 'none',
        padding: 0,
        paddingLeft: 4,
    },
    titleContent: {
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100% - 28px)',
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
const TIME_BUTTON_PROPS = {
    cssNormal: SX.btn,
    icon: CalendarMonth,
    holdIcon: TrashCan,
};

const FAN_BUTTON_PROPS = {
    cssNormal: SX.btn,
    icon: Fan,
};

const FAN_ALERT_BUTTON_PROPS = {
    cssNormal: [SX.btn, SX.btnSpecial],
    icon: FanAlert,
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Event extends React.PureComponent {
    state = {
        contentHeight: null,
    };
    rootRef = React.createRef();

    render() {
        const {
            title,
            backgroundColor,
            start,
            end,
            timeZone,
            isExpanded,
            calendarId,
            reminder,
            isDone,
            recurringEventId,
        } = this.props;
        const {contentHeight} = this.state;

        const timeInterval = this.memoTimeInterval(start, end);
        const sanitizedTitle = this.memoSanitizeTitle(title);
        const titleWithoutAnchors = this.memoTitleWithoutAnchors(sanitizedTitle);
        const SummaryComponent = this.memoSummaryComponent(title);
        return (
            <div css={SX.root} ref={this.rootRef}>
                <Button
                    cssNormal={this.memoTitleCss(backgroundColor, isExpanded)}
                    icon={isDone ? CheckCircle : CircleOutline}
                    holdIcon={isDone ? CircleOutline : CheckCircle}
                    label={this.memoTitleLabel(titleWithoutAnchors, timeInterval)}
                    onClick={this.onTitleClick}
                    onHold={this.onTitleHold}
                />
                {(isExpanded || contentHeight !== null) && (
                    <div css={this.memoContentCss(backgroundColor)} style={{height: contentHeight}}>
                        <SummaryComponent html={sanitizedTitle} onChange={this.onSummaryChange} />
                        <div css={SX.toolbar}>
                            <div css={SX.grow} />
                            <Select
                                buttonProps={TIME_BUTTON_PROPS}
                                list={MonthTime}
                                listProps={this.memoListProps(start, end, timeZone)}
                                onSelect={this.onMonthTimeSelect}
                                onHold={this.onMonthTimeHold}
                                // forcedOpen={true}
                            />
                            <Button // Bell
                                cssNormal={[SX.btn, reminder && SX.btnSpecial]}
                                icon={reminder ? BellRing : Bell}
                                onClick={this.onBellClick}
                            />
                            <Select
                                buttonProps={recurringEventId ? FAN_ALERT_BUTTON_PROPS : FAN_BUTTON_PROPS}
                                list={Recurrence}
                                onOpen={this.onFanOpen}
                                onSelect={this.onFanSelect}
                            />
                            <SelectCalendar calendarId={calendarId} onSelect={this.onCalendarSelect} />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    componentDidMount() {
        const {isExpanded} = this.props;
        if (isExpanded) {
            scrollIntoView(this.rootRef.current, {
                header: BAR_HEIGHT,
                footer: NEW_HEIGHT,
            });
        }
    }

    componentDidUpdate(prevProps) {
        const {isExpanded} = this.props;
        if (isExpanded && prevProps.isExpanded !== isExpanded) {
            scrollIntoView(this.rootRef.current, {
                header: BAR_HEIGHT,
                footer: NEW_HEIGHT,
            });
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
        const {calendarId, eventId} = this.props;
        await scheduleEvent(calendarId, eventId, 1);
    };

    onHeadingHold = async () => {
        const {calendarId, eventId} = this.props;
        await scheduleEvent(calendarId, eventId, 7);
    };

    onTitleClick = () => {
        const {eventId} = this.props;
        toggleEvent(eventId);
    };

    onTitleHold = async ({event}) => {
        collapse({currentTarget: this.rootRef.current});
        await burstAtMouse(event);

        const {calendarId, eventId} = this.props;
        classifyEvent(calendarId, eventId);
    };

    onSummaryChange = ({value}) => {
        const {calendarId, eventId} = this.props;
        updateSummary(calendarId, eventId, value);
    };

    onMonthTimeSelect = (startAndEnd) => {
        console.log('onMonthTimeSelect:', startAndEnd);
        const {calendarId, eventId} = this.props;
        scheduleEvent(calendarId, eventId, startAndEnd);
    };

    onMonthTimeHold = () => {
        const {calendarId, eventId} = this.props;
        deleteEvent(calendarId, eventId);
    };

    onBellClick = () => {
        const {calendarId, eventId} = this.props;
        toggleReminder(calendarId, eventId);
    };

    onFanOpen = () => {
        console.log('onFanOpen:');
    };

    onFanSelect = (value) => {
        console.log('onFanSelect:', value);
    };

    onCalendarSelect = ({name: destinationCalendarId}) => {
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

    memoTitleLabel = memoize((title, timeInterval) => {
        return (
            <div css={SX.titleContent}>
                {/*<Button*/}
                {/*    cssNormal={SX.titleStatus}*/}
                {/*    icon={isDone ? CheckCircle : CircleOutline}*/}
                {/*    holdIcon={TrashCan}*/}
                {/*    onClick={this.onStatusClick}*/}
                {/*    onHold={this.onStatusHold}*/}
                {/*    variant={'inverted'}*/}
                {/*/>*/}
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
        return checkShopping(title) ? Shopping : Editable;
    });

    memoListProps = memoize((start, end, timeZone) => {
        return {start, end, timeZone};
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
    timeZone: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    reminder: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    recurringEventId: PropTypes.string,
    recurrence: PropTypes.string,
};
export default Event;
