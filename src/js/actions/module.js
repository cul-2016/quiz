import axios from 'axios';

export const OPEN_QUIZ = 'OPEN_QUIZ';
export const CLOSE_QUIZ = 'CLOSE_QUIZ';

export const GET_MODULE_REQUEST = 'GET_MODULE_REQUEST';
export const GET_MODULE_SUCCESS = 'GET_MODULE_SUCCESS';
export const GET_MODULE_FAILURE = 'GET_MODULE_FAILURE';

export const GET_MODULE_USERS_REQUEST = 'GET_MODULE_USERS_REQUEST';
export const GET_MODULE_USERS_SUCCESS = 'GET_MODULE_USERS_SUCCESS';
export const GET_MODULE_USERS_FAILURE = 'GET_MODULE_USERS_FAILURE';

export const REMOVE_MODULE_MEMBERS_REQUEST = 'REMOVE_MODULE_MEMBERS_REQUEST';
export const REMOVE_MODULE_MEMBERS_SUCCESS = 'REMOVE_MODULE_MEMBERS_SUCCESS';
export const REMOVE_MODULE_MEMBERS_FAILURE = 'REMOVE_MODULE_MEMBERS_FAILURE';

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
// REMOVE_MODULE_MEMBERS actions
//

export const removeModuleMembers = (module_id, user_id) => {
    return (dispatch) => {

        dispatch(removeModuleMembersRequest());

        axios.get(`remove-module-members?module_id=${module_id}&user_id=${user_id}`)
            .then(() => {

                dispatch(removeModuleMembersSuccess());
                dispatch(getModuleUsers(module_id));
            }, (error) => {
                console.error(error, 'error from server');
            })
            .catch((error) => {
                dispatch(removeModuleMembersFailure(error));
            });
    };
};

export const removeModuleMembersRequest = () => ({
    type: REMOVE_MODULE_MEMBERS_REQUEST
});

export const removeModuleMembersSuccess = () => ({
    type: REMOVE_MODULE_MEMBERS_SUCCESS,
});

export const removeModuleMembersFailure = (error) => ({
    type: REMOVE_MODULE_MEMBERS_FAILURE,
    error
});
