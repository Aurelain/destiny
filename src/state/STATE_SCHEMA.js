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
                    timeZone: {
                        type: 'string',
                    },
                    isReadOnly: {
                        type: 'boolean',
                    },
                    selected: {
                        type: 'boolean',
                    },
                    primary: {
                        type: 'boolean',
                    },
                },
                required: ['id', 'summary', 'backgroundColor', 'timeZone', 'isReadOnly', 'selected', 'primary'],
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
                    isLocked: {
                        type: 'boolean',
                    },
                    reminders: {
                        // optional
                        type: 'object',
                        additionalProperties: false,
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
                        // optional
                        type: 'string',
                    },
                    recurrence: {
                        // optional
                        type: 'string',
                    },
                },
                required: ['id', 'calendarId', 'summary', 'start', 'end', 'status', 'isLocked'],
            },
        },
        options: {
            type: 'object',
            additionalProperties: false,
            properties: {
                expandedEvents: {
                    type: 'object',
                    patternProperties: {
                        '.': {
                            const: true,
                        },
                    },
                },
                forcedDone: {
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
            required: ['expandedEvents', 'forcedDone', 'showDone'],
        },
        volatile: {
            type: 'object',
            additionalProperties: false,
        },
    },
    required: ['tokens', 'calendars', 'events', 'options', 'volatile'],
};
