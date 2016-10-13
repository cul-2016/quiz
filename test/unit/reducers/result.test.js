import test from 'tape';
import { getQuizResultError as error  } from '../../utils/action-fixtures';
import { initialState as resultState } from '../../../src/js/reducers/result';
import { result as reducer } from '../../../src/js/reducers/result';
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
        score: {
            raw: 4,
            percentage: 60
        },
        newTrophyState: {
            first_quiz: true,
            high_score: false,
            participation: true,
            overall_average: true
        }
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
    const expected = Object.assign(
        {},
        resultState,
        { isFetchingResult: false },
        { score: data.score.raw },
        { percentageScore: data.score.percentage },
        { newTrophyState: data.newTrophyState }
    );

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
