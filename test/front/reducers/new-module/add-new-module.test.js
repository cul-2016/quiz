import test from 'tape';
import { newModule as newModuleState } from '../../../utils/reducer-fixtures';
import { newModuleError as error } from '../../../utils/action-fixtures';
import { newModuleData as data } from '../../../utils/data-fixtures';
import reducer from '../../../../src/js/reducers/new-module';
import deepFreeze from '../../../utils/deepFreeze';


test('ADD_NEW_MODULE_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'ADD_NEW_MODULE_REQUEST',
    };
    const expected = Object.assign({}, newModuleState, { isSavingModule: true });
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('ADD_NEW_MODULE_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'ADD_NEW_MODULE_SUCCESS',
        data
    };
    const expected = Object.assign({}, newModuleState, { isSavingModule: false });
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('ADD_NEW_MODULE_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'ADD_NEW_MODULE_FAILURE',
        error
    };
    const expected = Object.assign({}, newModuleState, { isSavingModule: false }, { error });
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
