import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/new-module';
import { validateModuleIDError as error } from '../../utils/action-fixtures';
import deepFreeze from '../../utils/deepFreeze';


test('validateModuleID creates the correct async action', (t) => {

    t.plan(1);

    let actual;
    const { dispatch, queue } = createThunk();
    dispatch(actions.validateModuleID('1'));

    [{...actual}] = queue;

    const expected = {
        type: actions.VALIDATE_MODULE_ID_REQUEST,
    };

    t.deepEqual(actual, expected);
});

test('validateModuleIDRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.VALIDATE_MODULE_ID_REQUEST
    };
    const actual = deepFreeze(actions.validateModuleIDRequest());
    t.deepEqual(actual, expected);
});

test('validateModuleIDSuccess creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.VALIDATE_MODULE_ID_SUCCESS,
        moduleIDExists: true
    };
    const actual = deepFreeze(actions.validateModuleIDSuccess(true));
    t.deepEqual(actual, expected);
});

test('validateModuleIDFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.VALIDATE_MODULE_ID_FAILURE,
        error
    };
    const actual = deepFreeze(actions.validateModuleIDFailure(error));
    t.deepEqual(actual, expected);
});

test('updateMedalValues creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_MEDAL_VALUES,
        medal: 'bronze',
        value: 10
    };
    const actual = deepFreeze(actions.updateMedalValues('bronze', 10));
    t.deepEqual(actual, expected);
});

test('updateTrophyValues creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.UPDATE_TROPHY_VALUES,
        trophy: 'high_score',
        value: 90
    };
    const actual = deepFreeze(actions.updateTrophyValues('high_score', 90));
    t.deepEqual(actual, expected);
});
