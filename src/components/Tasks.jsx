import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BAR_HEIGHT, BAR_SAFETY, FOOTER_SAFETY, NEW_HEIGHT} from '../SETTINGS.js';
import {selectCalendars, selectEvents, selectExpandedEvents, selectShowDone} from '../state/selectors.js';
import objectify from '../utils/objectify.js';
import checkEventIsDone from '../system/checkEventIsDone.js';
import Event from './Event.jsx';
import checkTask from '../utils/checkTask.js';

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
};

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class Tasks extends React.PureComponent {
    state = {
        collapsedIds: {},
    };

    render() {
        const {calendars} = this.props;
        const calendarsById = objectify(calendars, 'id');
        const list = [];
        for (const calendarId in calendarsById) {
            const tasks = this.getTasksOfCalendar(calendarId, calendarsById);
            if (tasks.length) {
                list.push(...tasks);
            }
        }
        return <div css={SX.root}>{list}</div>;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    getTasksOfCalendar = (targetCalendarId, calendarsById) => {
        const {events, expandedEvents, showDone} = this.props;
        const list = [];
        const {backgroundColor, timeZone, isReadOnly} = calendarsById[targetCalendarId];
        for (const event of events) {
            const {id, calendarId, summary, start, end, status, reminders, isLocked} = event;
            if (calendarId !== targetCalendarId) {
                continue;
            }
            if (checkTask(start)) {
                const isDone = checkEventIsDone(event, {});
                const isExpanded = id in expandedEvents;
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
                        showDone={showDone}
                        isReadOnly={isReadOnly}
                        isLocked={isLocked}
                    />,
                );
            }
        }
        return list;
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
Tasks.propTypes = {
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
    showDone: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    calendars: selectCalendars(state),
    events: selectEvents(state),
    expandedEvents: selectExpandedEvents(state),
    showDone: selectShowDone(state),
});

export default connect(mapStateToProps)(Tasks);
