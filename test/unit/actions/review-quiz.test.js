import test from 'tape';
import * as actions from '../../../src/js/actions/review-quiz';
import createThunk from '../../utils/mockThunk';
import deepFreeze from '../../utils/deepFreeze';
import { reviewQuizQuestions as questions } from '../../utils/data-fixtures';
import { getQuizReviewError as error } from '../../utils/action-fixtures';

test('getQuizReview async action creator returns expected action', (t) => {

    t.plan(1);

    let result;
    const { dispatch, queue } = createThunk();
    dispatch(actions.getQuizReview());

    [{ ...result }] = queue;

    const expected = {
        type: actions.GET_QUIZ_REVIEW_REQUEST
    };
    t.deepEqual(result, expected);
});

test('getQuizReviewRequest creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_REVIEW_REQUEST
    };

    const actual = deepFreeze(actions.getQuizReviewRequest());
    t.deepEqual(actual, expected);
});

test('getQuizReviewSuccess creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_REVIEW_SUCCESS,
        questions
    };

    const actual = deepFreeze(actions.getQuizReviewSuccess(questions));
    t.deepEqual(actual, expected);
});

test('getQuizReviewFailure creates the correct action', (t) => {
    t.plan(1);

    const expected = {
        type: actions.GET_QUIZ_REVIEW_FAILURE,
        error
    };

    const actual = deepFreeze(actions.getQuizReviewFailure(error));
    t.deepEqual(actual, expected);
});
