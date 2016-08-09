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

test('endQuiz creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.END_QUIZ,
    };

    const actual = deepFreeze(actions.endQuiz());
    t.deepEqual(actual, expected);
});
