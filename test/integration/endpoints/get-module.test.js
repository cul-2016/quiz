import test from 'tape';
import { server } from '../../utils/init';
import { getModuleData as expected } from '../../utils/data-fixtures';


test.skip('`get-module` endpoint works', (t) => {

    // t.plan(18);

    server.inject('/get-module?module_id=TEST', (response) => {

        const data = response.result;

        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(data, expected);
        /*
        ['quizzes', 'medals', 'trophies', 'numEnrolled'].forEach((key) => {
            t.ok(data.hasOwnProperty(key), `The ${key} key exists`);
        });

        t.equal(data.quizzes[0].name, 'Week 1 Quiz');
        t.equal(data.quizzes[0].num_entries, '1');
        t.equal(data.quizzes[0].num_questions, '2');

        t.equal(data.quizzes[1].name, 'Week 2 Quiz');
        t.equal(data.quizzes[1].num_entries, '1');
        t.equal(data.quizzes[1].num_questions, '2');

        t.equal(data.medals.medal_name[0], 'bronze', 'Bronze medal appears at index 0');
        t.equal(data.medals.medal_name[1], 'silver', 'Silver medal appears at index 1');
        t.equal(data.medals.medal_name[2], 'gold', 'Gold medal appears at index 2');

        t.equal(data.trophies.trophy_name[0], 'first_quiz', '`first_quiz` trophy appears at index 0');
        t.equal(data.trophies.trophy_name[1], 'high_score', '`high_score` trophy appears at index 1');
        t.equal(data.trophies.trophy_name[2], 'overall_average', '`overall_average` trophy appears at index 2');
        t.equal(data.trophies.trophy_name[3], 'participation', '`participation` trophy appears at index 3');
        */
    });
});
