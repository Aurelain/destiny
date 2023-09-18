export default {
    $id: 'UserSchema',
    type: 'object',
    properties: {
        email: {
            type: 'string',
            minLength: 1,
        },
    },
    required: ['email'],
};
