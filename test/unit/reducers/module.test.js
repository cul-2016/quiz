import test from 'tape';
import { module as moduleState } from '../../utils/reducer-fixtures';
import { getModuleError as error } from '../../utils/action-fixtures';
import { module as data } from '../../utils/data-fixtures';
import reducer from '../../../src/js/reducers/module';
import deepFreeze from '../../utils/deepFreeze';


test('GET_MODULE_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_REQUEST',
    };
    const expected = Object.assign({}, moduleState, { isFetchingModule: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('GET_MODULE_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_SUCCESS',
        data
    };
    const expected = Object.assign({}, moduleState, {
        isFetchingModule: false,
        module: data.module,
        quizzes: data.quizzes
    });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_MODULE_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(moduleState);

    const action = {
        type: 'GET_MODULE_FAILURE',
        error
    };
    const expected = Object.assign({}, moduleState, { error: error });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
