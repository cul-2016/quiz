import axios from 'axios';

export const ACTIVATE_QUIZ = 'ACTIVATE_QUIZ';
export const DEACTIVATE_QUIZ = 'DEACTIVATE_QUIZ';

export const GET_MODULE_REQUEST = 'GET_MODULE_REQUEST';
export const GET_MODULE_SUCCESS = 'GET_MODULE_SUCCESS';
export const GET_MODULE_FAILURE = 'GET_MODULE_FAILURE';

//
// ACTIVATE/DEACTIVATE QUIZ
//

export const activateQuiz = () => ({
    type: ACTIVATE_QUIZ,
});

export const deactivateQuiz = () => ({
    type: DEACTIVATE_QUIZ,
});


//
// GET MODULE actions
//

export const getModule = (module_id) => {
    return (dispatch) => {

        dispatch(getModuleRequest());

        axios.get(`get-module?module_id=${module_id}`)
            .then((response) => {

                dispatch(getModuleSuccess(response.data));
            }, (error) => {
                console.error(error, 'error from server');
            })
            .catch((error) => {
                dispatch(getModuleFailure(error));
            });
    };
};

export const getModuleRequest = () => ({
    type: GET_MODULE_REQUEST
});

export const getModuleSuccess = (data) => ({
    type: GET_MODULE_SUCCESS,
    data
});

export const getModuleFailure = (error) => ({
    type: GET_MODULE_FAILURE,
    error
});
