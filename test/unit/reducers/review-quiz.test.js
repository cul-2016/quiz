import test from 'tape';
import { reviewQuiz as reviewQuizState } from '../../utils/reducer-fixtures';
import { getQuizReviewError as error } from '../../utils/action-fixtures';

import reducer from '../../../src/js/reducers/review-quiz';
import { reviewQuizQuestion as questions } from '../../utils/data-fixtures';
import deepFreeze from '../../utils/deepFreeze';

test('GET_QUIZ_REVIEW_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(reviewQuizState);
    const action = {
        type: 'GET_QUIZ_REVIEW_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, reviewQuizState, { isFetchingReviewQuiz: true });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_REVIEW_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            reviewQuizState,
            { isFetchingReviewQuiz: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_REVIEW_SUCCESS'
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, reviewQuizState, { isFetchingReviewQuiz: false }, { questions });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_REVIEW_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            reviewQuizState,
            { isFetchingReviewQuiz: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_REVIEW_FAILURE',
        error
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, reviewQuizState, { isFetchingReviewQuiz: false }, { error });

    t.deepEqual(actual, expected);
});
