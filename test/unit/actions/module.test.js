import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/module';
import { getModuleError as error } from '../../utils/action-fixtures';
import deepFreeze from '../../utils/deepFreeze';
import { module as data } from '../../utils/data-fixtures';

test('getModule async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.getModule());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_MODULE_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('getModuleRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_MODULE_REQUEST
    }

    const actual = deepFreeze(actions.getModuleRequest());
    t.deepEqual(actual, expected);
});

test('getModuleSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.GET_MODULE_SUCCESS,
        data
    }

    const actual = deepFreeze(actions.getModuleSuccess(data));
    t.deepEqual(actual, expected);
});

test('getModuleFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_MODULE_FAILURE,
        error
    };

    const actual = deepFreeze(actions.getModuleFailure(error));
    t.deepEqual(actual, expected);
});

test('activateQuiz creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.ACTIVATE_QUIZ
    };

    const actual = deepFreeze(actions.activateQuiz());
    t.deepEqual(actual, expected);
});

test('deactivateQuiz creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.DEACTIVATE_QUIZ
    };

    const actual = deepFreeze(actions.deactivateQuiz());
    t.deepEqual(actual, expected);
});
