const test = require('tape');
const hasStudentSubmitted = require('../../../server/lib/hasStudentSubmitted');
const { testClient } = require('../../utils/init');

test("`hasStudentSubmitted` works", (t) => {

    t.plan(2);

    const user_id = 1;
    const good_module_id = 'TEST';
    const bad_module_id = 'CENT';


    hasStudentSubmitted(testClient, user_id, good_module_id, (error, hasSubmittedBefore) => {

        if (error) {
            console.error(error);
        }
        t.equal(hasSubmittedBefore, true, 'student has participated in quizzes before');
    });

    hasStudentSubmitted(testClient, user_id, bad_module_id, (error, hasSubmittedBefore) => {

        if (error) {
            console.error(error);
        }
        t.equal(hasSubmittedBefore, false, 'student has not participated in quizzes before');
    });
});
