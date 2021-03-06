const test = require('tape');
const validateGroupLecturerByCode = require('../../../server/lib/validateGroupLecturerByCode');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test('`validateGroupLecturerByCode` get validates the code and also returns the total number of users already using that code', (t) => {

    t.plan(1);

    initDb()
        .then(() => {
            const group_code = 'groupadminsecretcode';
            const expectedRows = {
                accountDetails: [{ user_limit: 1000, group_code: 'groupadminsecretcode', paid: true, email: 'groupadmin@city.ac.uk' }],
                actualUserCountWithCode: { count: 3 }
            };

            validateGroupLecturerByCode(pool, group_code, (error, response) => {

                if (error) {
                    console.error(error);
                }
                t.deepEquals(response, expectedRows, 'correct number of students for the quiz');
            });

        });
});
