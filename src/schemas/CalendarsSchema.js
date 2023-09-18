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
                    foregroundColor: {
                        type: 'string',
                        pattern: '#[0-9a-f]{6}',
                    },
                },
            },
        },
    },
    required: ['items'],
};
