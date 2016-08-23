import test from 'tape';
import { server } from '../../utils/init';
import { getModuleForLecturerData as expectedLecturer,
         getModuleForStudentData as expectedStudent } from '../../utils/data-fixtures';


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

    server.inject('/get-module?module_id=TEST&is_lecturer=false&user_id=1', (response) => {

        const data = response.result;
        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(data, expectedStudent);
    });
});
