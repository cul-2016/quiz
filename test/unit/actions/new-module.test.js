import test from 'tape';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/new-module';
import deepFreeze from '../../utils/deepFreeze';


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
