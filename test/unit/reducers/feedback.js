import test from 'tape';
import { initialState as feedbackState } from '../../../src/js/reducers/feedback';
import { getFeedbackError as error } from '../../utils/action-fixtures';
import { feedback as reducer } from '../../../src/js/reducers/feedback';
import { feedback as data } from '../../utils/data-fixtures';
import deepFreeze from '../../utils/deepFreeze';

//
// GET LEADERBOARD
//

test('GET_FEEDBACK_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(feedbackState);
    const action = {
        type: 'GET_FEEDBACK_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, feedbackState, { isFetchingFeedback: true });

    t.deepEqual(actual, expected);
});

test('GET_FEEDBACK_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            feedbackState,
            { isFetchingFeedback: true }
        )
    );
    const action = {
        type: 'GET_FEEDBACK_SUCCESS',
        data
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, feedbackState, { isFetchingFeedback: false }, { overallScore: data.overallScore, quizzesCompleted: data.quizzesCompleted });

    t.deepEqual(actual, expected);
});

test('GET_FEEDBACK_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            feedbackState,
            { isFetchingFeedback: true }
        )
    );
    const action = {
        type: 'GET_FEEDBACK_FAILURE',
        error
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, feedbackState, { isFetchingFeedback: false }, { error });

    t.deepEqual(actual, expected);
});
