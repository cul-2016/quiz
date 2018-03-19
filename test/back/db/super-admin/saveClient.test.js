const test = require('tape');
const saveClient = require('../../../../server/lib/super-admin/saveClient');
const pool = require('../../../utils/dbClient.js');
const redisCli = require('../../../utils/configureRedis.js');
const initDb = require('../../../utils/initDb.js')(pool, redisCli);

const sinon = require('sinon');
const sendemail = require('sendemail');

let email;

test('`saveClient` saved the new client to the account management table', (t) => {

    t.plan(2);

    initDb()
        .then(() => {

            email = sinon.stub(
                sendemail,
                'email',
                (name, person, cb) => cb(null)
            );

            const expectedError = null;
            const payload = {
                name: 'sohil',
                email: 'sohilpandya@me.com',
                institution: 'UCL',
                department: 'Physics',
                accountType: 'group admin',
                paid: true,
                code: 'verysecretcode'
            };
            const expected = [{
                account_management_id: 8,
                name: 'sohil',
                email: 'sohilpandya@me.com',
                institution: 'UCL',
                department: 'Physics',
                account_type: 'group admin',
                paid: true,
                user_limit: null,
                group_code: 'verysecretcode'
            }];

            saveClient(pool, payload, (error, response) => {
                if (error) {
                    console.error(error);
                }
                t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
                t.deepEqual(response, expected, 'correct Data being returned from db');
                email.restore();
            });
        });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
