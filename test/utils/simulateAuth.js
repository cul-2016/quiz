const simulateAuth = (server) => (email) => {

    return new Promise((resolve) => {
        const options = {
            url: '/authenticate-user',
            method: 'POST',
            payload: {
                email: email,
                password: 'testinglecturer',
            }
        };
        server.inject(options, (response) => {
            resolve(response.headers.authorization);
        });
    });
};

module.exports = simulateAuth;
