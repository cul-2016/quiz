import test from 'tape';
import { server } from '../../utils/init';


test('`edit-score` endpoint returns error if quiz_id is undefined', (t) => {

    t.plan(1);

    server.inject('/edit-score?user_id=1&score=10', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`edit-score` endpoint returns error if user is undefined', (t) => {

    t.plan(1);

    server.inject('/edit-score?quiz_id=1&score=10', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`edit-score` endpoint returns error if score is undefined', (t) => {

    t.plan(1);

    server.inject('/edit-score?user_id=1&quiz_id=1', (response) => {
        t.equal(response.statusCode, 500, '500 status code');
    });
});

test('`edit-score` endpoint works', (t) => {

    t.plan(1);

    server.inject('/edit-score?quiz_id=1&user_id=1&score=10', (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});
