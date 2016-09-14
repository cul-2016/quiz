import test from 'tape';
import getQuizMembers from '../../../server/lib/getQuizMembers';
import { testClient } from '../../utils/init';


test('`getQuizMembers` get list of student participants in a quiz', (t) => {

    t.plan(1);
    const quiz_id = 1;
    const expectedRows = [
        { email: 'student@city.ac.uk', score: 2, user_id: 1, username: 'student' },
        { email: 'sohil@city.ac.uk', score: 2, user_id: 3, username: 'Sohil' }, // score changed in editScore.test
        { email: 'mina@city.ac.uk', score: 0, user_id: 4, username: 'Mina' },
        { email: 'homer@simpsons.com', score: 2, user_id: 5, username: 'Homer' }
    ];

    getQuizMembers(testClient, quiz_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'correct number of students');
    });
});
