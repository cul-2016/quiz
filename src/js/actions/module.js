import axios from 'axios';

export const OPEN_QUIZ = 'OPEN_QUIZ';
export const CLOSE_QUIZ = 'CLOSE_QUIZ';

export const GET_MODULE_REQUEST = 'GET_MODULE_REQUEST';
export const GET_MODULE_SUCCESS = 'GET_MODULE_SUCCESS';
export const GET_MODULE_FAILURE = 'GET_MODULE_FAILURE';

/****
 * OPEN/CLOSE QUIX
 ****/

export const openQuiz = () => ( {
    type: OPEN_QUIZ,
});

export const closeQuiz = () => ({
    type: CLOSE_QUIZ,
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
