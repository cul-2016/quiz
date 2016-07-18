import test from 'tape';
import { newModule as newModuleState } from '../../../utils/reducer-fixtures';
// import { newModuleError as error } from '../actions/action-fixtures';
import reducer from '../../../../src/js/reducers/new-module';
import deepFreeze from '../../../utils/deepFreeze';


test('UPDATE_TROPHY_VALUES works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newModuleState);

    const action = {
        type: 'UPDATE_TROPHY_VALUES',
        trophy: 'high_score',
        value: 90
    };

    const expected = {
        module_id: undefined,
        name: undefined,
        medals: [39, 69],
        trophies: {
            trophy_name: [
                "participation",
                "overall_average",
                "high_score",
                "first_quiz"
            ],
            condition: [3, 60, 90, 1]
        }
    };

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});
