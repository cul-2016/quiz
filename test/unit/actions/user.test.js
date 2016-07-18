import test from 'tape';
// import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/user';
import deepFreeze from '../../utils/deepFreeze';
import { userDetails as data } from '../reducers/reducer-fixtures';

test('setUserDetails creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.SET_USER_DETAILS,
        data
    };

    const actual2 = deepFreeze(actions.setUserDetails(data));
    t.deepEqual(actual2, expected);
});
