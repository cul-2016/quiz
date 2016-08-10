import test from 'tape';
import * as actions from '../../../src/js/actions/live-quiz';
import createThunk from '../../utils/mockThunk';
import { nextQuestion, LiveQuizQuestions as questions } from '../../utils/data-fixtures';
import { getQuizQuestionsError, saveResponseError } from '../../utils/action-fixtures';
import deepFreeze from '../../utils/deepFreeze';

test('saveResponse async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.saveResponse());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.SAVE_RESPONSE_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('saveResponseRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.SAVE_RESPONSE_REQUEST
    };

    const actual2 = deepFreeze(actions.saveResponseRequest());
    t.deepEqual(actual2, expected);
});

test('saveResponseSuccess creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.SAVE_RESPONSE_SUCCESS
    };

    const actual2 = deepFreeze(actions.saveResponseSuccess());
    t.deepEqual(actual2, expected);
});

test('saveResponseFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.SAVE_RESPONSE_FAILURE,
        error: saveResponseError
    };
    const actual = deepFreeze(actions.saveResponseFailure(saveResponseError));
    t.deepEqual(actual, expected);
});

test('setQuizID creates the correct action', (t) => {
    t.plan(1);
    const quiz_id = 1;
    const expected = {
        type: actions.SET_QUIZ_ID,
        quiz_id
    };

    const actual = deepFreeze(actions.setQuizID(quiz_id));
    t.deepEqual(actual, expected);
});

test('startQuiz creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.START_QUIZ,
    };

    const actual = deepFreeze(actions.startQuiz());
    t.deepEqual(actual, expected);
});

test('endQuiz creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.END_QUIZ,
    };

    const actual = deepFreeze(actions.endQuiz());
    t.deepEqual(actual, expected);
});

test('startQuiz creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.START_QUIZ,
    };

    const actual = deepFreeze(actions.startQuiz());
    t.deepEqual(actual, expected);
});

test('setIntervalID creates the correct action', (t) => {
    t.plan(1);
    const interval_id = 100;
    const expected = {
        type: actions.SET_INTERVAL_ID,
        interval_id
    };

    const actual = deepFreeze(actions.setIntervalID(interval_id));
    t.deepEqual(actual, expected);
});

test('setNextQuestion creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.SET_NEXT_QUESTION,
        nextQuestion
    };

    const actual = deepFreeze(actions.setNextQuestion(nextQuestion));
    t.deepEqual(actual, expected);
});

test('goToNextQuestion creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GO_TO_NEXT_QUESTION
    };

    const actual = deepFreeze(actions.goToNextQuestion());
    t.deepEqual(actual, expected);
});

test('goToPreviousQuestion creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GO_TO_PREVIOUS_QUESTION
    };

    const actual = deepFreeze(actions.goToPreviousQuestion());
    t.deepEqual(actual, expected);
});

test('getQuizQuestionsRequest creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_QUESTIONS_REQUEST
    };

    const actual = deepFreeze(actions.getQuizQuestionsRequest());
    t.deepEqual(actual, expected);
});

test('getQuizQuestionsSuccess creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_QUESTIONS_SUCCESS,
        questions
    };

    const actual = deepFreeze(actions.getQuizQuestionsSuccess(questions));
    t.deepEqual(actual, expected);
});

test('getQuizQuestionsFailure creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_QUESTIONS_FAILURE,
        error: getQuizQuestionsError
    };

    const actual = deepFreeze(actions.getQuizQuestionsFailure(getQuizQuestionsError));
    t.deepEqual(actual, expected);
});

test('setResponse creates the correct action', (t) => {
    t.plan(1);
    const data = 'a';
    const expected = {
        type: actions.SET_RESPONSE,
        data
    };

    const actual = deepFreeze(actions.setResponse(data));
    t.deepEqual(actual, expected);
});
