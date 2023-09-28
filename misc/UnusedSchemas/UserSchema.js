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

/*
{
    "sub": "110705000008710112523",
    "picture": "https://lh3.googleusercontent.com/a/default-user\u003ds96-c",
    "email": "foo@gmail.com",
    "email_verified": true
}
 */
