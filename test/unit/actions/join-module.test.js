import test from 'tape';
import * as actions from '../../../src/js/actions/join-module';
import deepFreeze from '../../utils/deepFreeze';

test('inputChange creates the correct action', (t) => {

    t.plan(1);
    const value = 'CS50';
    const expected = {
        type: actions.INPUT_CHANGE,
        value
    };
    const actual = deepFreeze(actions.inputChange(value));
    t.deepEqual(actual, expected);
});
