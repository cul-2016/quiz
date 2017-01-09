import test from 'tape';
import { newModule as newModuleState } from '../../../utils/reducer-fixtures';
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

    const expected = Object.assign({}, newModuleState, { medals: [27, 69] });

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

    const expected = Object.assign({}, newModuleState, { medals: [39, 79] });

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

    const expected = Object.assign({}, newModuleState, { medals: [39, '-'] });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
