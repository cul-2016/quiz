import test from 'tape';
import getLeaderboard from '../../../server/lib/getLeaderboard';
import { testClient } from '../../utils/init';

test('Gets the list for leaderboard', (t) => {

    t.plan(1);
    const expectedRows = [
        {
            average: 75,
            module_id: 'TEST',
            user_id: 1,
            username: 'student'
        }, {
            average: 50,
            module_id: 'TEST',
            user_id: 3,
            username: 'sohil'
        }, {
            average: 25,
            module_id: 'TEST',
            user_id: 4,
            username: 'mina' }];

    getLeaderboard(testClient, 'TEST', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of leaders');
    });
});
