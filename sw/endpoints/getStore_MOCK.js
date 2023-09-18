/* eslint-disable max-len */
export default {
    user: {
        sub: '110705480637210112523',
        picture: 'https://lh3.googleusercontent.com/a/default-user\u003ds96-c',
        email: 'foo@gmail.com',
        email_verified: true,
    },
    calendars: {
        kind: 'calendar#calendarList',
        etag: '"p324dne5ulqp820o"',
        nextSyncToken: 'CIjbuL6usoEDEhJhdXJlbGFpbkBnbWFpbC5jb20=',
        items: [
            {
                kind: 'calendar#calendarListEntry',
                etag: '"1606806103764000"',
                id: 'foo@gmail.com',
                summary: 'Foo Bar',
                timeZone: 'Europe/Bucharest',
                colorId: '8',
                backgroundColor: '#16a765',
                foregroundColor: '#000000',
                selected: true,
                accessRole: 'owner',
                defaultReminders: [
                    {
                        method: 'popup',
                        minutes: 30,
                    },
                ],
                notificationSettings: {
                    notifications: [
                        {
                            type: 'eventCreation',
                            method: 'email',
                        },
                        {
                            type: 'eventChange',
                            method: 'email',
                        },
                        {
                            type: 'eventCancellation',
                            method: 'email',
                        },
                        {
                            type: 'eventResponse',
                            method: 'email',
                        },
                    ],
                },
                primary: true,
                conferenceProperties: {
                    allowedConferenceSolutionTypes: ['hangoutsMeet'],
                },
            },
            {
                kind: 'calendar#calendarListEntry',
                etag: '"1693762597688000"',
                id: '94409cee99db50b9671fe4c869e63b134c1c6183076ea18c21f5ea1df92af799@group.calendar.google.com',
                summary: 'Familia',
                timeZone: 'Europe/Bucharest',
                colorId: '9',
                backgroundColor: '#7bd148',
                foregroundColor: '#000000',
                selected: true,
                accessRole: 'owner',
                defaultReminders: [],
                conferenceProperties: {
                    allowedConferenceSolutionTypes: ['hangoutsMeet'],
                },
            },
            {
                kind: 'calendar#calendarListEntry',
                etag: '"1694890223934000"',
                id: 'bac0391cf04fa8b257b66687a7d0025cdacfba163e2efa2ed6789ba489c8284f@group.calendar.google.com',
                summary: 'Engleza X si Y Z',
                timeZone: 'Europe/Bucharest',
                colorId: '16',
                backgroundColor: '#4986e7',
                foregroundColor: '#000000',
                selected: true,
                accessRole: 'owner',
                defaultReminders: [],
                conferenceProperties: {
                    allowedConferenceSolutionTypes: ['hangoutsMeet'],
                },
            },
            {
                kind: 'calendar#calendarListEntry',
                etag: '"1694942347515000"',
                id: 'en.romanian#holiday@group.v.calendar.google.com',
                summary: 'Holidays in Romania',
                description: 'Holidays and Observances in Romania',
                timeZone: 'Europe/Bucharest',
                colorId: '8',
                backgroundColor: '#16a765',
                foregroundColor: '#000000',
                selected: true,
                accessRole: 'reader',
                defaultReminders: [],
                conferenceProperties: {
                    allowedConferenceSolutionTypes: ['hangoutsMeet'],
                },
            },
            {
                kind: 'calendar#calendarListEntry',
                etag: '"1694978372677000"',
                id: 'hello.world@gmail.com',
                summary: 'hello.world@gmail.com',
                timeZone: 'Europe/Bucharest',
                colorId: '24',
                backgroundColor: '#a47ae2',
                foregroundColor: '#000000',
                selected: true,
                accessRole: 'reader',
                defaultReminders: [],
                conferenceProperties: {
                    allowedConferenceSolutionTypes: ['hangoutsMeet'],
                },
            },
        ],
    },
    events: {
        kind: 'calendar#events',
        etag: '"p32ob9r4dsqno20o"',
        summary: 'Foo Bar',
        description: '',
        updated: '2023-09-16T18:50:23.934Z',
        timeZone: 'Europe/Bucharest',
        accessRole: 'owner',
        defaultReminders: [
            {
                method: 'popup',
                minutes: 30,
            },
        ],
        nextPageToken: 'EjYKKzd2NDI4M24yb3UzNTAyYWdzcDN0NnJlN3BpXzIwMjYxMDE4VDA1MzAwMFoYgOSHoJPDlwMiBwgFEIKo6jc=',
        items: [
            {
                kind: 'calendar#event',
                etag: '"3389707752592000"',
                id: '52uj3nelsca3bgar5ii0ua2vgn',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=NTJ1ajNuZWxzY2EzYmdhcjVpaTB1YTJ2Z24gYXVyZWxhaW5AbQ',
                created: '2023-09-16T08:44:21.000Z',
                updated: '2023-09-16T08:44:36.296Z',
                summary: 'Cabluri ethernet 6',
                creator: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                start: {
                    date: '2023-09-23',
                },
                end: {
                    date: '2023-09-24',
                },
                transparency: 'transparent',
                iCalUID: '52uj3nelsca3bg1ar5ii0ua2vgn@google.com',
                sequence: 1,
                reminders: {
                    useDefault: false,
                },
                eventType: 'default',
            },
            {
                kind: 'calendar#event',
                etag: '"3389707785318000"',
                id: '74sj6o9m70pj0b9kc4s36b9k6go4m8b9pcli6ab9g6tgjcopo75hjep1kcc',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=NzRzajZvOW03MHBqMGI5a2M0czM2YjlrNmdvbThiOXBjbGk2YWI5ZzZ0Z2pjb3BvNzVoamVwMWtjYyBhdXJlbGFpbkBt',
                created: '2023-09-09T17:45:41.000Z',
                updated: '2023-09-16T08:44:52.659Z',
                summary: 'Storage Mini Foo',
                creator: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                start: {
                    date: '2023-09-23',
                },
                end: {
                    date: '2023-09-24',
                },
                transparency: 'transparent',
                iCalUID: '74sj6o9m70pj0b9kc4s336b9k6gom8b9pcli6ab9g6tgjcopo75hjep1kcc@google.com',
                sequence: 1,
                reminders: {
                    useDefault: false,
                },
                eventType: 'default',
            },
            {
                kind: 'calendar#event',
                etag: '"3389720392608000"',
                id: 'c8o3ec1gc9hm2b9jcoo68b9k6dgm2b9o71h64b9o70s30pb16gpjee9mcc',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=YzhvM2VjMWdjOWhtMmI5amNvbzY4YjlrNmRnbTJiOW83MWg2NGI5bzcwczMwcGIxNmdwamVlOW1jYyBhdXJlbGFpbkBt',
                created: '2023-09-16T10:29:56.000Z',
                updated: '2023-09-16T10:29:56.304Z',
                summary: 'Spray urs/caine',
                creator: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                start: {
                    date: '2023-09-24',
                },
                end: {
                    date: '2023-09-25',
                },
                transparency: 'transparent',
                iCalUID: 'c8o3ec1gc9hm22b9jcoo68b9k6dgm2b9o71h64b9o70s30pb16gpjee9mcc@google.com',
                sequence: 0,
                reminders: {
                    useDefault: false,
                },
                eventType: 'default',
            },
            {
                kind: 'calendar#event',
                etag: '"3165467731352000"',
                id: '7v4283n2ou3502agsp3t6re7pi_20231018T053000Z',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=N3Y0MjgzbjJvdTM1MDJhZ3NwM3Q2cmU3cGlfMjAyMzEwMThUMDUzMDAwWiBhdXJlbGFpbkBt',
                created: '2020-02-26T16:17:45.000Z',
                updated: '2020-02-26T16:17:45.718Z',
                summary: 'Ziua Foo Event',
                creator: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                start: {
                    dateTime: '2023-10-18T08:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                end: {
                    dateTime: '2023-10-18T09:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                recurringEventId: '7v4283n2ou3502agsp3t6re7pi',
                originalStartTime: {
                    dateTime: '2023-10-18T08:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                iCalUID: '7v4283n2ou3502ag1p3t6re7pi@google.com',
                sequence: 0,
                reminders: {
                    useDefault: false,
                    overrides: [
                        {
                            method: 'email',
                            minutes: 10,
                        },
                    ],
                },
                eventType: 'default',
            },
            {
                kind: 'calendar#event',
                etag: '"2876052940457000"',
                id: '627u09v22a8381m7itejqtkmuk_20240727T110000Z',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=NjI3dTA5djIyYTgzODFtN2l0ZWpxdGttdWtfMjAyNDA3MjdUMTEwMDAwWiBhdXJlbGFpbkBt',
                created: '2015-07-20T17:35:26.000Z',
                updated: '2015-07-27T19:47:50.271Z',
                summary: "Foo's birthday 😃🎀🌹🌊💝🎁",
                creator: {
                    email: 'foo@gmail.com',
                    displayName: 'Aurelian Jurcoane',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    displayName: 'Aurelian Jurcoane',
                    self: true,
                },
                start: {
                    dateTime: '2024-07-27T14:00:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                end: {
                    dateTime: '2024-07-27T15:00:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                recurringEventId: '627u09v22a8381m7itejqtkmuk',
                originalStartTime: {
                    dateTime: '2024-07-27T14:00:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                iCalUID: '627u09v22a83811m7itejqtkmuk@google.com',
                sequence: 1,
                reminders: {
                    useDefault: false,
                },
                eventType: 'default',
            },
            {
                kind: 'calendar#event',
                etag: '"3165467731352000"',
                id: '7v4283n2ou3502agsp3t6re7pi_20241018T053000Z',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=N3Y0MjgzbjJvdTM1MDJhZ3NwM3Q2cmU3cGlfMjAyNDEwMThUMDUzMDAwWiBhdXJlbGFpbkBt',
                created: '2020-02-26T16:17:45.000Z',
                updated: '2020-02-26T16:17:45.718Z',
                summary: 'Ziua Foo Event',
                creator: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                start: {
                    dateTime: '2024-10-18T08:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                end: {
                    dateTime: '2024-10-18T09:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                recurringEventId: '7v4283n2ou3502agsp3t6re7pi',
                originalStartTime: {
                    dateTime: '2024-10-18T08:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                iCalUID: '7v4283n2ou13502agsp3t6re7pi@google.com',
                sequence: 0,
                reminders: {
                    useDefault: false,
                    overrides: [
                        {
                            method: 'email',
                            minutes: 10,
                        },
                    ],
                },
                eventType: 'default',
            },
            {
                kind: 'calendar#event',
                etag: '"2876052940457000"',
                id: '627u09v22a8381m7itejqtkmuk_20250727T110000Z',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=NjI3dTA5djIyYTgzODFtN2l0ZWpxdGttdWtfMjAyNTA3MjdUMTEwMDAwWiBhdXJlbGFpbkBt',
                created: '2015-07-20T17:35:26.000Z',
                updated: '2015-07-27T19:47:50.271Z',
                summary: "Foo's birthday 😃🎀🌹🌊💝🎁",
                creator: {
                    email: 'foo@gmail.com',
                    displayName: 'Aurelian Jurcoane',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    displayName: 'Aurelian Jurcoane',
                    self: true,
                },
                start: {
                    dateTime: '2025-07-27T14:00:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                end: {
                    dateTime: '2025-07-27T15:00:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                recurringEventId: '627u09v22a8381m7itejqtkmuk',
                originalStartTime: {
                    dateTime: '2025-07-27T14:00:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                iCalUID: '627u09v221a8381m7itejqtkmuk@google.com',
                sequence: 1,
                reminders: {
                    useDefault: false,
                },
                eventType: 'default',
            },
            {
                kind: 'calendar#event',
                etag: '"3165467731352000"',
                id: '7v4283n2ou3502agsp3t6re7pi_20251018T053000Z',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=N3Y0MjgzbjJvdTM1MDJhZ3NwM3Q2cmU3cGlfMjAyNTEwMThUMDUzMDAwWiBhdXJlbGFpbkBt',
                created: '2020-02-26T16:17:45.000Z',
                updated: '2020-02-26T16:17:45.718Z',
                summary: 'Ziua Foo Event',
                creator: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                start: {
                    dateTime: '2025-10-18T08:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                end: {
                    dateTime: '2025-10-18T09:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                recurringEventId: '7v4283n2ou3502agsp3t6re7pi',
                originalStartTime: {
                    dateTime: '2025-10-18T08:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                iCalUID: '7v4283n21ou3502agsp3t6re7pi@google.com',
                sequence: 0,
                reminders: {
                    useDefault: false,
                    overrides: [
                        {
                            method: 'email',
                            minutes: 10,
                        },
                    ],
                },
                eventType: 'default',
            },
            {
                kind: 'calendar#event',
                etag: '"2876052940457000"',
                id: '627u09v22a8381m7itejqtkmuk_20260727T110000Z',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=NjI3dTA5djIyYTgzODFtN2l0ZWpxdGttdWtfMjAyNjA3MjdUMTEwMDAwWiBhdXJlbGFpbkBt',
                created: '2015-07-20T17:35:26.000Z',
                updated: '2015-07-27T19:47:50.271Z',
                summary: "Foo's birthday 😃🎀🌹🌊💝🎁",
                creator: {
                    email: 'foo@gmail.com',
                    displayName: 'Aurelian Jurcoane',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    displayName: 'Aurelian Jurcoane',
                    self: true,
                },
                start: {
                    dateTime: '2026-07-27T14:00:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                end: {
                    dateTime: '2026-07-27T15:00:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                recurringEventId: '627u09v22a8381m7itejqtkmuk',
                originalStartTime: {
                    dateTime: '2026-07-27T14:00:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                iCalUID: '627u039v22a8381m7itejqtkmuk@google.com',
                sequence: 1,
                reminders: {
                    useDefault: false,
                },
                eventType: 'default',
            },
            {
                kind: 'calendar#event',
                etag: '"3165467731352000"',
                id: '7v4283n2ou3502agsp3t6re7pi_20261018T053000Z',
                status: 'confirmed',
                htmlLink:
                    'https://www.google.com/calendar/event?eid=N3Y0MjgzbjJvdTM1MDJhZ3NwM3Q2cmU3cGlfMjAyNjEwMThUMDUzMDAwWiBhdXJlbGFpbkBt',
                created: '2020-02-26T16:17:45.000Z',
                updated: '2020-02-26T16:17:45.718Z',
                summary: 'Ziua Foo Event',
                creator: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                organizer: {
                    email: 'foo@gmail.com',
                    self: true,
                },
                start: {
                    dateTime: '2026-10-18T08:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                end: {
                    dateTime: '2026-10-18T09:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                recurringEventId: '7v4283n2ou3502agsp3t6re7pi',
                originalStartTime: {
                    dateTime: '2026-10-18T08:30:00+03:00',
                    timeZone: 'Europe/Bucharest',
                },
                iCalUID: '7v4282n2ou3502agsp3t6re7pi@google.com',
                sequence: 0,
                reminders: {
                    useDefault: false,
                    overrides: [
                        {
                            method: 'email',
                            minutes: 10,
                        },
                    ],
                },
                eventType: 'default',
            },
        ],
    },
};
