import test from 'tape';
import { dashboard as dashboardState } from './fixtures';
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
        data: []
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
    t.end();
});
