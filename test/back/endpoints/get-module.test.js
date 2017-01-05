const test = require('tape');
const { server } = require('../../utils/init');
const expectedStudent = require('../../utils/data-fixtures').getModuleForStudentData;
const expectedLecturer = require('../../utils/data-fixtures').getModuleForLecturerData;

test('`get-module` endpoint returns an error if `is_lecturer` is undefined', (t) => {

    t.plan(1);

    server.inject('/get-module?module_id=TEST', (response) => {

        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-module` endpoint works for a lecturer', (t) => {

    t.plan(2);

    server.inject('/get-module?module_id=TEST&is_lecturer=true', (response) => {

        const data = response.result;
        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(data, expectedLecturer);
    });
});

test('`get-module` endpoint works for a student', (t) => {

    t.plan(2);
    const user_id = 1;
    const module_id = 'TEST';
    const is_lecturer = false;

    server.inject(`/get-module?module_id=${module_id}&is_lecturer=${is_lecturer}&user_id=${user_id}`, (response) => {

        const data = response.result;
        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(data, expectedStudent);
    });
});
