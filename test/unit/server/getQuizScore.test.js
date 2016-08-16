import test from 'tape';
import getQuizScore from '../../../server/lib/getQuizScore';
import { testClient } from '../../utils/init';

test.skip('Gets a student\'s score for a quiz', (t) => {

    t.plan(1);
    const expectedRows = [];

    getQuizScore(testClient, '1', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'returns the correct score');
    });
});
