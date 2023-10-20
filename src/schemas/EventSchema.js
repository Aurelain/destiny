export default {
    $id: 'EventSchema',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            minLength: 1,
        },
        summary: {
            type: 'string',
        },
        start: {
            type: 'object',
            properties: {
                date: {
                    type: 'string',
                    pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
                },
                dateTime: {
                    type: 'string',
                    pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T',
                },
            },
            oneOf: [
                {
                    required: ['date'],
                },
                {
                    required: ['dateTime'],
                },
            ],
        },
        end: {
            type: 'object',
            properties: {
                date: {
                    type: 'string',
                    pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
                },
                dateTime: {
                    type: 'string',
                    pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T',
                },
            },
            oneOf: [
                {
                    required: ['date'],
                },
                {
                    required: ['dateTime'],
                },
            ],
        },
        status: {
            enum: ['confirmed', 'tentative', 'cancelled'],
        },
        reminders: {
            type: 'object', // optional, this is missing in `en.romanian#holiday@group.v.calendar.google.com`
            properties: {
                useDefault: {
                    type: 'boolean',
                },
                overrides: {
                    type: 'array',
                },
            },
        },
        recurringEventId: {
            type: 'string', // optional
        },
        recurrence: {
            type: 'array', // optional
            items: {
                type: 'string',
            },
        },
    },
    required: ['id', 'summary', 'start', 'end', 'status'],
};

/*
{
    "kind": "calendar#event",
    "etag": "\"3391814341773000\"",
    "id": "clgjgd9n70ojib9hcdgmab9k74sj6bb26kq36b9l61h30c9k64s38pb46g",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=Y2xnamdkOW4....DMwYzlrNjRzMzhwYjQ2ZyBhdXJlbGFpbkBt",
    "created": "2023-09-27T17:05:09.000Z",
    "updated": "2023-09-28T13:26:03.813Z",
    "creator": {
        "email": "foo@gmail.com",
        "self": true
    },
    "organizer": {
        "email": "foo@gmail.com",
        "self": true
    },
    "start": {
        "date": "2023-09-29"
    },
    "end": {
        "date": "2023-09-29"
    },
    "iCalUID": "clgjgd9n70ojib9hc...b9l61h30c9k64s38pb46g@google.com",
    "sequence": 6,
    "reminders": {
        "useDefault": false,
        "overrides": [{
                "method": "popup",
                "minutes": 30
            }
        ]
    },
    "eventType": "default"
}
 */

/*
event: {
    "kind": "calendar#event",
    "etag": "\"3392683874134000\"",
    "id": "20231031_jbl674tc2duf8i9cl09kg2qvs4",
    "status": "confirmed",
    "htmlLink": "https://www.google.com/calendar/event?eid=MjAyMzE5pYW4jaG9saWRheUB2",
    "created": "2023-10-03T14:05:37.000Z",
    "updated": "2023-10-03T14:05:37.067Z",
    "summary": "Halloween",
    "description": "Observance\nTo hide observances, go to Google Calendar Settings > Holidays in Romania",
    "creator": {
        "email": "en.romanian#holiday@group.v.calendar.google.com",
        "displayName": "Holidays in Romania",
        "self": true
    },
    "organizer": {
        "email": "en.romanian#holiday@group.v.calendar.google.com",
        "displayName": "Holidays in Romania",
        "self": true
    },
    "start": {
        "date": "2023-10-31"
    },
    "end": {
        "date": "2023-11-01"
    },
    "transparency": "transparent",
    "visibility": "public",
    "iCalUID": "20231031_jbl674tc2duf8i9cl09kg2qvs4@google.com",
    "sequence": 0,
    "eventType": "default"
}
 */
