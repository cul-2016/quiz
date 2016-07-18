import test from 'tape';
import { signup as signupState } from './reducer-fixtures';
import reducer from '../../../src/js/reducers/signup';
import deepFreeze from '../../utils/deepFreeze';


test('UPDATE_EMAIL works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(signupState);

    const action = {
        type: 'UPDATE_EMAIL',
        value: 'test@city.ac.uk'
    };

    const expected = {
        email: 'test@city.ac.uk',
        password: "",
        isFetchingSignup: false,
        error: undefined
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_PASSWORD works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(signupState);

    const action = {
        type: 'UPDATE_PASSWORD',
        value: 'testpassword'
    };

    const expected = {
        email: "",
        password: 'testpassword',
        isFetchingSignup: false,
        error: undefined
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
