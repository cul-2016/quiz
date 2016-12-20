import test from 'tape';
import { server } from '../../utils/init';


test.skip('`reset-password-request` endpoint works', (t) => {

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
