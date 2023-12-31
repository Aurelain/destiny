import cloneShallow from '../utils/cloneShallow.js';
import EventSchema from './EventSchema.js';

export default {
    $id: 'EventsSchema',
    type: 'object',
    properties: {
        items: {
            type: 'array',
            items: cloneShallow(EventSchema, '$id'),
        },
    },
    required: ['items'],
};

/*
{
    "kind": "calendar#events",
    "etag": "\"p324dvlsiras820o\"",
    "summary": "Foo Bar",
    "description": "",
    "updated": "2023-09-20T07:50:50.501Z",
    "timeZone": "Europe/Bucharest",
    "accessRole": "owner",
    "defaultReminders": [
        {
            "method": "popup",
            "minutes": 30
        }
    ],
    "items": [
        {
            "kind": "calendar#event",
            "etag": "\"3390227144158000\"",
            "id": "04dv5dlnscmhqd2dqr7mtsg59j",
            "status": "cancelled",
            "htmlLink": "https://www.google.com/calendar/event?eid=MDRkdjVkbG5zY21ocWQyZHFyN210c2c1OWogYXVyZWxhaW5AbQ",
            "created": "2023-09-19T08:52:38.000Z",
            "updated": "2023-09-19T08:52:52.079Z",
            "summary": "test",
            "creator": {
                "email": "foo@gmail.com",
                "self": true
            },
            "organizer": {
                "email": "foo@gmail.com",
                "self": true
            },
            "start": {
                "date": "2023-09-19"
            },
            "end": {
                "date": "2023-09-20"
            },
            "transparency": "transparent",
            "iCalUID": "04dv5dlnscmhqd2dqr7mtsg59j@google.com",
            "sequence": 1,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3390392311856000\"",
            "id": "coqmad1o6crm4b9j71h34b9k6cq30bb26ph34b9i6oq34p346kq3ip1kck",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=Y29xbWFkMW82Y3...NGI5aTZvcTM0cDM0NmyBhdXJlbGFpbkBt",
            "created": "2023-09-19T09:53:31.000Z",
            "updated": "2023-09-20T07:49:15.928Z",
            "summary": "Emag: dezumidificatoare, termometre",
            "creator": {
                "email": "foo@gmail.com",
                "self": true
            },
            "organizer": {
                "email": "foo@gmail.com",
                "self": true
            },
            "start": {
                "date": "2023-09-20"
            },
            "end": {
                "date": "2023-09-21"
            },
            "transparency": "transparent",
            "iCalUID": "coqmad1o6crm4b9j71h34b9k6cq30bb26ph34b9i6oq34p346kq3ip1kck@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3389707752592000\"",
            "id": "52uj3nelsca3bgar5ii0ua2vgn",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=NTJ1ajNuZWxzY2EzYmdhcjVpaTB1YTJ2Z24gYXVyZWxhaW5AbQ",
            "created": "2023-09-16T08:44:21.000Z",
            "updated": "2023-09-16T08:44:36.296Z",
            "summary": "Cabluri ethernet 6",
            "creator": {
                "email": "foo@gmail.com",
                "self": true
            },
            "organizer": {
                "email": "foo@gmail.com",
                "self": true
            },
            "start": {
                "date": "2023-09-23"
            },
            "end": {
                "date": "2023-09-24"
            },
            "transparency": "transparent",
            "iCalUID": "52uj3nelsca3bgar5ii0ua2vgn@google.com",
            "sequence": 1,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3389707785318000\"",
            "id": "74sj6o9m70pj0b9kc4s36b9k6gom8b9pcli6ab9g6tgjcopo75hjep1kcc",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=NzRzajZ....bGk2YWI5ZzZ0Z2pjb3BvNzVoBhdXJlbGFpbkBt",
            "created": "2023-09-09T17:45:41.000Z",
            "updated": "2023-09-16T08:44:52.659Z",
            "summary": "Storage Foo",
            "creator": {
                "email": "foo@gmail.com",
                "self": true
            },
            "organizer": {
                "email": "foo@gmail.com",
                "self": true
            },
            "start": {
                "date": "2023-09-23"
            },
            "end": {
                "date": "2023-09-24"
            },
            "transparency": "transparent",
            "iCalUID": "74sj6o9m70pj0b9kc4s36b9k6gom8b9pcli6ab9g6tgjcopo75hjep1kcc@google.com",
            "sequence": 1,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3389720392608000\"",
            "id": "c8o3ec1gc9hm2b9jcoo68b9k6dgm2b9o71h64b9o70s30pb16gpjee9mcc",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=YzhvM..bzcwczMwcGIxNmdwamVlOW1jYyBhdXJlbGFpbkBt",
            "created": "2023-09-16T10:29:56.000Z",
            "updated": "2023-09-16T10:29:56.304Z",
            "summary": "Spray urs/caine",
            "creator": {
                "email": "foo@gmail.com",
                "self": true
            },
            "organizer": {
                "email": "foo@gmail.com",
                "self": true
            },
            "start": {
                "date": "2023-09-24"
            },
            "end": {
                "date": "2023-09-25"
            },
            "transparency": "transparent",
            "iCalUID": "c8o3ec1gc9hm2b9jcoo68b9k6dgm2b9o71h64b9o70s30pb16gpjee9mcc@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3390129774072000\"",
            "id": "cgqm8e36c9j30bb564s3eb9k6pgj4bb174sm8b9h74o6ce9ncdim6c3260",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=Y2dxbT...MCBhdXJlbGFpbkBt",
            "created": "2023-09-18T19:21:27.000Z",
            "updated": "2023-09-18T19:21:27.036Z",
            "summary": "Imprimantă",
            "creator": {
                "email": "foo@gmail.com",
                "self": true
            },
            "organizer": {
                "email": "foo@gmail.com",
                "self": true
            },
            "start": {
                "date": "2023-09-25"
            },
            "end": {
                "date": "2023-09-26"
            },
            "transparency": "transparent",
            "iCalUID": "cgqm8e36c9j30bb564s3eb9k6pgj4bb174sm8b9h74o6ce9ncdim6c3260@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false
            },
            "eventType": "default"
        },
        {
            "kind": "calendar#event",
            "etag": "\"3165467731352000\"",
            "id": "7v4283n0000002agsp3t6re7pi_20231018T053000Z",
            "status": "confirmed",
            "htmlLink": "https://www.google.com/calendar/event?eid=N3Y0Mjg...lbGFpbkBt",
            "created": "2020-02-26T16:17:45.000Z",
            "updated": "2020-02-26T16:17:45.718Z",
            "summary": "Ziua Foo Event",
            "creator": {
                "email": "foo@gmail.com",
                "self": true
            },
            "organizer": {
                "email": "foo@gmail.com",
                "self": true
            },
            "start": {
                "dateTime": "2023-10-18T08:30:00+03:00",
                "timeZone": "Europe/Bucharest"
            },
            "end": {
                "dateTime": "2023-10-18T09:30:00+03:00",
                "timeZone": "Europe/Bucharest"
            },
            "recurringEventId": "7v4283n0000002agsp3t6re7pi",
            "originalStartTime": {
                "dateTime": "2023-10-18T08:30:00+03:00",
                "timeZone": "Europe/Bucharest"
            },
            "iCalUID": "7v4283n0000002agsp3t6re7pi@google.com",
            "sequence": 0,
            "reminders": {
                "useDefault": false,
                "overrides": [
                    {
                        "method": "email",
                        "minutes": 10
                    }
                ]
            },
            "eventType": "default"
        }
    ]
}
 */
