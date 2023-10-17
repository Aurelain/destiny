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
                    selected: {
                        type: 'boolean',
                    },
                },
                required: ['id', 'summary', 'backgroundColor', 'selected'],
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
                    reminder: {
                        type: 'boolean',
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
                required: ['id', 'calendarId', 'summary', 'start', 'end', 'status', 'reminder'],
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
                showDone: {
                    type: 'boolean',
                    default: false,
                },
                preferredCalendar: {
                    type: 'string',
                },
            },
            required: ['expandedEvents', 'showDone', 'preferredCalendar'],
        },
        shopping: {
            type: 'object',
            additionalProperties: false,
            properties: {
                calendarId: {
                    type: 'string',
                },
                eventId: {
                    type: 'string',
                },
                title: {
                    type: 'string',
                },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            text: {
                                type: 'string',
                            },
                            isSelected: {
                                type: 'boolean',
                            },
                        },
                        required: ['text', 'isSelected'],
                    },
                },
            },
            required: ['calendarId', 'eventId', 'title', 'items'],
        },
    },
    required: ['tokens', 'calendars', 'events', 'options'],
};
