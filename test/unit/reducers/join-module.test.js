import test from 'tape';
import { joinModule as joinModuleState } from '../../utils/reducer-fixtures';
import reducer from '../../../src/js/reducers/join-module';
import deepFreeze from '../../utils/deepFreeze';
import { joinModuleError } from '../../utils/action-fixtures';


test('INPUT_CHANGE works when user enters a module_id', (t) => {

    t.plan(1);

    const initialState = deepFreeze(joinModuleState);
    const value = 'CS50';
    const action = {
        type: 'INPUT_CHANGE',
        value
    };

    const expected = Object.assign({}, joinModuleState, { module_id: 'CS50' });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('JOIN_MODULE_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(joinModuleState);

    const action = {
        type: 'JOIN_MODULE_REQUEST',
    };
    const expected = Object.assign({}, joinModuleState, { isJoiningModule: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('JOIN_MODULE_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(joinModuleState);

    const action = {
        type: 'JOIN_MODULE_SUCCESS',
    };
    const expected = Object.assign({}, joinModuleState, { isJoiningModule: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('JOIN_MODULE_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(joinModuleState);

    const action = {
        type: 'JOIN_MODULE_FAILURE',
        error: joinModuleError
    };
    const expected = Object.assign({}, joinModuleState, { isJoiningModule: false, error: joinModuleError });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
