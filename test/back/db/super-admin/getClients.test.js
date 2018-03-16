const test = require('tape');
const getClients = require('../../../../server/lib/super-admin/getClients');
const pool = require('../../../utils/dbClient.js');
const redisCli = require('../../../utils/configureRedis.js');
const initDb = require('../../../utils/initDb.js')(pool, redisCli);

test('`getClients` gets list of all the clients in the application', (t) => {

    t.plan(1);

    initDb()
        .then(() => {
            const expectedRows = [{ account_management_id: 1, name: 'jsalmon', email: 'jessica@city.ac.uk', institution: 'FAC', department: 'Ten', account_type: 'group admin', paid: true, code: 'xyz' }, { account_management_id: 2, name: 'spandya', email: 'sohil@caf.ac.uk', institution: '', department: '', account_type: 'individual lecturer', paid: false, code: 'abc' }];

            getClients(pool, (error, response) => {

                if (error) {
                    console.error(error);
                }
                t.deepEquals(response, expectedRows, 'database returns correct row of users');
            });
        });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
