import test from 'tape';
import { server } from '../../utils/init';


test('`reset-password-request` endpoint works', (t) => {

    t.plan(1);

    const email = 'sohilpandya@foundersandcoders.com';
    const options = {
        method: 'POST',
        url: '/reset-password-request',
        payload: {
            email
        }
    };

    server.inject(options, (response) => {
        t.equal(response.statusCode, 200, '200 status code');
    });
});


test('`reset-password-request` endpoint returns custom error message if user email does not exist', (t) => {

    t.plan(2);

    const email = 'fake@fake.com';
    const options = {
        method: 'POST',
        url: '/reset-password-request',
        payload: {
            email
        }
    };
    const errorMessage = {
        message: 'Sorry the email does not exist'
    };

    server.inject(options, (response) => {
        t.deepEqual(response.result, errorMessage, 'replied with error message');
        t.equal(response.statusCode, 200, '200 status code');
    });
});
