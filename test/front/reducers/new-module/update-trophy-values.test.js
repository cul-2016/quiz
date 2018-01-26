import test from 'tape';
import update from 'react-addons-update';
import { newModule as newModuleState } from '../../../utils/reducer-fixtures';
import reducer from '../../../../src/js/reducers/new-module';
import deepFreeze from '../../../utils/deepFreeze';


test('UPDATE_TROPHY_VALUES works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'UPDATE_TROPHY_VALUES',
        trophy: 'high_score',
        value: 90
    };
    const expected = update(newModuleState, {
        trophies: { condition: { $set: [3, 60, 90, 1] } }
    });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});


test('TOGGLE_DISABLE_TROPHIES works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'TOGGLE_DISABLE_TROPHIES',
    };
    const expected = update(newModuleState, {
        trophiesDisabled: { $set: true }
    });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
