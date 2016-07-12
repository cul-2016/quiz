import test from 'tape';
import { testClient } from '../utils/init';
import { users } from '../utils/database-fixtures';

test('database works', (t) => {

    t.plan(2);
    testClient.connect( (error, client, done) => {
        if (error) {
            console.error(error);
        }
        client.query('SELECT * from users WHERE user_id = 1', (error, response) => {
            if (error) {
                console.error(error, 'from client query');
            }
            t.equal(response.rowCount, 1, 'Query matches one row');
            t.deepEqual(response.rows[0], users[0], 'Correct user retrieved');
            // testClient.end();
            done();

        });
    });
});
