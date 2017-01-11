import request from '../lib/request.js';

export const GET_STUDENT_HISTORY_REQUEST = 'GET_STUDENT_HISTORY_REQUEST';
export const GET_STUDENT_HISTORY_SUCCESS = 'GET_STUDENT_HISTORY_SUCCESS';
export const GET_STUDENT_HISTORY_FAILURE = 'GET_STUDENT_HISTORY_FAILURE';
export const CLEAR_STUDENT_HISTORY = 'CLEAR_STUDENT_HISTORY';

export const getStudentHistory = (module_id) => (dispatch) => {

    dispatch(getStudentHistoryRequest());

    request.get(dispatch)(`get-student-history?module_id=${module_id}`)
        .then((response) => {
            dispatch(getStudentHistorySuccess(response.data));
        })
        .catch((error) => {
            dispatch(getStudentHistoryFailure(error));
        });
};

export const getStudentHistoryRequest = () => ({
    type: GET_STUDENT_HISTORY_REQUEST
});

export const getStudentHistorySuccess = (data) => ({
    type: GET_STUDENT_HISTORY_SUCCESS,
    data
});

export const getStudentHistoryFailure = (error) => ({
    type: GET_STUDENT_HISTORY_FAILURE,
    error
});

export const clearStudentHistory = () => ({
    type: CLEAR_STUDENT_HISTORY
});
