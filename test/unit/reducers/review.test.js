import test from 'tape';
import diff from 'deep-diff';

import { review as reviewState } from '../../utils/reducer-fixtures';
import { getQuizReviewError as error } from '../../utils/action-fixtures';

import reducer from '../../../src/js/reducers/review';
import { reviewQuestions as questions } from '../../utils/data-fixtures';
import deepFreeze from '../../utils/deepFreeze';

test('GET_QUIZ_REVIEW_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(reviewState);
    const action = {
        type: 'GET_QUIZ_REVIEW_REQUEST',
    };

    const actual = reducer(initialState, action);

    const expected = Object.assign({}, reviewState, { isFetchingReview: true });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_REVIEW_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            reviewState,
            { isFetchingReview: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_REVIEW_SUCCESS',
        questions
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, reviewState, { isFetchingReview: false }, { questions });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_REVIEW_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            reviewState,
            { isFetchingReview: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_REVIEW_FAILURE',
        error
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, reviewState, { isFetchingReview: false }, { error });

    t.deepEqual(actual, expected);
});

test('FLIP_IS_ANSWER_SHOWING works when original state is false', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            reviewState
        )
    );
    const action = {
        type: 'FLIP_IS_ANSWER_SHOWING'
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, reviewState, { isAnswerShowing: true });

    t.deepEqual(actual, expected);
});

test('FLIP_IS_ANSWER_SHOWING works when original state is true', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            reviewState,
            { isAnswerShowing: true }
        )
    );
    const action = {
        type: 'FLIP_IS_ANSWER_SHOWING'
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, reviewState, { isAnswerShowing: false });

    t.deepEqual(actual, expected);
});

test('INCREMENT_CURRENT_QUIZ_INDEX works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            reviewState
        )
    );
    const action = {
        type: 'INCREMENT_CURRENT_QUIZ_INDEX'
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, reviewState, { currentQuizIndex: 1 });

    t.deepEqual(actual, expected);
});

test('SHOW_ANSWER works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            { ...reviewState, questions }
        )
    );

    const idx = 1;
    const action = {
        type: 'SHOW_ANSWER',
        idx
    };
    const newState = reducer(initialState, action);

    const actual = diff(newState, initialState);

    const expected = [{
        kind: 'D',
        path: ['questions', 1, 'isAnswerShowing'],
        lhs: true
    }];
    t.deepEqual(actual, expected, 'updated only question at index');
});
