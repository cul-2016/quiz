import test from 'tape';
import {
    initialState as newQuizState,
    newQuiz as reducer
} from '../../../src/js/reducers/new-quiz.js';
import {
    newQuizWithQuestion as newQuizStateWithQuestion,
    editQuizWithQuestion as editQuizWithQuestionState
} from '../../utils/reducer-fixtures';
import { getQuizDetailsData } from '../../utils/data-fixtures';

import { saveQuizError as error, getQuizDetailsError } from '../../utils/action-fixtures';
import deepFreeze from '../../utils/deepFreeze';

test('ADD_QUESTION works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'ADD_QUESTION'
    };

    const expected = Object.assign({}, newQuizState,
        {
            questions: [{
                question: undefined,
                a: undefined,
                b: undefined,
                c: undefined,
                d: undefined,
                correct_answer: undefined
            }]
        }
    );

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('DELETE_QUESTION works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(editQuizWithQuestionState);
    const action = {
        type: 'DELETE_QUESTION',
        index: 0
    };

    const expected = Object.assign({}, newQuizState, { questions: [], deletedQuestions: [1] });
    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_VALUE works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizStateWithQuestion);
    const inputType = 'question';
    const value = 'capital of England?';
    const index = 0;
    const action = {
        type: 'UPDATE_VALUE',
        inputType,
        value,
        index
    };

    const expected = Object.assign({}, newQuizStateWithQuestion,
        {
            questions: [{
                question: 'capital of England?',
                a: undefined,
                b: undefined,
                c: undefined,
                d: undefined,
                correct_answer: undefined
            }]
        }
     );

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);

});

test('UPDATE_QUIZ_NAME works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const value = 'Week 1';
    const action = {
        type: 'UPDATE_QUIZ_NAME',
        value
    };

    const expected = Object.assign({}, newQuizState, { name: 'Week 1' });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('CLEAR_NEW_QUIZ_STATE works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'CLEAR_NEW_QUIZ_STATE'
    };

    const expected = newQuizState;

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('TOGGLE_IS_LAST_QUIZ works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'TOGGLE_IS_LAST_QUIZ'
    };

    const expected = Object.assign({}, newQuizState, { is_last_quiz: true });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('TOGGLE_IS_SURVEY works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const isSurvey = true;
    const action = {
        type: 'TOGGLE_IS_SURVEY',
        isSurvey
    };

    const expected = Object.assign({}, newQuizState, { isSurvey });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
// -----
// SAVE QUIZ
// -----

test('SAVE_QUIZ_REQUEST works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'SAVE_QUIZ_REQUEST'
    };
    const expected = Object.assign({}, newQuizState, { isSavingQuiz: true });
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('SAVE_QUIZ_SUCCESS works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const data = true;
    const action = {
        type: 'SAVE_QUIZ_SUCCESS',
        data
    };
    const expected = Object.assign({}, newQuizState, { isSavingQuiz: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('SAVE_QUIZ_FAILURE works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'SAVE_QUIZ_FAILURE',
        error
    };
    const expected = Object.assign({}, newQuizState, { isSavingQuiz: false, error: error });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});


// -----
// UPDATE QUIZ
// -----

test('UPDATE_QUIZ_REQUEST works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'UPDATE_QUIZ_REQUEST'
    };
    const expected = Object.assign({}, newQuizState, { isUpdatingQuiz: true });
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('UPDATE_QUIZ_SUCCESS works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const data = true;
    const action = {
        type: 'UPDATE_QUIZ_SUCCESS',
        data
    };
    const expected = Object.assign({}, newQuizState, { isUpdatingQuiz: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('UPDATE_QUIZ_FAILURE works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'UPDATE_QUIZ_FAILURE',
        error
    };
    const expected = Object.assign({}, newQuizState, { isUpdatingQuiz: false, error: error });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

// -----
// GET QUIZ DETAILS QUIZ
// -----

test('GET_QUIZ_DETAILS_REQUEST works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'GET_QUIZ_DETAILS_REQUEST'
    };
    const expected = Object.assign({}, newQuizState, { isFetchingQuizDetails: true });
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_QUIZ_DETAILS_SUCCESS works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'GET_QUIZ_DETAILS_SUCCESS',
        data: getQuizDetailsData
    };
    const expected = Object.assign({}, newQuizState, { isFetchingQuizDetails: false }, {  name: 'Old Quiz', is_last_quiz: false,
        questions: [
            {
                question: 'capital of England',
                a: 'London',
                b: 'Tokyo',
                c: 'New York',
                d: 'Paris',
                correct_answer: 'a'
            }
        ] });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_QUIZ_DETAILS_FAILURE works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'GET_QUIZ_DETAILS_FAILURE',
        error: getQuizDetailsError
    };
    const expected = Object.assign({}, newQuizState, { isFetchingQuizDetails: false, error: getQuizDetailsError });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
