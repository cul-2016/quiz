import test from 'tape';
import * as actions from '../../../../src/js/actions/live-quiz';
import createThunk from '../../../utils/mockThunk';
import deepFreeze from '../../../utils/deepFreeze';
import { LiveQuizQuestions as questions } from '../../../utils/data-fixtures';
import { getQuizQuestionsError as error } from '../../../utils/action-fixtures';

test('getQuizQuestions async action creator returns expected action', (t) => {

    t.plan(1);

    let result;
    const { dispatch, queue } = createThunk();
    dispatch(actions.getQuizQuestions());

    [{ ...result }] = queue;

    const expected = {
        type: actions.GET_QUIZ_QUESTIONS_REQUEST
    };
    t.deepEqual(result, expected);
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
        error
    };

    const actual = deepFreeze(actions.getQuizQuestionsFailure(error));
    t.deepEqual(actual, expected);
});
