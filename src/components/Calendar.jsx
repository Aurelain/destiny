import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BAR_HEIGHT, BAR_SAFETY, FOOTER_SAFETY, MILLISECONDS_IN_A_DAY, NEW_HEIGHT} from '../SETTINGS.js';
import Event from './Event.jsx';
import objectify from '../utils/objectify.js';
import Day from './Day.jsx';
import getYYYYMMDD from '../utils/getYYYYMMDD.js';
import {
    selectCalendars,
    selectEvents,
    selectExpandedEvents,
    selectForcedDone,
    selectShowDone,
} from '../state/selectors.js';
import checkEventIsDone from '../system/checkEventIsDone.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        paddingTop: BAR_HEIGHT + BAR_SAFETY + 8,
        paddingRight: 8,
        paddingBottom: NEW_HEIGHT + FOOTER_SAFETY + 8,
        paddingLeft: 8,
        '& > *:first-of-type': {
            marginTop: 8,
        },
        margin: 'auto',
        maxWidth: 640,
    },
    event: {
        borderBottom: 'solid 1px silver',
    },
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Calendar extends React.PureComponent {
    state = {
        collapsedIds: {},
    };

    render() {
        const {calendars, events, showDone, expandedEvents, forcedDone} = this.props;

        const calendarsById = objectify(calendars, 'id');
        const list = [];
        const knownDays = [];
        for (const event of events) {
            const {id, calendarId, summary, start, end, status, reminders, recurringEventId, recurrence} = event;
            const {backgroundColor, selected, timeZone, isReadOnly} = calendarsById[calendarId];
            if (!selected) {
                continue;
            }
            const isDone = checkEventIsDone(event, forcedDone);
            if (!showDone && isDone) {
                continue;
            }
            const isExpanded = id in expandedEvents;
            list.push(...this.buildPrecedingDays(start, knownDays));
            list.push(
                <Event
                    key={id}
                    calendarId={calendarId}
                    eventId={id}
                    backgroundColor={backgroundColor}
                    title={summary}
                    start={start}
                    status={status}
                    end={end}
                    timeZone={timeZone}
                    isDone={isDone}
                    isExpanded={isExpanded}
                    reminders={reminders}
                    recurringEventId={recurringEventId}
                    recurrence={recurrence}
                    showDone={showDone}
                    isReadOnly={isReadOnly}
                />,
            );
        }

        return <div css={SX.root}>{list}</div>;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    buildPrecedingDays = (eventStart, knownDays) => {
        const recentKnownDay = knownDays.at(-1);
        const label = getYYYYMMDD(eventStart);
        if (recentKnownDay?.label === label) {
            return [];
        }

        const endMillisecond = Number(new Date(label));
        const beginMillisecond = recentKnownDay?.millisecond + MILLISECONDS_IN_A_DAY || endMillisecond;
        const days = [];
        for (let i = beginMillisecond; i <= endMillisecond; i += MILLISECONDS_IN_A_DAY) {
            const dayDate = new Date(i);
            days.push(<Day key={i} date={dayDate} />);
            knownDays.push({
                label: getYYYYMMDD(dayDate),
                millisecond: i,
            });
        }
        return days;
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Calendar.propTypes = {
    // -------------------------------- redux:
    calendars: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            backgroundColor: PropTypes.string.isRequired,
        }),
    ).isRequired,
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            calendarId: PropTypes.string.isRequired,
            summary: PropTypes.string.isRequired,
            start: PropTypes.string.isRequired,
        }),
    ).isRequired,
    expandedEvents: PropTypes.objectOf(PropTypes.oneOf([true])).isRequired,
    forcedDone: PropTypes.objectOf(PropTypes.oneOf([true])).isRequired,
    showDone: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    calendars: selectCalendars(state),
    events: selectEvents(state),
    expandedEvents: selectExpandedEvents(state),
    forcedDone: selectForcedDone(state),
    showDone: selectShowDone(state),
});

export default connect(mapStateToProps)(Calendar);
