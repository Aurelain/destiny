import EventsSchema from './EventsSchema.js';

export default {
    $id: 'CalendarEventsSchema',
    type: 'object',
    properties: {
        items: EventsSchema,
    },
    required: ['items'],
};
