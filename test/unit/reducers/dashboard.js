import test from 'tape';
import { dashboard as dashboardState } from './reducer-fixtures';
import { dashboardData as data, dashboardError as error } from '../actions/action-fixtures';
import reducer from '../../../src/js/reducers/dashboard';
import deepFreeze from '../../utils/deepFreeze';


test('GET_DASHBOARD_REQUEST works', (t) => {

    const initialState = deepFreeze(dashboardState);

    const action = {
        type: 'GET_DASHBOARD_REQUEST',
        isFetchingDashboard: true
    };
    const expected = {
        isFetchingDashboard: true,
        data: [],
        error: undefined
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
    t.end();
});

test('GET_DASHBOARD_SUCCESS works', (t) => {

    const initialState = deepFreeze(dashboardState);

    const action = {
        type: 'GET_DASHBOARD_SUCCESS',
        isFetchingDashboard: false,
        data
    };
    const expected = {
        isFetchingDashboard: false,
        data,
        error: undefined
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
    t.end();
});

test('GET_DASHBOARD_FAILURE works', (t) => {

    const initialState = deepFreeze(dashboardState);

    const action = {
        type: 'GET_DASHBOARD_FAILURE',
        isFetchingDashboard: false,
        error
    };
    const expected = {
        isFetchingDashboard: false,
        data: [],
        error
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
    t.end();
});
