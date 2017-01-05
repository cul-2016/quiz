const test = require('tape');
const verifyCode = require('../../../server/lib/verifyCode');
const query = require('../../../server/lib/query');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test(' `verifyCode` returns true if the user code matches the one in the database', (t) => {
    t.plan(2);

    initDb()
    .then(() => {
        const verification_code = 'testing-verification-code';
        const expected = true;

        const queryText = 'SELECT * FROM users WHERE verification_code = $1';
        query(pool, queryText, [verification_code], (error, user) => {

            verifyCode(pool, verification_code, (error, isVerified) => {
                t.deepEqual(isVerified, expected, 'user is verfied');

                const queryText = 'SELECT * FROM users WHERE email = $1';
                const userEmail = [user.rows[0].email];
                query(pool, queryText, userEmail, (error, result) => {
                    if (error) {
                        t.error(error);
                    }
                    const expectedUser = Object.assign({},
                        user.rows[0],
                        { is_verified: true, verification_code: null }
                    );
                    t.deepEqual(result.rows[0], expectedUser, 'verification_code has been deleted');
                });

            });
        });
    });
});

test(' `verifyCode` return false if the user has already been verified (and has a reset password code)', (t) => {
    t.plan(1);

    initDb()
    .then(() => {
        const verification_code = 'reset-verification-code';
        const expected = false;

        verifyCode(pool, verification_code, (error, response) => {
            if (error) {
                t.error(error, 'should not have errored');
            }
            t.deepEqual(response, expected, 'replies with false if user is already verfied');
        });
    });
});

test(' `verifyCode` verification code non-existent', (t) => {
    t.plan(1);

    initDb()
    .then(() => {
        const verification_code = 'xyz2345194128490';
        const expected = false;

        verifyCode(pool, verification_code, (error, response) => {
            if (error) {
                t.error(error, 'should not have errored');
            }
            t.deepEqual(response, expected, 'replies with false if if verification code cannot be associated to any user');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
