import test from 'tape';
import { initialState as studentHistoryState } from '../../../src/js/reducers/student-history';
import { studentHistory as reducer } from '../../../src/js/reducers/student-history';
import { genericError as error } from '../../utils/action-fixtures';
import { studentHistoryData as data } from '../../utils/data-fixtures';
import deepFreeze from '../../utils/deepFreeze';


test('GET_STUDENT_HISTORY_REQUEST works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(studentHistoryState);
    const action = {
        type: 'GET_STUDENT_HISTORY_REQUEST',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({},
        studentHistoryState,
        { isFetchingStudentHistory: true }
    );

    t.deepEqual(actual, expected);
});

test('GET_STUDENT_HISTORY_SUCCESS works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign({},
            studentHistoryState,
            { isFetchingStudentHistory: true }
        )
    );
    const action = {
        type: 'GET_STUDENT_HISTORY_SUCCESS',
        data
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({},
                        studentHistoryState,
                        { isFetchingStudentHistory: false },
                        { history: data }
                    );

    t.deepEqual(actual, expected);
});

test('GET_STUDENT_HISTORY_FAILURE works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign({},
            studentHistoryState,
            { isFetchingStudentHistory: true }
        )
    );
    const action = {
        type: 'GET_STUDENT_HISTORY_FAILURE',
        error
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({},
        studentHistoryState,
        { isFetchingStudentHistory: false },
        { error }
    );

    t.deepEqual(actual, expected);
});
