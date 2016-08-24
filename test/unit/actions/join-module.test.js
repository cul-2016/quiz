import test from 'tape';
import * as actions from '../../../src/js/actions/join-module';
import deepFreeze from '../../utils/deepFreeze';
import createThunk from '../../utils/mockThunk';
import { joinModuleError } from '../../utils/action-fixtures';


test('inputChange creates the correct action', (t) => {

    t.plan(1);
    const value = 'CS50';
    const expected = {
        type: actions.INPUT_CHANGE,
        value
    };
    const actual = deepFreeze(actions.inputChange(value));
    t.deepEqual(actual, expected);
});

test('joinModule async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.joinModule());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.JOIN_MODULE_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('joinModuleRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.JOIN_MODULE_REQUEST
    };

    const actual = deepFreeze(actions.joinModuleRequest());
    t.deepEqual(actual, expected);
});

test('joinModuleSuccess creates the correct action', (t) => {
    t.plan(1);
    const expected = {
        type: actions.JOIN_MODULE_SUCCESS,
    };

    const actual = deepFreeze(actions.joinModuleSuccess());
    t.deepEqual(actual, expected);
});

test('joinModuleFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.JOIN_MODULE_FAILURE,
        error: joinModuleError
    };

    const actual = deepFreeze(actions.joinModuleFailure(joinModuleError));
    t.deepEqual(actual, expected);
});
