import test from 'tape';
import { getQuizResultError as error  } from '../../utils/action-fixtures';
import { result as resultState } from '../../utils/reducer-fixtures';
import reducer from '../../../src/js/reducers/result';
import deepFreeze from '../../utils/deepFreeze';


test('GET_QUIZ_RESULT_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(resultState);
    const action = {
        type: 'GET_QUIZ_RESULT_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, resultState, { isFetchingResult: true });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_RESULT_SUCCESS works', (t) => {

    t.plan(1);

    const data = {
        score: 4
    };

    const initialState = deepFreeze(
        Object.assign(
            {},
            resultState,
            { isFetchingResult: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_RESULT_SUCCESS',
        data
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, resultState, { isFetchingResult: false }, data);

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_RESULT_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            resultState,
            { isFetchingResult: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_RESULT_FAILURE',
        error
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, resultState, { isFetchingResult: false }, { error });

    t.deepEqual(actual, expected);
});
