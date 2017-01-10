import test from 'tape';
import sinon from 'sinon';
import * as actions from '../../../src/js/actions/review';
import createThunk from '../../utils/mockThunk';
import deepFreeze from '../../utils/deepFreeze';
import { reviewQuestions as questions, questionsAnswers } from '../../utils/data-fixtures';
import { getQuizReviewError as error } from '../../utils/action-fixtures';

// modules stubbed/spied by sinon
import axios from 'axios';
const createSandbox = sinon.sandbox.create;

test('getQuizReview async action creator returns expected action', (t) => {

    t.plan(1);

    let result;
    const { dispatch, queue } = createThunk();
    dispatch(actions.getQuizReview());

    [{ ...result }] = queue;

    const expected = {
        type: actions.GET_QUIZ_REVIEW_REQUEST
    };
    t.deepEqual(result, expected);
});

test('getQuizReviewRequest creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_REVIEW_REQUEST
    };

    const actual = deepFreeze(actions.getQuizReviewRequest());
    t.deepEqual(actual, expected);
});

test('getQuizReviewSuccess creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_REVIEW_SUCCESS,
        questions
    };

    const actual = deepFreeze(actions.getQuizReviewSuccess(questions));
    t.deepEqual(actual, expected);
});

test('getQuizReviewFailure creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_REVIEW_FAILURE,
        error
    };

    const actual = deepFreeze(actions.getQuizReviewFailure(error));
    t.deepEqual(actual, expected);
});

test('flipIsAnswerShowing creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.FLIP_IS_ANSWER_SHOWING
    };

    const actual = deepFreeze(actions.flipIsAnswerShowing());
    t.deepEqual(actual, expected);
});

test('incrementCurrentQuizIndex creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.INCREMENT_CURRENT_QUIZ_INDEX
    };

    const actual = deepFreeze(actions.incrementCurrentQuizIndex());
    t.deepEqual(actual, expected);
});

test('show answer creates the correct action', (t) => {

    t.plan(1);

    const idx = 1;
    const expected = {
        type: actions.SHOW_ANSWER,
        idx
    };
    const actual = deepFreeze(actions.showAnswer(idx));
    t.deepEqual(actual, expected);
});

test('getQuizDetailsStudent: success', t => {
    t.plan(2);

    const { dispatch, queue } = createThunk();
    const quiz_id = 1;

    const sandbox = createSandbox();
    const successPromise = new Promise(resolve => resolve(
        { data: questionsAnswers }
    ));
    sandbox.stub(axios, 'get').returns(successPromise);

    dispatch(actions.getQuizDetailsStudent(quiz_id));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_QUIZ_REVIEW_REQUEST },
            'flags request'
        );

        t.deepEqual(
            queue.shift(),
            {
                type: actions.GET_QUIZ_REVIEW_SUCCESS,
                questions: questionsAnswers
            },
            'sets questions in state upon success'
        );
        sandbox.restore();
    }, 300);
});

test('getQuizDetailsStudent: failure', t => {
    t.plan(2);

    const { dispatch, queue } = createThunk();
    const quiz_id = 1;

    const sandbox = createSandbox();
    const successPromise = new Promise((resolve, reject) => reject('error'));
    sandbox.stub(axios, 'get').returns(successPromise);

    dispatch(actions.getQuizDetailsStudent(quiz_id));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            { type: actions.GET_QUIZ_REVIEW_REQUEST },
            'flags request'
        );

        t.deepEqual(
            queue.shift(),
            {
                type: actions.GET_QUIZ_REVIEW_FAILURE,
                error: 'error'
            },
            'flags failure'
        );
        sandbox.restore();
    }, 300);
});
