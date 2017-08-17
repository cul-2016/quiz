const test = require('tape');
const { getFirstQuizState,
         getHighScoreState,
         getOverallScoreState,
         getParticipationState } = require('../../../server/lib/trophy-methods');
const pool = require('../../utils/dbClient.js');
const redisCli = require('../../utils/configureRedis.js');
const initDb = require('../../utils/initDb.js')(pool, redisCli);


test('`getFirstQuizState` awards an eligible student with `first quiz` trophy', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const user_id = 1;
        const quiz_id = 1;

        getFirstQuizState(pool, user_id, quiz_id, (error, result) => {
            t.equal(typeof result, 'boolean', "getFirstQuizState returns a Boolean value");
            t.equal(result, true, 'Trophy awarded');
        });
    });
});

test('`getFirstQuizState` does not award an ineligible student with `first quiz` trophy', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const user_id = 16;
        const quiz_id = 1;

        getFirstQuizState(pool, user_id, quiz_id, (error, result) => {
            t.equal(typeof result, 'boolean', "getFirstQuizState returns a Boolean value");
            t.equal(result, false, 'Trophy not awarded');
        });
    });
});

test('`getHighScoreState` awards an eligible student with `high_score` trophy', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        let module_id = 'TEST';
        let percentageScore = 100;
        let user_id = 1;

        getHighScoreState(pool, user_id, module_id, percentageScore, (error, result) => {

            t.equal(typeof result, 'boolean', "getHighScoreState returns a Boolean value");
            t.equal(result, true, 'Trophy awarded');
        });
    });
});

test('`getHighScoreState` does not overwrite a pre-awarded `high_score` trophy', (t) => {

    t.plan(2);

    initDb()
    .then(() => {

        const module_id = 'TEST';
        const percentageScore = 70;
        const user_id = 1;

        getHighScoreState(pool, user_id, module_id, percentageScore, (error, result) => {
            t.equal(typeof result, 'boolean', "getHighScoreState returns a Boolean value");
            t.equal(result, false, 'Trophy not awarded');
        });
    });
});

test('`getOverallScoreState` awards an eligible student with `overall_score` trophy', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const user_id = 1; // this student's overall score is 67%
        const module_id = 'TEST';

        getOverallScoreState(pool, user_id, module_id, (error, result) => {
            t.equal(typeof result, 'boolean', "getOverallScoreState returns a Boolean value");
            t.equal(result, true, 'Trophy awarded');
        });
    });
});

test('`getOverallScoreState` does not award an ineligible student with `overall_average` trophy', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const user_id = 4; // this student's overall average is 0%
        const module_id = 'TEST';

        getOverallScoreState(pool, user_id, module_id, (error, result) => {
            t.equal(typeof result, 'boolean', "getOverallScoreState returns a Boolean value");
            t.equal(result, false, 'Trophy not awarded');
        });
    });
});

test('`getParticipationState` awards an eligible student with `participation` trophy', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const user_id = 1;
        const module_id = 'TEST';

        getParticipationState(pool, user_id, module_id, (error, result) => {
            t.equal(typeof result, 'boolean', "getParticipationState returns a Boolean value");
            t.equal(result, true, 'Trophy awarded');
        });
    });
});

test('`getParticipationState` does not award an ineligible student with `participation` trophy', (t) => {

    t.plan(2);

    initDb()
    .then(() => {
        const user_id = 4;
        const module_id = 'TEST';

        getParticipationState(pool, user_id, module_id, (error, result) => {
            t.equal(typeof result, 'boolean', "getParticipationState returns a Boolean value");
            t.equal(result, false, 'Trophy not awarded');
        });
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
