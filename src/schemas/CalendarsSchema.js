export default {
    $id: 'CalendarsSchema',
    type: 'object',
    properties: {
        items: {
            type: 'array',
            minItems: 1,
            items: {
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
                    selected: {
                        type: 'boolean',
                    },
                },
                required: ['id', 'summary', 'backgroundColor'],
            },
        },
    },
    required: ['items'],
};

/*
{
    "kind": "calendar#calendarList",
    "etag": "\"p33kbtat2o75o20o\"",
    "nextSyncToken": "COi-q6LBy4EDEhJhdXJlbGFpbkBnbWFpbC5jb20=",
    "items": [
        {
            "kind": "calendar#calendarListEntry",
            "etag": "\"1606806103764000\"",
            "id": "foo@gmail.com",
            "summary": "Foo Bar",
            "timeZone": "Europe/Bucharest",
            "colorId": "8",
            "backgroundColor": "#16a765",
            "foregroundColor": "#000000",
            "selected": true,
            "accessRole": "owner",
            "defaultReminders": [{
                    "method": "popup",
                    "minutes": 30
                }
            ],
            "notificationSettings": {
                "notifications": [{
                        "type": "eventCreation",
                        "method": "email"
                    }, {
                        "type": "eventChange",
                        "method": "email"
                    }, {
                        "type": "eventCancellation",
                        "method": "email"
                    }, {
                        "type": "eventResponse",
                        "method": "email"
                    }
                ]
            },
            "primary": true,
            "conferenceProperties": {
                "allowedConferenceSolutionTypes": [
                    "hangoutsMeet"
                ]
            }
        }, {
            "kind": "calendar#calendarListEntry",
            "etag": "\"1694890223934000\"",
            "id": "bac0391cf04fa0000000005cdacfaa163e2efa00000000ba489c8284f@group.calendar.google.com",
            "summary": "Foo2",
            "timeZone": "Europe/Bucharest",
            "colorId": "16",
            "backgroundColor": "#4986e7",
            "foregroundColor": "#000000",
            "selected": true,
            "accessRole": "owner",
            "defaultReminders": [],
            "conferenceProperties": {
                "allowedConferenceSolutionTypes": [
                    "hangoutsMeet"
                ]
            }
        }, {
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
        }, {
            "kind": "calendar#calendarListEntry",
            "etag": "\"1695549511370000\"",
            "id": "foo.foo@gmail.com",
            "summary": "foo.foo@gmail.com",
            "timeZone": "Europe/Bucharest",
            "colorId": "24",
            "backgroundColor": "#a47ae2",
            "foregroundColor": "#000000",
            "selected": true,
            "accessRole": "reader",
            "defaultReminders": [],
            "conferenceProperties": {
                "allowedConferenceSolutionTypes": [
                    "hangoutsMeet"
                ]
            }
        }
    ]
}


 */
