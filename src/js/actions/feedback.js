import request from '../lib/request.js';

export const GET_FEEDBACK_REQUEST = 'GET_FEEDBACK_REQUEST';
export const GET_FEEDBACK_SUCCESS = 'GET_FEEDBACK_SUCCESS';
export const GET_FEEDBACK_FAILURE = 'GET_FEEDBACK_FAILURE';

export const getFeedback = (module_id) => {

    return (dispatch) => {

        dispatch(getFeedbackRequest());

        request.get(dispatch)(`get-feedback?module_id=${module_id}`)
            .then((response) => {
                dispatch(getFeedbackSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getFeedbackFailure(error));
            });
    };
};

export const getFeedbackRequest = () => ({
    type: GET_FEEDBACK_REQUEST
});

export const getFeedbackSuccess = (data) => ({
    type: GET_FEEDBACK_SUCCESS,
    data
});

export const getFeedbackFailure = (error) => ({
    type: GET_FEEDBACK_FAILURE,
    error
});
