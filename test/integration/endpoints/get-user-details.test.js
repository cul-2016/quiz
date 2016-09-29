import test from 'tape';
import { server } from '../../utils/init';

test('`get-user-details` endpoint works when request for user details is made', (t) => {

    t.plan(2);
    const options = {
        method: 'GET',
        url: '/get-user-details?user_id=1'
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});
