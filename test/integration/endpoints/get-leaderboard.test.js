import test from 'tape';
import { server } from '../../utils/init';


test('`get-leaderboard` endpoint returns error if module_id is undefined', (t) => {

    t.plan(1);

    server.inject('/get-leaderboard', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`get-leaderboard` endpoint works', (t) => {

    t.plan(1);
    const module_id = 'TEST';

    server.inject(`/get-leaderboard?module_id=${module_id}`, (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
