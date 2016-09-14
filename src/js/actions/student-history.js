import axios from 'axios';

export const GET_STUDENT_HISTORY_REQUEST = 'GET_STUDENT_HISTORY_REQUEST';
export const GET_STUDENT_HISTORY_SUCCESS = 'GET_STUDENT_HISTORY_SUCCESS';
export const GET_STUDENT_HISTORY_FAILURE = 'GET_STUDENT_HISTORY_FAILURE';

export const getStudentHistory = (user_id, module_id) => {

    return (dispatch) => {

        dispatch(getStudentHistoryRequest());

        axios.get(`get-student-history?user_id=${user_id}&module_id=${module_id}`)
            .then((response) => {
                dispatch(getStudentHistorySuccess(response.data));
            }, (error) => {
                console.error(error, 'error from /get-student-history');
            })
            .catch((error) => {
                dispatch(getStudentHistoryFailure(error));
            });
    };
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
