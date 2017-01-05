import test from 'tape';
import { server, testClient } from '../../utils/init';
import { newModule } from '../../utils/data-fixtures';


test('`add-new-module` endpoint works', (t) => {

    t.plan(2);

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
                t.error('should not have errored');
            } else {
                client.query('DELETE FROM modules WHERE module_id = $1', ['CS50'], err => {
                    if (err) {
                        console.error(err);
                        t.error('should not have errored');
                    } else {
                        t.pass('no error');
                    }
                });
                done();
            }
        });
    });
});
