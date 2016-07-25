import test from 'tape';
import { server } from '../../utils/init';


test('`get-module` endpoint works', (t) => {

    t.plan(18);

    server.inject('/get-module?module_id=TEST', (response) => {

        const data = response.result;

        t.equal(response.statusCode, 200, '200 status code');

        ['quizzes', 'medals', 'trophies', 'numUsers'].forEach((key) => {
            t.ok(data.hasOwnProperty(key), `The ${key} key exists`);
        });

        t.equal(data.quizzes[0].title, 'Week 1 Quiz');
        t.equal(data.quizzes[0].num_entries, '1');
        t.equal(data.quizzes[0].num_questions, '2');

        t.equal(data.quizzes[1].title, 'Week 2 Quiz');
        t.equal(data.quizzes[1].num_entries, '1');
        t.equal(data.quizzes[1].num_questions, '2');

        t.equal(data.medals[0].medal_name, 'bronze', 'Bronze medal appears at index 0');
        t.equal(data.medals[1].medal_name, 'silver', 'Silver medal appears at index 1');
        t.equal(data.medals[2].medal_name, 'gold', 'Gold medal appears at index 2');

        t.equal(data.trophies[0].trophy_name, 'first_quiz', '`first_quiz` trophy appears at index 0');
        t.equal(data.trophies[1].trophy_name, 'full_marks', '`full_marks` trophy appears at index 1');
        t.equal(data.trophies[2].trophy_name, 'overall_average', '`overall_average` trophy appears at index 2');
        t.equal(data.trophies[3].trophy_name, 'participation', '`participation` trophy appears at index 3');
    });
});
