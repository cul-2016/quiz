import test from 'tape';
import { getFirstQuizState } from '../../../server/lib/trophy-methods';
import { testClient } from '../../utils/init';


test('`getFirstQuizState` correctly awards a student with `first quiz` trophy', (t) => {

    const user_id = 1;
    const quiz_id = 1;

    getFirstQuizState(testClient, user_id, quiz_id, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getFirstQuizState returns a Boolean value");
        t.equal(result, true, 'Trophy awarded');
    });
});

test('`getFirstQuizState` correctly does not award a student with `first quiz` trophy', (t) => {

    const user_id = 16;
    const quiz_id = 1;

    getFirstQuizState(testClient, user_id, quiz_id, (error, result) => {

        t.plan(2);

        t.equal(typeof result, 'boolean', "getFirstQuizState returns a Boolean value");
        t.equal(result, false, 'Trophy not awarded');
    });
});
