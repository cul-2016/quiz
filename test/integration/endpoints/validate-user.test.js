import test from 'tape';
import { server } from '../../utils/init';

test('`validate-user` endpoint returns true when password matches', (t) => {
    t.plan(2);
    const options = {
        method: 'POST',
        url: '/validate-user',
        payload: {
            email: 'lecturer@city.ac.uk',
            password: 'testinglecturer',
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.deepEqual(response.result, true, 'Get data back');
    });

});

test('`validate-user` endpoint returns false when password do not match', (t) => {
    t.plan(2);
    const options = {
        method: 'POST',
        url: '/validate-user',
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
