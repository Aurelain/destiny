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
                    default: 'foo@bar',
                },
            },
            required: ['email'],
        },
        calendars: {
            type: 'array',
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
                },
                required: ['id', 'summary', 'backgroundColor'],
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
        options: {
            type: 'object',
            additionalProperties: false,
            properties: {
                hiddenCalendars: {
                    type: 'object',
                    patternProperties: {
                        '.': {
                            const: true,
                        },
                    },
                },
            },
            required: ['hiddenCalendars'],
        },
    },
    required: ['user', 'calendars', 'events', 'options'],
};
