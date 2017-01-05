const simulateAuth = (server) => () => {

    return new Promise((resolve) => {
        const options = {
            url: '/authenticate-user',
            method: 'POST',
            payload: {
                email: 'lecturer@city.ac.uk',
                password: 'testinglecturer',
            }
        };
        server.inject(options, (response) => {
            resolve(response.headers.authorization);
        });
    });
};

module.exports = simulateAuth;
