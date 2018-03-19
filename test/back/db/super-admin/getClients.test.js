const test = require('tape');
const getClients = require('../../../../server/lib/super-admin/getClients');
const pool = require('../../../utils/dbClient.js');
const redisCli = require('../../../utils/configureRedis.js');
const initDb = require('../../../utils/initDb.js')(pool, redisCli);

test('`getClients` gets list of all the clients in the application', (t) => {

    t.plan(1);

    initDb()
        .then(() => {
            const expectedRows = [{ account_management_id: 1, name: 'jsalmon', email: 'jessica@city.ac.uk', institution: 'FAC', department: 'Ten', account_type: 'group admin', paid: true, user_limit: 100, group_code: 'xyz' }, { account_management_id: 2, name: 'spandya', email: 'sohil@caf.ac.uk', institution: '', department: '', account_type: 'individual lecturer', paid: false, user_limit: null, group_code: 'abc' }, { account_management_id: 3, name: 'individualpaidlecturer', email: 'individualpaidlecturer@city.ac.uk', institution: '', department: '', account_type: 'individual lecturer', paid: true, user_limit: null, group_code: null }, { account_management_id: 4, name: 'individualunpaidlecturer', email: 'individualunpaidlecturer@city.ac.uk', institution: '', department: '', account_type: 'individual lecturer', paid: false, user_limit: null, group_code: null }, { account_management_id: 5, name: 'groupadmin', email: 'groupadmin@city.ac.uk', institution: '', department: '', account_type: 'group admin', paid: true, user_limit: 1000, group_code: 'groupadminsecretcode' }, { account_management_id: 6, name: 'groupadminnotpaid', email: 'groupadminnotpaid@city.ac.uk', institution: '', department: '', account_type: 'group admin', paid: true, user_limit: 1000, group_code: 'notpaidsecretcode' }, { account_management_id: 7, name: 'userlimitreached', email: 'userlimitreached@city.ac.uk', institution: 'UCL', department: 'SSEES', account_type: 'group admin', paid: false, user_limit: 1, group_code: 'limitreached' }]
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
