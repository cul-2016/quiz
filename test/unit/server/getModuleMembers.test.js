import test from 'tape';
import getModuleMembers from '../../../server/lib/getModuleMembers';
import { testClient } from '../../utils/init';

test('`getModuleMembers` gets list of students for a given module', (t) => {

    t.plan(1);
    const expectedRows = [
        { email: 'student@city.ac.uk', user_id: 1, username: 'student' },
        { email: 'sohil@city.ac.uk', user_id: 3, username: 'Sohil' }, 
        { email: 'mina@city.ac.uk', user_id: 4, username: 'Mina' }];

    getModuleMembers(testClient, 'TEST', (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expectedRows, 'database returns correct row of users');
    });
});
