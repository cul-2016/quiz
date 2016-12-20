import test from 'tape';
import {
    initialState as resetPasswordState,
    resetPassword as reducer
} from '../../../src/js/reducers/reset-password';
import deepFreeze from '../../utils/deepFreeze';


test('UPDATE_EMAIL works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const email = 'test@city.ac.uk';
    const action = {
        type: 'UPDATE_EMAIL',
        value: email
    };

    const expected = Object.assign({}, resetPasswordState, { email });


    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_PASSWORD works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const password = 'testpassword';
    const action = {
        type: 'UPDATE_PASSWORD',
        value: password
    };

    const expected = Object.assign({}, resetPasswordState, { password });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_CONFIRMED_PASSWORD works when user enters a value', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resetPasswordState);

    const confirmedPassword = 'testpassword';
    const action = {
        type: 'UPDATE_CONFIRMED_PASSWORD',
        value: confirmedPassword
    };

    const expected = Object.assign({}, resetPasswordState, { confirmedPassword });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
