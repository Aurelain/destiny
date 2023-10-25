export default {
    $id: 'CalendarSchema',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            minLength: 1,
        },
        summary: {
            type: 'string',
            minLength: 1,
        },
        backgroundColor: {
            type: 'string',
            pattern: '#[0-9a-f]{6}',
        },
        timeZone: {
            type: 'string',
            minLength: 1,
        },
        accessRole: {
            type: 'string',
            minLength: 1,
        },
        selected: {
            type: 'boolean', // optional
        },
        primary: {
            type: 'boolean', // optional
        },
    },
    required: ['id', 'summary', 'backgroundColor', 'timeZone', 'accessRole'],
};

/*
{
    "kind": "calendar#calendarListEntry",
    "etag": "\"1695196155366000\"",
    "id": "94409cee00000000000000083046ea18c21f5ea1df92af799@group.calendar.google.com",
    "summary": "Foo3",
    "timeZone": "Europe/Bucharest",
    "colorId": "9",
    "backgroundColor": "#7bd148",
    "foregroundColor": "#000000",
    "selected": true,
    "accessRole": "owner",
    "defaultReminders": [],
    "conferenceProperties": {
        "allowedConferenceSolutionTypes": [
            "hangoutsMeet"
        ]
    }
}
 */
