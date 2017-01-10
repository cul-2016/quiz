import test from 'tape';
import { liveQuiz as liveQuizState } from '../../utils/reducer-fixtures';
import { liveQuizError as error, abortQuizError, endQuizError } from '../../utils/action-fixtures';
import reducer from '../../../src/js/reducers/live-quiz';
import { nextQuestion, liveQuizQuestion as questions } from '../../utils/data-fixtures';
import deepFreeze from '../../utils/deepFreeze';

test('SET_QUIZ_DETAILS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const quiz_id = 1;
    const name = "week 1 quiz";
    const action = {
        type: 'SET_QUIZ_DETAILS',
        quiz_id,
        name
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { quiz_id, name });

    t.deepEqual(actual, expected);
});


test('START_QUIZ works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'START_QUIZ',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isQuizStarted: true });

    t.deepEqual(actual, expected);
});

test('END_QUIZ works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'END_QUIZ',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isQuizStarted: false });

    t.deepEqual(actual, expected);
});

test('SET_INTERVAL_ID works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(Object.assign({}, liveQuizState));
    const interval_id = 100;
    const action = {
        type: 'SET_INTERVAL_ID',
        interval_id
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { interval_id: 100 });

    t.deepEqual(actual, expected);
});

test('SET_NEXT_QUESTION works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(Object.assign({}, liveQuizState, { isResponseSubmitted: true }));

    const action = {
        type: 'SET_NEXT_QUESTION',
        nextQuestion
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isResponseSubmitted: false }, { questions: [nextQuestion] });

    t.deepEqual(actual, expected);
});

test('GO_TO_NEXT_QUESTION works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'GO_TO_NEXT_QUESTION',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { nextQuestionIndex: 1 });

    t.deepEqual(actual, expected);
});

test('GO_TO_PREVIOUS_QUESTION works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            liveQuizState,
            { nextQuestionIndex: 4 }
        )
    );

    const action = {
        type: 'GO_TO_PREVIOUS_QUESTION',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { nextQuestionIndex: 3 });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_QUESTIONS_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'GET_QUIZ_QUESTIONS_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isFetchingQuizQuestions: true });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_QUESTIONS_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            liveQuizState,
            { isFetchingQuizQuestions: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_QUESTIONS_SUCCESS',
        questions
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isFetchingQuizQuestions: false }, { questions });

    t.deepEqual(actual, expected);
});

test('GET_QUIZ_QUESTIONS_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            liveQuizState,
            { isFetchingQuizQuestions: true }
        )
    );
    const action = {
        type: 'GET_QUIZ_QUESTIONS_FAILURE',
        error
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isFetchingQuizQuestions: false }, { error });

    t.deepEqual(actual, expected);
});

test('SET_RESPONSE works', (t) => {

    t.plan(1);
    const data = 'a';
    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'SET_RESPONSE',
        data
    };
    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { response: data });

    t.deepEqual(actual, expected);
});

test('SAVE_RESPONSE_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'SAVE_RESPONSE_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isSavingResponse: true });

    t.deepEqual(actual, expected);
});

test('SAVE_RESPONSE_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            liveQuizState,
            { isSavingResponse: true }
        )
    );
    const action = {
        type: 'SAVE_RESPONSE_SUCCESS'
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isSavingResponse: false,  isResponseSubmitted: true });

    t.deepEqual(actual, expected);
});

test('SAVE_RESPONSE_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            liveQuizState,
            { isSavingResponse: true }
        )
    );
    const action = {
        type: 'SAVE_RESPONSE_FAILURE',
        error
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isSavingResponse: false }, { error });

    t.deepEqual(actual, expected);
});

test('UPDATE_NUM_PARTICIPANTS works', (t) => {

    t.plan(1);
    const numParticipants = 10;
    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'UPDATE_NUM_PARTICIPANTS',
        numParticipants
    };
    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { numParticipants });

    t.deepEqual(actual, expected);
});

//
// END QUIZ
//

test('END_QUIZ_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'END_QUIZ_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isEndingQuiz: true });

    t.deepEqual(actual, expected);
});

test('END_QUIZ_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'END_QUIZ_SUCCESS',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState);

    t.deepEqual(actual, expected);
});

test('END_QUIZ_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'END_QUIZ_FAILURE',
        error: endQuizError
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { error: endQuizError });

    t.deepEqual(actual, expected);
});

//
// ABORT QUIZ
//

test('ABORT_QUIZ_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'ABORT_QUIZ_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isAbortingQuiz: true });

    t.deepEqual(actual, expected);
});

test('ABORT_QUIZ_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'ABORT_QUIZ_SUCCESS',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState);

    t.deepEqual(actual, expected);
});

test('ABORT_QUIZ_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'ABORT_QUIZ_FAILURE',
        error: abortQuizError
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { error: abortQuizError });

    t.deepEqual(actual, expected);
});
