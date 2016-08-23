import test from 'tape';
import { server } from '../../utils/init';


test('`update-quiz` endpoint works', (t) => {
    t.plan(2);

    const options = {
        method: 'POST',
        url: '/update-quiz',
        payload: {
            module_id: 'TEST',
            quiz_id: 1,
            quizName: 'Week 1 Quiz',
            editedQuestions: [{ question_id: 2,
            question: 'What is the capital of Croatia?',
            a: 'Zagreb',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster',
            correct_answer: 'a',
            quiz_id: '1' },
          { question_id: 1,
            question: 'What is the capital of England?',
            a: 'London',
            b: 'Cardiff',
            c: 'Edinburgh',
            d: 'Doncaster',
            correct_answer: 'a',
            quiz_id: '1' }],
            newQuestions: []
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});
