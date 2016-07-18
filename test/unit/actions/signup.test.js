import test from 'tape';
// import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/signup';
import deepFreeze from '../../utils/deepFreeze';

test('updateEmail creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_EMAIL,
        value: 'test@city.ac.uk'
    };
    const actual = deepFreeze(actions.updateEmail('test@city.ac.uk'));
    t.deepEqual(actual, expected);
});

test('updatePassword creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_PASSWORD,
        value: 'testpassword'
    };
    const actual = deepFreeze(actions.updatePassword('testpassword'));
    t.deepEqual(actual, expected);
});
