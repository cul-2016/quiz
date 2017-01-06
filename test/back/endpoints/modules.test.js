const test = require('tape');
const server = require('../../../server/server.js');
const simulateAuth = require('../../utils/simulateAuth.js')(server);
const pool = require('../../../server/lib/dbClient.js');
const redisCli = server.app.redisCli;
const initDb = require('../../utils/initDb.js')(pool, redisCli);

const { newModule } = require('../../utils/data-fixtures');
const expectedStudent = require('../../utils/data-fixtures').getModuleForStudentData;
const expectedLecturer = require('../../utils/data-fixtures').getModuleForLecturerData;

test('`add-new-module` endpoint works', (t) => {
    t.plan(1);
    
    const options = {
        method: 'POST',
        url: '/add-new-module?user_id=1',
        payload: newModule
    };

    server.inject(options, (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});

test('`get-module-members` endpoint returns error if module_id is undefined', (t) => {

    t.plan(1);

    server.inject('/get-module-members', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-module-members` endpoint works', (t) => {

    t.plan(1);

    server.inject('/get-module-members?module_id=TEST', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});

test('`get-module` endpoint returns an error if `is_lecturer` is undefined', (t) => {

    t.plan(1);

    server.inject('/get-module?module_id=TEST', (response) => {

        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-module` endpoint works for a lecturer', (t) => {

    t.plan(2);

    server.inject('/get-module?module_id=TEST&is_lecturer=true', (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(response.result, expectedLecturer);
    });
});

test('`get-module` endpoint works for a student', (t) => {

    t.plan(2);

    server.inject('/get-module?module_id=TEST&is_lecturer=false&user_id=1', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(response.result, expectedStudent);
    });
});

test('`get-module-list` endpoint returns error if is_lecturer is undefined', (t) => {

    t.plan(1);

    server.inject('/get-module-list?user_id=1', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-module-list` endpoint works for a lecturer', (t) => {

    t.plan(1);

    server.inject('/get-module-list?user_id=2&is_lecturer=true', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});

test('`get-module-list` endpoint works for a student', (t) => {

    t.plan(1);

    server.inject('/get-module-list?user_id=1&is_lecturer=false', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});

test('`remove-module-member` endpoint returns error if module_id is undefined', (t) => {

    t.plan(1);

    server.inject('/remove-module-member?user_id=1', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});


test('`remove-module-member` endpoint returns error if user_id is undefined', (t) => {

    t.plan(1);

    server.inject('/remove-module-member?module_id=TEST', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});


test('`remove-module-member` endpoint works', (t) => {

    t.plan(1);

    server.inject('/remove-module-member?module_id=TEST&user_id=2', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});

test('`validate-module` endpoint works', (t) => {

    t.plan(2);

    server.inject('/validate-module?module_id=TEST', (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});

test('`join-module` endpoint returns error if user_id is undefined', (t) => {

    t.plan(1);

    server.inject('/join-module?module_id=TEST', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});


test('`join-module` endpoint returns error if module_id is undefined', (t) => {

    t.plan(1);

    server.inject('/join-module?user_id=2', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`join-module` endpoint works', (t) => {

    t.plan(1);

    server.inject('/join-module?module_id=FAC8&user_id=7', (response) => {

        t.equal(response.statusCode, 200, '200 status code');
    });
});

test.onFinish(() => {
    redisCli.quit();
    pool.end();
});
