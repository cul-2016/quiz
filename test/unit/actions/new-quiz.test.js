import test from 'tape';
import * as actions from '../../../src/js/actions/new-quiz';
import { dashboardData as data } from '../../utils/data-fixtures';
import deepFreeze from '../../utils/deepFreeze';

test('addQuestion action creator returns the expected action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.ADD_QUESTION
    };

    const actual = deepFreeze(actions.addQuestion());
    t.deepEqual(actual, expected);
});

test('updateValue action creator returns the exected action', (t) => {

    t.plan(1);
    const inputType = 'question';
    const value = 'Capital of England';
    const index = 0;
    const expected = {
        type: actions.UPDATE_VALUE,
        inputType,
        value,
        index
    };

    const actual = deepFreeze(actions.updateValue(inputType, value, index));
    t.deepEqual(actual, expected);
});

test('updateQuizName action creator returns the exected action', (t) => {

    t.plan(1);
    const value = 'Week 1';
    const expected = {
        type: actions.UPDATE_QUIZ_NAME,
        value
    };

    const actual = deepFreeze(actions.updateQuizName(value));
    t.deepEqual(actual, expected);
});
