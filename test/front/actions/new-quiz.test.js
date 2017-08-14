import test from 'tape';
import sinon from 'sinon';
import axios from 'axios';

import * as actions from '../../../src/js/actions/new-quiz';
import createThunk from '../../utils/mockThunk';
import { getQuizDetailsData } from '../../utils/data-fixtures';
import { questions } from '../../utils/data-fixtures';
import deepFreeze from '../../utils/deepFreeze';
import { saveQuizError as error, getQuizDetailsError } from '../../utils/action-fixtures';
import { initialState } from '../../../src/js/reducers/new-quiz.js';

const createSandbox = sinon.sandbox.create;

test('addQuestion action creator returns the expected action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.ADD_QUESTION
    };

    const actual = deepFreeze(actions.addQuestion());
    t.deepEqual(actual, expected);
});

test('deleteQuestion action creator returns the expected action', (t) => {

    t.plan(1);
    const index = 1;
    const expected = {
        type: actions.DELETE_QUESTION,
        index
    };

    const actual = deepFreeze(actions.deleteQuestion(index));
    t.deepEqual(actual, expected);
});

test('updateValue action creator returns the exected action', (t) => {

    t.plan(1);
    const inputType = 'question';
    const value = 'Capital of England';
    const index = 0;
    const expected = {
        type: actions.UPDATE_VALUE,
        inputType,
        value,
        index
    };

    const actual = deepFreeze(actions.updateValue(inputType, value, index));
    t.deepEqual(actual, expected);
});

test('updateQuizName action creator returns the exected action', (t) => {

    t.plan(1);
    const value = 'Week 1';
    const expected = {
        type: actions.UPDATE_QUIZ_NAME,
        value
    };

    const actual = deepFreeze(actions.updateQuizName(value));
    t.deepEqual(actual, expected);
});

test('clearNewQuizState action creator returns the exected action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.CLEAR_NEW_QUIZ_STATE,
    };

    const actual = deepFreeze(actions.clearNewQuizState());
    t.deepEqual(actual, expected);
});


test('toggleIsLastQuiz action creator returns the expected action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.TOGGLE_IS_LAST_QUIZ
    };

    const actual = deepFreeze(actions.toggleIsLastQuiz());
    t.deepEqual(actual, expected);
});

test('questionOrder action creator returns the expected action', (t) => {

    t.plan(1);
    let questions = [{ question_id: 1 }, { question_id: 2 }];
    let oldIndex = 1;
    let newIndex = 2;
    const expected = {
        type: actions.QUESTION_ORDER,
        data: { questions, oldIndex, newIndex }
    };

    const actual = deepFreeze(actions.questionOrder(questions, oldIndex, newIndex));
    t.deepEqual(actual, expected);
});

// -----
// SAVING NEW QUIZ
// -----


test('saveQuiz async action: success', (t) => {

    t.plan(2);
    let module_id = 'TEST';
    let quizName = 'week 1';

    const sandbox = createSandbox();
    const successResponse = 'ok';
    const successPromise = new Promise((resolve) => resolve(successResponse));
    sandbox.stub(axios, 'post').returns(successPromise);

    const { dispatch, queue } = createThunk({ newQuiz: initialState });
    dispatch(actions.saveQuiz(module_id, quizName, questions, false, false));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.SAVE_QUIZ_REQUEST,
            },
            'flags request'
        );

        t.deepEqual(
            queue.shift(),
            {
                type: actions.SAVE_QUIZ_SUCCESS,
                data: successResponse
            },
            'sets data from response'
        );
        sandbox.restore();
    }, 300);
});

test('saveQuiz async action: failure', (t) => {

    t.plan(2);
    let module_id = 'TEST';
    let quizName = 'week 1';

    const sandbox = createSandbox();
    const failureResponse = {
        response: { status: 500 },
        message: 'Sorry, something went wrong!'
    };
    const failurePromise = Promise.reject(failureResponse);
    sandbox.stub(axios, 'post').returns(failurePromise);

    const { dispatch, queue } = createThunk({ newQuiz: initialState });
    dispatch(actions.saveQuiz(module_id, quizName, questions, false, false));

    setTimeout(() => {
        t.deepEqual(
            queue.shift(),
            {
                type: actions.SAVE_QUIZ_REQUEST,
            },
            'flags request'
        );

        t.deepEqual(
            queue.shift(),
            {
                type: actions.SAVE_QUIZ_FAILURE,
                error: failureResponse
            },
            'sets error from response'
        );
        sandbox.restore();
    }, 300);
});

test('saveQuizRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.SAVE_QUIZ_REQUEST,
    };

    const actual2 = deepFreeze(actions.saveQuizRequest());
    t.deepEqual(actual2, expected);
});

test('saveQuizSuccess creates the correct action', (t) => {

    t.plan(1);
    const data = true;
    const expected = {
        type: actions.SAVE_QUIZ_SUCCESS,
        data
    };

    const actual2 = deepFreeze(actions.saveQuizSuccess(data));
    t.deepEqual(actual2, expected);
});

test('saveQuizFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.SAVE_QUIZ_FAILURE,
        error
    };
    const actual = deepFreeze(actions.saveQuizFailure(error));
    t.deepEqual(actual, expected);
});


// -----
// UPDATE QUIZ
// -----


test('updateQuiz async action creator returns expected action', (t) => {

    t.plan(1);
    let module_id = 'TEST';
    let quiz_id = 1;
    let survey_id = 1;
    let quizName = 'week 1';
    let actual;
    const { dispatch, queue } = createThunk({ newQuiz: initialState });
    dispatch(actions.updateQuiz(module_id, quiz_id, survey_id, quizName, questions));

    [{ ...actual }] = queue;

    const expected = {
        type: actions.UPDATE_QUIZ_REQUEST,
    };
    t.deepEqual(actual, expected);
});

test('updateQuizRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_QUIZ_REQUEST,
    };

    const actual2 = deepFreeze(actions.updateQuizRequest());
    t.deepEqual(actual2, expected);
});

test('updateQuizSuccess creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.UPDATE_QUIZ_SUCCESS
    };

    const actual2 = deepFreeze(actions.updateQuizSuccess());
    t.deepEqual(actual2, expected);
});

test('updateQuizFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_QUIZ_FAILURE,
        error
    };
    const actual = deepFreeze(actions.updateQuizFailure(error));
    t.deepEqual(actual, expected);
});


// -----
// GET QUIZ QUESTIONS
// -----


test('getQuizDetails async action creator returns expected action', (t) => {

    t.plan(1);
    let quiz_id = 1;
    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.getQuizDetails(quiz_id));

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_QUIZ_DETAILS_REQUEST,
    };
    t.deepEqual(actual, expected);
});

test('getQuizDetailsRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_DETAILS_REQUEST,
    };

    const actual2 = deepFreeze(actions.getQuizDetailsRequest());
    t.deepEqual(actual2, expected);
});

test('getQuizDetailsSuccess creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.GET_QUIZ_DETAILS_SUCCESS,
        data: getQuizDetailsData
    };

    const actual2 = deepFreeze(actions.getQuizDetailsSuccess(getQuizDetailsData));
    t.deepEqual(actual2, expected);
});

test('getQuizDetailsFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_DETAILS_FAILURE,
        error: getQuizDetailsError
    };
    const actual = deepFreeze(actions.getQuizDetailsFailure(getQuizDetailsError));
    t.deepEqual(actual, expected);
});

test('toggleIsSurvey creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.TOGGLE_IS_SURVEY
    };
    const actual = deepFreeze(actions.toggleIsSurvey());
    t.deepEqual(actual, expected);
});
