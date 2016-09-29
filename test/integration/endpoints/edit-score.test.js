import test from 'tape';
import { server, testClient } from '../../utils/init';
import query from '../../../server/lib/query';
import queries from '../../../server/lib/queries.json';


test('`edit-score` endpoint returns error if quiz_id is undefined', (t) => {

    t.plan(1);

    const user_id = 3;
    const score = 10;

    server.inject(`/edit-score?user_id=${user_id}&score=${score}`, (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`edit-score` endpoint returns error if user_id is undefined', (t) => {

    t.plan(1);

    const score = 10;

    server.inject(`/edit-score?quiz_id=1&score=${score}`, (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`edit-score` endpoint returns error if score is undefined', (t) => {

    t.plan(1);

    const user_id = 3;
    const quiz_id = 1;

    server.inject(`/edit-score?user_id=${user_id}&quiz_id=${quiz_id}`, (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`edit-score` endpoint works', (t) => {

    t.plan(1);

    const user_id = 3;
    const quiz_id = 1;
    const score = 2;

    server.inject(`/edit-score?quiz_id=1&user_id=${user_id}&score=${score}`, (response) => {
        t.equal(response.statusCode, 200, '200 status code');

        query(testClient, queries.editScore, [user_id, quiz_id, score]);
    });
});
