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
            const expectedCommand = 'INSERT';
            const payload = {
                name: 'sohil',
                email: 'sohilpandya@me.com',
                institution: 'UCL',
                department: 'Physics',
                accountType: 'group admin',
                paid: true,
                code: 'verysecretcode'
            };

            saveClient(pool, payload, (error, response) => {
                if (error) {
                    console.error(error);
                }
                t.equal(error, expectedError, 'error is null, module is saved to db correctly.');
                t.deepEqual(response.command, expectedCommand, 'Correct command of INSERT, module is saved to db correctly');
                email.restore();
            });
        });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
