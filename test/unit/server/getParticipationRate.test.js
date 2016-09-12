import test from 'tape';
import getParticipationRate from '../../../server/lib/getParticipationRate';
import { testClient } from '../../utils/init';


test('`getParticipationRate` returns the correct results', (t) => {

    t.plan(1);

    const user_id = 1;
    const module_id = 'TEST';
    const expected = 100;

    getParticipationRate(testClient, user_id, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.equal(response, expected, 'database returns correct participation rate');
    });
});
