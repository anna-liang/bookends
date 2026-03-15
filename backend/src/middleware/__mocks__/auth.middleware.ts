export const isUserLoggedIn = jest.fn((req, res, next) => {
    req.user = {
        id: '123',
        displayName: 'Test User',
        name: {
            givenName: 'Test',
            familyName: 'User'
        },
        email: 'test@example.com'
    };

    return next();
});

export default {
    isUserLoggedIn,
};