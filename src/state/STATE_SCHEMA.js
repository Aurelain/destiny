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
                    status: {
                        enum: ['confirmed', 'tentative', 'cancelled'],
                        default: 'confirmed',
                    },
                },
                required: ['id', 'calendarId', 'summary', 'start', 'end', 'status'],
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
                showDone: {
                    type: 'boolean',
                    default: false,
                },
            },
            required: ['hiddenCalendars', 'showDone'],
        },
    },
    required: ['tokens', 'calendars', 'events', 'options'],
};
