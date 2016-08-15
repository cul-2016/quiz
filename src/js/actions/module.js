import axios from 'axios';

export const OPEN_QUIZ = 'OPEN_QUIZ';
export const CLOSE_QUIZ = 'CLOSE_QUIZ';

export const GET_MODULE_REQUEST = 'GET_MODULE_REQUEST';
export const GET_MODULE_SUCCESS = 'GET_MODULE_SUCCESS';
export const GET_MODULE_FAILURE = 'GET_MODULE_FAILURE';

export const GET_MODULE_USERS_REQUEST = 'GET_MODULE_USERS_REQUEST';
export const GET_MODULE_USERS_SUCCESS = 'GET_MODULE_USERS_SUCCESS';
export const GET_MODULE_USERS_FAILURE = 'GET_MODULE_USERS_FAILURE';

export const REMOVE_USER_FROM_MODULE_REQUEST = 'REMOVE_USER_FROM_MODULE_REQUEST';
export const REMOVE_USER_FROM_MODULE_SUCCESS = 'REMOVE_USER_FROM_MODULE_SUCCESS';
export const REMOVE_USER_FROM_MODULE_FAILURE = 'REMOVE_USER_FROM_MODULE_FAILURE';

/****
 * OPEN/CLOSE QUIZ
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

//
// GET MODULE USERS actions
//

export const getModuleUsers = (module_id) => {
    return (dispatch) => {

        dispatch(getModuleUsersRequest());

        axios.get(`get-module-users?module_id=${module_id}`)
            .then((response) => {

                dispatch(getModuleUsersSuccess(response.data));
            }, (error) => {
                console.error(error, 'error from server');
            })
            .catch((error) => {
                dispatch(getModuleUsersFailure(error));
            });
    };
};

export const getModuleUsersRequest = () => ({
    type: GET_MODULE_USERS_REQUEST
});

export const getModuleUsersSuccess = (data) => ({
    type: GET_MODULE_USERS_SUCCESS,
    data
});

export const getModuleUsersFailure = (error) => ({
    type: GET_MODULE_USERS_FAILURE,
    error
});


//
// REMOVE_USER_FROM_MODULE actions
//

export const removeUserFromModule = (module_id, user_id) => {
    return (dispatch) => {

        dispatch(removeUserFromModuleRequest());

        axios.get(`remove-user-from-module?module_id=${module_id}&user_id=${user_id}`)
            .then(() => {

                dispatch(removeUserFromModuleSuccess());
                dispatch(getModuleUsers(module_id));
            }, (error) => {
                console.error(error, 'error from server');
            })
            .catch((error) => {
                dispatch(removeUserFromModuleFailure(error));
            });
    };
};

export const removeUserFromModuleRequest = () => ({
    type: REMOVE_USER_FROM_MODULE_REQUEST
});

export const removeUserFromModuleSuccess = () => ({
    type: REMOVE_USER_FROM_MODULE_SUCCESS,
});

export const removeUserFromModuleFailure = (error) => ({
    type: REMOVE_USER_FROM_MODULE_FAILURE,
    error
});
