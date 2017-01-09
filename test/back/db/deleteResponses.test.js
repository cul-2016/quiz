const test = require('tape');
const deleteResponses = require('../../../server/lib/deleteResponses');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`deleteResponses` works', (t) => {

    t.plan(3);

    initDb()
    .then(() => {
        const expectedError = null;
        const expectedCommand = 'DELETE';
        const quiz_id = 8;

        deleteResponses(pool, quiz_id, (error, response) => {

            t.equal(error, expectedError, 'error is null, responses are deleted from the db correctly.');
            t.deepEqual(response.command, expectedCommand, 'Correct command of DELETE, responses are deleted from responses table');

            pool.connect((error, client, done) => {
                if (error) {
                    console.error(error);
                }
                client.query("SELECT * from responses WHERE quiz_id=8", (error, response) => {

                    if (error) throw new Error(error);
                    t.deepEqual(0, response.rows.length);
                    done();
                });
            });
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});

