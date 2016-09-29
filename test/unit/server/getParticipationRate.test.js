import test from 'tape';
import getParticipationRate from '../../../server/lib/getParticipationRate';
import { testClient } from '../../utils/init';


test('`getParticipationRate` returns null for a student with fewer than 4 quiz submissions', (t) => {

    t.plan(1);

    const user_id = 1;
    const module_id = 'TEST';

    getParticipationRate(testClient, user_id, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.equal(response, null, 'null is returned');
    });
});

test('`getParticipationRate` returns rate for a student with at least 4 quiz submissions', (t) => {

    t.plan(1);

    const user_id = 8;
    const module_id = 'CENT';
    const expected = 100;

    getParticipationRate(testClient, user_id, module_id, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.equal(response, expected, 'database returns correct participation rate');
    });
});
