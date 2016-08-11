import test from 'tape';
import * as actions from '../../../../src/js/actions/live-quiz';
import deepFreeze from '../../../utils/deepFreeze';
import { nextQuestion } from '../../../utils/data-fixtures';



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
