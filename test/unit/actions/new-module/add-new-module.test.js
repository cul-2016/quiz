import test from 'tape';
import createThunk from '../../../utils/mockThunk';
import * as actions from '../../../../src/js/actions/new-module';
import { validateModuleIDError as error } from '../../../utils/action-fixtures';
import * as data from '../../../utils/data-fixtures';
import deepFreeze from '../../../utils/deepFreeze';


test('addNewModule creates the correct async action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();

    let module = Object.assign({}, data.dashboardData[0], { medals: data.medals }, { trophies: data.trophies });
    
    dispatch(actions.addNewModule(module));

    [{...actual}] = queue;

    const expected = {
        type: actions.ADD_NEW_MODULE_REQUEST,
    };

    t.deepEqual(actual, expected);
});

test('addNewModuleRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.ADD_NEW_MODULE_REQUEST
    };

    const actual = deepFreeze(actions.addNewModuleRequest());
    t.deepEqual(actual, expected);
});

test('addNewModuleSuccess creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.ADD_NEW_MODULE_SUCCESS,
    };
    const actual = deepFreeze(actions.addNewModuleSuccess(true));
    t.deepEqual(actual, expected);
});

test('addNewModuleFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.ADD_NEW_MODULE_FAILURE,
        error
    };
    const actual = deepFreeze(actions.addNewModuleFailure(error));
    t.deepEqual(actual, expected);
});
