import test from 'tape';
import { getQuizScoreError as error  } from '../../utils/action-fixtures';
import { score as scoreState } from '../../utils/reducer-fixtures';
import reducer from '../../../src/js/reducers/score';
import deepFreeze from '../../utils/deepFreeze';


test('GET_QUIZ_SCORE_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(scoreState);
    const action = {
        type: 'GET_QUIZ_SCORE_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, scoreState, { isFetchingScore: true });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_SCORE_SUCCESS works', (t) => {

    t.plan(1);

    const score = 4;

    const initialState = deepFreeze(
        Object.assign(
            {},
            scoreState,
            { isFetchingScore: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_SCORE_SUCCESS',
        score
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, scoreState, { isFetchingScore: false }, { score });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_SCORE_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            scoreState,
            { isFetchingScore: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_SCORE_FAILURE',
        error
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, scoreState, { isFetchingScore: false }, { error });

    t.deepEqual(actual, expected);
});
