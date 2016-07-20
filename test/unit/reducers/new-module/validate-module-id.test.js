import test from 'tape';
import { newModule as newModuleState } from '../../../utils/reducer-fixtures';
import { trophies } from '../../../utils/data-fixtures';
import reducer from '../../../../src/js/reducers/new-module';
import deepFreeze from '../../../utils/deepFreeze';


test('VALIDATE_MODULE_ID_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'VALIDATE_MODULE_ID_REQUEST'
    };

    const expected = Object.assign({}, newModuleState, { isValidatingModuleID: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('VALIDATE_MODULE_ID_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'VALIDATE_MODULE_ID_SUCCESS',
        moduleIDExists: true
    };

    const expected = Object.assign({}, newModuleState, { isValidatingModuleID: false }, { moduleIDExists: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
