import test from 'tape';
import { newModule as newModuleState } from '../../../utils/reducer-fixtures';
import reducer from '../../../../src/js/reducers/new-module';
import deepFreeze from '../../../utils/deepFreeze';


test('UPDATE_TEXT_VALUES updates the module id', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'UPDATE_TEXT_VALUES',
        inputKey: 'module_id',
        value: 'CS50'
    };

    const expected = Object.assign({}, newModuleState, { module_id: 'CS50' });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_TEXT_VALUES updates the module name', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'UPDATE_TEXT_VALUES',
        inputKey: 'name',
        value: 'Intro to Computer Science'
    };

    const expected = Object.assign({}, newModuleState, { name: 'Intro to Computer Science' });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
