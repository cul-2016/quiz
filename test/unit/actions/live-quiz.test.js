import test from 'tape';
import * as actions from '../../../src/js/actions/live-quiz';
import deepFreeze from '../../utils/deepFreeze';


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

test('nextQuestion creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.NEXT_QUESTION
    };

    const actual = deepFreeze(actions.nextQuestion());
    t.deepEqual(actual, expected);
});

test('previousQuestion creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.PREVIOUS_QUESTION
    };

    const actual = deepFreeze(actions.previousQuestion());
    t.deepEqual(actual, expected);
});


test('saveIntervalID creates the correct action', (t) => {
    t.plan(1);
    const interval_id = 100;
    const expected = {
        type: actions.SAVE_INTERVAL_ID,
        interval_id
    };

    const actual = deepFreeze(actions.saveIntervalID(interval_id));
    t.deepEqual(actual, expected);
});
