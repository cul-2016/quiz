import test from 'tape';
import { liveQuiz as liveQuizState } from '../../utils/reducer-fixtures';
import reducer from '../../../src/js/reducers/live-quiz';
import deepFreeze from '../../utils/deepFreeze';

test('SET_QUIZ_ID works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(liveQuizState);
    const quiz_id = 1;
    const action = {
        type: 'SET_QUIZ_ID',
        quiz_id
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { quiz_id });

    t.deepEqual(actual, expected);
});
