import test from 'tape';
import { server } from '../../utils/init';

test('`authenticate-user` endpoint returns true when password matches', (t) => {
    t.plan(2);
    const options = {
        method: 'POST',
        url: '/authenticate-user',
        payload: {
            email: 'lecturer@city.ac.uk',
            password: 'testinglecturer',
        }
    };
    const expectedResponse = {
        email: 'lecturer@city.ac.uk',
        is_lecturer: true,
        user_id: 2,
        username: 'lecturer'
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(response.result, expectedResponse, 'Get data back');
    });

});

test('`authenticate-user` endpoint returns false when password do not match', (t) => {
    t.plan(2);
    const options = {
        method: 'POST',
        url: '/authenticate-user',
        payload: {
            email: 'lecturer@city.ac.uk',
            password: 'testinglecDSFD',
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(response.result, false, 'Get data back');
    });

});

test('`authenticate-user` endpoint returns false when email entered does not exist', (t) => {
    t.plan(2);
    const options = {
        method: 'POST',
        url: '/authenticate-user',
        payload: {
            email: 'fakeEmail@city.ac.uk',
            password: 'testinglecDSFD',
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(response.result, false, 'Get data back');
    });

});
