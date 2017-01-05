const test = require('tape');
const hasStudentSubmitted = require('../../../server/lib/hasStudentSubmitted');
const pool = require('../../../server/lib/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);

test("`hasStudentSubmitted` works", (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const user_id = 1;
        const good_module_id = 'TEST';
        const bad_module_id = 'CENT';

        hasStudentSubmitted(pool, user_id, good_module_id, (error, hasSubmittedBefore) => {
            if (error) {
                console.error(error);
            }
            t.equal(hasSubmittedBefore, true, 'student has participated in quizzes before');
        });

        hasStudentSubmitted(pool, user_id, bad_module_id, (error, hasSubmittedBefore) => {
            if (error) {
                console.error(error);
            }
            t.equal(hasSubmittedBefore, false, 'student has not participated in quizzes before');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
