export default {
    $id: 'StoreSchema',
    type: 'object',
    additionalProperties: false,
    properties: {
        user: {
            type: 'object',
            additionalProperties: false,
            properties: {
                email: {
                    type: 'string',
                    minLength: 1,
                },
            },
            required: ['email'],
        },
        calendars: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                additionalProperties: false,
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
                    foregroundColor: {
                        type: 'string',
                        pattern: '#[0-9a-f]{6}',
                    },
                },
                required: ['id', 'summary', 'backgroundColor', 'foregroundColor'],
            },
        },
        events: {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    id: {
                        type: 'string',
                        minLength: 1,
                    },
                    calendarId: {
                        type: 'string',
                        minLength: 1,
                    },
                    summary: {
                        type: 'string',
                        minLength: 1,
                    },
                    start: {
                        type: 'string',
                        pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}',
                    },
                    end: {
                        type: 'string',
                        pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}',
                    },
                },
                required: ['id', 'calendarId', 'summary', 'start', 'end'],
            },
        },
    },
    required: ['user', 'calendars', 'events'],
};
