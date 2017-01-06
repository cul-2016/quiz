const test = require('tape');
const server = require('../../../server/server.js');

test(' / endpoint works!', (t) => {
    if (!process.env.TESTING) {
        throw new Error("Please set the testing environment variables!");
    }

    t.plan(1);

    const options = {
        method: 'GET',
        url: '/'
    };

    server.inject(options, (response) => {

        t.ok(response.payload.indexOf('<title>Quiz App</title>') > -1, "index page loads correctly!");
    });
});
