import test from 'tape';
import { newModule as newModuleState } from '../../../utils/reducer-fixtures';
// import { newModuleError as error } from '../actions/action-fixtures';
import { trophies } from '../../../utils/data-fixtures';
import reducer from '../../../../src/js/reducers/new-module';
import deepFreeze from '../../../utils/deepFreeze';


test('UPDATE_MEDAL_VALUES works when bronze upper bound changes', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'UPDATE_MEDAL_VALUES',
        medal: 'bronze',
        value: 26
    };

    const expected = {
        module_id: undefined,
        name: undefined,
        medals: [27, 69],
        trophies
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_MEDAL_VALUES works when gold lower bound changes', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'UPDATE_MEDAL_VALUES',
        medal: 'gold',
        value: 80
    };

    const expected = {
        module_id: undefined,
        name: undefined,
        medals: [39, 79],
        trophies
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_MEDAL_VALUES handles the empty string', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'UPDATE_MEDAL_VALUES',
        medal: 'gold',
        value: ""
    };

    const expected = {
        module_id: undefined,
        name: undefined,
        medals: [39, '-'],
        trophies
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
