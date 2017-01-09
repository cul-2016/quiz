import test from 'tape';
import { dashboard as dashboardState } from '../../utils/reducer-fixtures';
import { dashboardError as error } from '../../utils/action-fixtures';
import { dashboardData as data } from '../../utils/data-fixtures';
import reducer from '../../../src/js/reducers/dashboard';
import deepFreeze from '../../utils/deepFreeze';


test('GET_DASHBOARD_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(dashboardState);

    const action = {
        type: 'GET_DASHBOARD_REQUEST',
    };
    const expected = {
        isFetchingDashboard: true,
        data: [],
        error: undefined
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('GET_DASHBOARD_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(dashboardState);

    const action = {
        type: 'GET_DASHBOARD_SUCCESS',
        data
    };
    const expected = {
        isFetchingDashboard: false,
        data,
        error: undefined
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('GET_DASHBOARD_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(dashboardState);

    const action = {
        type: 'GET_DASHBOARD_FAILURE',
        error
    };
    const expected = {
        isFetchingDashboard: false,
        data: [],
        error
    };
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});
