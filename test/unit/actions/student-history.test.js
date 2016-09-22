import test from 'tape';
import * as actions from '../../../src/js/actions/student-history';
import deepFreeze from '../../utils/deepFreeze';
import createThunk from '../../utils/mockThunk';
import { genericError as error } from '../../utils/action-fixtures';
import { studentHistory as data } from '../../utils/data-fixtures';


test('getStudentHistory async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    dispatch(actions.getStudentHistory());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_STUDENT_HISTORY_REQUEST
    };
    t.deepEqual(actual, expected);
});

test('`getStudentHistoryRequest` creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_STUDENT_HISTORY_REQUEST
    };
    const actual = deepFreeze(actions.getStudentHistoryRequest());
    t.deepEqual(actual, expected);
});

test('`getStudentHistorySuccess` creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_STUDENT_HISTORY_SUCCESS,
        data
    };
    const actual = deepFreeze(actions.getStudentHistorySuccess(data));
    t.deepEqual(actual, expected);
});

test('`getStudentHistoryFailure` creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_STUDENT_HISTORY_FAILURE,
        error
    };
    const actual = deepFreeze(actions.getStudentHistoryFailure(error));
    t.deepEqual(actual, expected);
});

test('`clearStudentHistory` creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.CLEAR_STUDENT_HISTORY
    };
    const actual = deepFreeze(actions.clearStudentHistory(error));
    t.deepEqual(actual, expected);
});
