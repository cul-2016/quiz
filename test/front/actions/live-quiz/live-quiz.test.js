import test from 'tape';
import * as actions from '../../../../src/js/actions/live-quiz';
import deepFreeze from '../../../utils/deepFreeze';
import { nextQuestion } from '../../../utils/data-fixtures';



test('setQuizDetails creates the correct action', (t) => {
    t.plan(1);
    const quiz_id = 1;
    const name = "week 1 quiz";
    const expected = {
        type: actions.SET_QUIZ_DETAILS,
        quiz_id,
        name
    };

    const actual = deepFreeze(actions.setQuizDetails(quiz_id, name));
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

test('updateNumParticipants creates the correct action', (t) => {
    t.plan(1);
    const numParticipants = 10;
    const expected = {
        type: actions.UPDATE_NUM_PARTICIPANTS,
        numParticipants
    };

    const actual = deepFreeze(actions.updateNumParticipants(numParticipants));
    t.deepEqual(actual, expected);
});

test('setIsSurvey creates the correct action', (t) => {
    t.plan(1);
    let quiz_id;
    const survey_id = 1;
    const expected = {
        type: actions.SET_IS_SURVEY,
        isSurvey: true
    };

    const actual = deepFreeze(actions.setIsSurvey(quiz_id, survey_id));
    t.deepEqual(actual, expected);
});
