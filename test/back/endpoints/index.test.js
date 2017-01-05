const test = require('tape');
const { server } = require('../../utils/init');

test(' / endpoint works!', (t) => {

    t.plan(1);

    if (!process.env.TESTING) {
        throw new Error("Please set the testing environment variables!");
    } else {
        const options = {
            method: 'GET',
            url: '/'
        };

        server.inject(options, (response) => {

            t.ok(response.payload.indexOf('<title>Quiz App</title>') > -1, "index page loads correctly!");
        });
    }
});
