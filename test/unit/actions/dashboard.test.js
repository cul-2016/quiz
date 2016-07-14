import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/dashboard';
import { dashboardError as error } from './action-fixtures';
import { dashboardData as data } from '../../utils/data-fixtures';
import deepFreeze from '../../utils/deepFreeze';


test('getDashboard async action creator returns expected action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.getDashboard());

    [{ ...actual }] = queue;

    const expected = {
        type: actions.GET_DASHBOARD_REQUEST,
        isFetchingDashboard: true
    };
    t.deepEqual(actual, expected);
});

test('getDashboardRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_DASHBOARD_REQUEST,
        isFetchingDashboard: true
    };
    const actual2 = deepFreeze(actions.getDashboardRequest());
    t.deepEqual(actual2, expected);
});

test('getDashboardSuccess creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_DASHBOARD_SUCCESS,
        isFetchingDashboard: false,
        data
    };
    const actual = deepFreeze(actions.getDashboardSuccess(data));
    t.deepEqual(actual, expected);
});

test('getDashboardFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.GET_DASHBOARD_FAILURE,
        isFetchingDashboard: false,
        error
    };
    const actual = deepFreeze(actions.getDashboardFailure(error));
    t.deepEqual(actual, expected);
});
