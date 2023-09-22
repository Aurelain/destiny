import React from 'react';
import PropTypes from 'prop-types';
import {BAR_HEIGHT, NEW_HEIGHT} from '../system/CLIENT.js';
import Event from './Event.jsx';
import objectify from '../utils/objectify.js';
import Day from './Day.jsx';
import {MILLISECONDS_IN_A_DAY} from '../../sw/system/SW.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const SX = {
    root: {
        paddingTop: BAR_HEIGHT + 8,
        paddingRight: 8,
        paddingBottom: NEW_HEIGHT + 8,
        paddingLeft: 8,
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
        const {store} = this.props;
        const {calendars, events} = store;

        const calendarsById = objectify(calendars, 'id');
        const nowDate = new Date();
        const list = [];
        const knownDays = [];
        for (const event of events) {
            const {id, calendarId, summary, start} = event;
            const startDate = new Date(start);
            const isPast = startDate < nowDate;
            const {backgroundColor} = calendarsById[calendarId];
            list.push(...this.buildPrecedingDays(start, knownDays, isPast));
            list.push(<Event key={id} backgroundColor={backgroundColor} title={summary} />);
        }

        return <div css={SX.root}>{list}</div>;
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    buildPrecedingDays = (eventStart, knownDays, isPast) => {
        const recentKnownDay = knownDays.at(-1);
        const label = eventStart.substring(0, 10);
        if (recentKnownDay?.label === label) {
            return [];
        }

        const endMillisecond = Number(new Date(label));
        const beginMillisecond = recentKnownDay?.millisecond + MILLISECONDS_IN_A_DAY || endMillisecond;
        const days = [];
        for (let i = beginMillisecond; i <= endMillisecond; i += MILLISECONDS_IN_A_DAY) {
            const dayDate = new Date(i);
            days.push(<Day key={i} date={dayDate} isPast={isPast} />);
            knownDays.push({
                label: dayDate.toISOString().substring(0, 10),
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
    store: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};
export default Calendar;
