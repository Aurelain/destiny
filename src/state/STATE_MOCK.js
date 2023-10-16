import sortEvents from '../system/sortEvents.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
const STATE_MOCK = {
    tokens: {
        accessToken: 'foo',
        refreshToken: 'foo',
        expirationTimestamp: 0,
    },
    calendars: [
        {
            id: 'first',
            summary: 'First',
            backgroundColor: '#f4511e',
            selected: true,
        },
        {
            id: 'foo@gmail.com',
            summary: 'Foo',
            backgroundColor: '#0b8043',
            selected: true,
        },
    ],
    events: sortEvents([
        {
            id: 'urm29vfme6ebe49npr10',
            calendarId: 'first',
            summary: 'Test',
            start: '2023-10-25T15:00:00+03:00',
            end: '2023-10-25T16:00:00+03:00',
            status: 'confirmed',
            reminder: false,
        },
        {
            id: 'urm29vfme6ebe49npr1hrn5kd1',
            calendarId: 'foo@gmail.com',
            summary: 'A Hello World',
            start: '2023-10-25',
            end: '2023-10-25',
            status: 'cancelled',
            reminder: false,
        },
        {
            id: 'urm29vfme6ebe49npr1hrn5kdg',
            calendarId: 'foo@gmail.com',
            summary: 'Borem ipsum dolor sit amet, https://www.google.com adipiscing elit. Phasellus aliquet est utquam',
            start: '2023-10-25T16:00:00+03:00',
            end: '2023-10-25T17:00:00+03:00',
            status: 'confirmed',
            reminder: false,
            recurringEventId: 'myRecurringEventId',
            recurrence: 'x',
        },
        {
            id: 'urm29vfme6ebe49npr1hrn5k2',
            calendarId: 'foo@gmail.com',
            summary: `
            Foo:
            bar https://google.com ,
            https://bing.com ,
            hello Lorem ipsum dolor sit amet consectetuer adipiscing elit Phasellus aliquet est ut quam rutrum fringla,
            world, lorem ipsum
            `,
            start: '2023-10-25',
            end: '2023-10-25',
            status: 'confirmed',
            reminder: false,
        },
    ]),
    options: {
        expandedEvents: {
            // urm29vfme6ebe49npr1hrn5kd1: true,
            urm29vfme6ebe49npr1hrn5kdg: true,
            // urm29vfme6ebe49npr1hrn5k2: true,
        },
        preferredCalendar: '',
        showDone: false,
    },
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default STATE_MOCK;
