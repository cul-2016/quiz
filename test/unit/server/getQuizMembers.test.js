import test from 'tape';
import getQuizMembers from '../../../server/lib/getQuizMembers';
import { testClient } from '../../utils/init';

test('Gets list of users for a given quiz', (t) => {

    t.plan(1);
    const expectedRows = [{ email: 'student@city.ac.uk', score: 10, user_id: 1, username: 'student' }];
    // THE REASON FOR SCORE: 10 is because it has been updated in editScore.test.js
    getQuizMembers(testClient, 1, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of users');
    });
});