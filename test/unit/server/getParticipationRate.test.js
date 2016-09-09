import test from 'tape';
import getparticipationrate from '../../../server/lib/getparticipationrate';
import { testClient } from '../../utils/init';

test('getparticipationrate returns the correct results', (t) => {

    t.plan(1);
    const module_id = 'TEST';
    const user_id = 1;
    const expectedRows = { average: 100, participation: '2', totalnumquizzes: '2' };

    getparticipationrate(testClient, module_id, user_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct participation rate');
    });
});
