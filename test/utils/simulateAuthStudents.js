const simulateAuthStudents = (server) => () => {

    return new Promise((resolve) => {
        const options = {
            url: '/authenticate-user',
            method: 'POST',
            payload: {
                email: 'student@city.ac.uk',
                password: 'testingstudent',
            }
        };
        server.inject(options, (response) => {
            resolve(response.headers.authorization);
        });
    });
};

module.exports = simulateAuthStudents;
