const test = require('tape');
const deleteUser = require('../../../server/lib/deleteUser');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`deleteUser` works', (t) => {

    t.plan(4);

    initDb()
    .then(() => {
        const expectedError = null;
        const expectedCommand = 'UPDATE';
        const user_id = 2;

        deleteUser(pool, user_id, (error, response) => {
            t.equal(error, expectedError, 'error is null, user details are altered correctly');
            t.deepEqual(response.command, expectedCommand, 'Correct command of UPDATE, user details are updated');

            pool.connect((error, client, done) => {
                if (error) {
                    console.error(error);
                }
                client.query("SELECT * from users WHERE user_id=2", (error, response) => {

                    if (error) throw new Error(error);

                    t.ok(response.rows[0].email !== `lecturer@city.ac.uk`, 'email has been hashed');
                    t.ok(response.rows[0].username.includes('Anon'), 'username has been randomised');
                    done();
                });
            });
        });
    });
});
