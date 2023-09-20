export default {
    $id: 'CalendarEventsSchema',
    type: 'object',
    properties: {
        items: {
            type: 'array',
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
                },
                required: ['id', 'summary', 'start', 'end'],
            },
        },
    },
    required: ['items'],
};
