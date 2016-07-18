import test from 'tape';
import { server, testClient } from '../../utils/init';

test('`save-user` endpoint works when a lecturer registers', (t) => {

    t.plan(2);
    const options = {
        method: 'POST',
        url: '/save-user',
        payload: {
            email: 'testinglecturer@city.ac.uk',
            password: 'testinglecturer',
            is_lecturer: true,
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});

test('`save-user` endpoint works when a student registers', (t) => {

    t.plan(2);
    const options = {
        method: 'POST',
        url: '/save-user',
        payload: {
            email: 'testingstudent@city.ac.uk',
            password: 'testingstudent',
            is_lecturer: false,
            username: 'testingstudent'
        }
    };

    server.inject(options, (response) => {

        t.equal(response.statusCode, 200, '200 status code');
        t.ok(response.result, 'Get data back');
    });
});

test('deleting recently added users from the database', (t) => {

    testClient.connect((error, client, done) => {
        if (error) {
            console.error(error, 'error from deleting lecturer from the database');
        }
        client.query('DELETE FROM users WHERE email = $1', ['testinglecturer@city.ac.uk']);
        client.query('DELETE FROM users WHERE email = $1', ['testingstudent@city.ac.uk']);
        done();
        t.end();
    });
});
