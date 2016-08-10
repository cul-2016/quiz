import test from 'tape';
import { joinModule as joinModuleState } from '../../utils/reducer-fixtures';
import reducer from '../../../src/js/reducers/join-module';
import deepFreeze from '../../utils/deepFreeze';

test('INPUT_CHANGE works when user enters a module_id', (t) => {

    t.plan(1);

    const initialState = deepFreeze(joinModuleState);
    const value = 'CS50';
    const action = {
        type: 'INPUT_CHANGE',
        value
    };

    const expected = {
        module_id: 'CS50'
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
