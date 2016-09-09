import test from 'tape';
import getParticipationRate from '../../../server/lib/getParticipationRate';
import { testClient } from '../../utils/init';

test('`getParticipationRate` returns the correct results', (t) => {

    t.plan(1);
    const module_id = 'TEST';
    const user_id = 1;
    const expectedRows = { average: 100, participation: '2', num_quizzes: '2' };

    getParticipationRate(testClient, module_id, user_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct participation rate');
    });
});
