import update from 'react-addons-update';
import * as actionsTypes from '../actions/student-history';


export const initialState = {
    history: [],
    isFetchingStudentHistory: false,
    error: undefined
};

export function studentHistory (state = initialState, action) {

    switch (action.type) {

    case actionsTypes.GET_STUDENT_HISTORY_REQUEST:
        return update(state, {
            isFetchingStudentHistory: { $set: true }
        });

    case actionsTypes.GET_STUDENT_HISTORY_SUCCESS:
        return update(state, {
            isFetchingStudentHistory: { $set: false },
            history: { $set: action.data },
        });

    case actionsTypes.GET_STUDENT_HISTORY_FAILURE:
        return update(state, {
            isFetchingStudentHistory: { $set: false },
            error: { $set: action.error }
        });

    default:
        return state;
    }
}
