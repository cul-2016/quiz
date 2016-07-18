import test from 'tape';
import { user as userState } from './reducer-fixtures';
import { userDetails as data } from './reducer-fixtures';
import reducer from '../../../src/js/reducers/user';
import deepFreeze from '../../utils/deepFreeze';


test('SET_USER_DETAILS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(userState);

    const action = {
        type: 'SET_USER_DETAILS',
        data
    };

    const expected = {
        user_id: 1,
        email: 'test@test.com',
        username: 'test',
        is_lecturer: true,
        isFetchingUser: false,
        error: undefined
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
