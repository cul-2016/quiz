const test = require('tape');
const { server, testClient } = require('../../utils/init');
const { newModule } = require('../../utils/data-fixtures');

test('`add-new-module` endpoint works', (t) => {

    t.plan(1);
    
    const options = {
        method: 'POST',
        url: '/add-new-module?user_id=1',
        payload: newModule
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');

        // TEARDOWN
        testClient.connect((error, client, done) => {
            if (error) {
                console.error(error, 'error from deleting lecturer from the database');
            }
            client.query('DELETE FROM modules WHERE module_id = $1', ['CS50']);
            done();
        });
    });
});
