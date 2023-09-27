export default {
    $id: 'STATE_SCHEMA',
    type: 'object',
    additionalProperties: false,
    properties: {
        tokens: {
            type: 'object',
            additionalProperties: false,
            properties: {
                accessToken: {
                    type: 'string',
                },
                refreshToken: {
                    type: 'string',
                },
                expirationTimestamp: {
                    type: 'number',
                },
            },
            required: ['accessToken', 'refreshToken', 'expirationTimestamp'],
        },
        user: {
            type: 'object',
            additionalProperties: false,
            properties: {
                email: {
                    type: 'string',
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
                    },
                    summary: {
                        type: 'string',
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
                    },
                    calendarId: {
                        type: 'string',
                    },
                    summary: {
                        type: 'string',
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
    required: ['tokens', 'user', 'calendars', 'events', 'options'],
};
