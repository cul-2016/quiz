import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/dashboard';


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
    const actual = actions.getDashboardRequest();
    t.deepEqual(actual, expected);
});
