import test from 'tape';
import getQuizDetailsStudent from '../../../server/lib/getQuizDetailsStudent';
import { testClient } from '../../utils/init';


test('`getQuizDetailsStudent` gets questions, answers and student answers for a given quiz', (t) => {

    t.plan(1);
    const user_id = 1;
    const quiz_id = 2;
    const expectedRows = [{
        question: 'What is the National Animal of England?',
        a: 'Pikachu',
        b: 'Whale',
        c: 'Lion',
        d: 'Doncaster',
        correct_answer: 'c',
        response: 'b'
    }, {
        question: 'What is the capital of Tanzania?',
        a: 'Zagreb',
        b: 'Dodoma',
        c: 'Edinburgh',
        d: 'Doncaster',
        correct_answer: 'b',
        response: 'b'
    }];
    getQuizDetailsStudent(testClient, quiz_id, user_id, (error, response) => {
        if (error) {
            console.error(error);
            t.error(error, 'should not have errored!');
        }
        t.deepEqual(response, expectedRows, 'database returns correct quiz details');
    });
});
