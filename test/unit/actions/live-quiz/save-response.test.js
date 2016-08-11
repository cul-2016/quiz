import test from 'tape';
import * as actions from '../../../../src/js/actions/live-quiz';
import createThunk from '../../../utils/mockThunk';
import deepFreeze from '../../../utils/deepFreeze';
import { saveResponseError as error } from '../../../utils/action-fixtures';

test('saveResponse async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.saveResponse());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.SAVE_RESPONSE_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('saveResponseRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.SAVE_RESPONSE_REQUEST
    };

    const actual2 = deepFreeze(actions.saveResponseRequest());
    t.deepEqual(actual2, expected);
});

test('saveResponseSuccess creates the correct action', (t) => {

    t.plan(1);
    const expected = {
        type: actions.SAVE_RESPONSE_SUCCESS
    };

    const actual2 = deepFreeze(actions.saveResponseSuccess());
    t.deepEqual(actual2, expected);
});

test('saveResponseFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.SAVE_RESPONSE_FAILURE,
        error
    };
    const actual = deepFreeze(actions.saveResponseFailure(error));
    t.deepEqual(actual, expected);
});
