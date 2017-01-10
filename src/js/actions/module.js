import request from '../lib/request.js';

export const OPEN_QUIZ = 'OPEN_QUIZ';
export const CLOSE_QUIZ = 'CLOSE_QUIZ';
export const CLEAR_MODULE_STATE = 'CLEAR_MODULE_STATE';

export const GET_MODULE_REQUEST = 'GET_MODULE_REQUEST';
export const GET_MODULE_SUCCESS = 'GET_MODULE_SUCCESS';
export const GET_MODULE_FAILURE = 'GET_MODULE_FAILURE';

export const GET_MODULE_MEMBERS_REQUEST = 'GET_MODULE_MEMBERS_REQUEST';
export const GET_MODULE_MEMBERS_SUCCESS = 'GET_MODULE_MEMBERS_SUCCESS';
export const GET_MODULE_MEMBERS_FAILURE = 'GET_MODULE_MEMBERS_FAILURE';

export const REMOVE_MODULE_MEMBER_REQUEST = 'REMOVE_MODULE_MEMBER_REQUEST';
export const REMOVE_MODULE_MEMBER_SUCCESS = 'REMOVE_MODULE_MEMBER_SUCCESS';
export const REMOVE_MODULE_MEMBER_FAILURE = 'REMOVE_MODULE_MEMBER_FAILURE';

/****
 * OPEN/CLOSE QUIZ
 ****/

export const openQuiz = () => ( {
    type: OPEN_QUIZ
});

export const closeQuiz = () => ({
    type: CLOSE_QUIZ
});

export const clearModuleState = () => ({
    type: CLEAR_MODULE_STATE
});


//
// GET MODULE actions
//

export const getModule = (module_id, is_lecturer) => {
    return (dispatch) => {

        dispatch(getModuleRequest());

        request.get(dispatch)(`get-module?is_lecturer=${is_lecturer}&module_id=${module_id}`)
            .then((response) => {
                dispatch(getModuleSuccess(is_lecturer, response.data));
            })
            .catch((error) => {
                dispatch(getModuleFailure(error));
            });
    };
};

export const getModuleRequest = () => ({
    type: GET_MODULE_REQUEST
});

export const getModuleSuccess = (is_lecturer, data) => ({
    type: GET_MODULE_SUCCESS,
    is_lecturer,
    data
});

export const getModuleFailure = (error) => ({
    type: GET_MODULE_FAILURE,
    error
});

//
// GET MODULE MEMBERS actions
//

export const getModuleMembers = (module_id) => {
    return (dispatch) => {

        dispatch(getModuleMembersRequest());

        request.get(dispatch)(`get-module-members?module_id=${module_id}`)
            .then((response) => {
                dispatch(getModuleMembersSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getModuleMembersFailure(error));
            });
    };
};

export const getModuleMembersRequest = () => ({
    type: GET_MODULE_MEMBERS_REQUEST
});

export const getModuleMembersSuccess = (data) => ({
    type: GET_MODULE_MEMBERS_SUCCESS,
    data
});

export const getModuleMembersFailure = (error) => ({
    type: GET_MODULE_MEMBERS_FAILURE,
    error
});


//
// REMOVE_MODULE_MEMBER actions
//

export const removeModuleMember = (module_id) => {
    return (dispatch) => {

        dispatch(removeModuleMemberRequest());

        request.get(dispatch)(`remove-module-member?module_id=${module_id}`)
            .then(() => {
                dispatch(removeModuleMemberSuccess());
                dispatch(getModuleMembers(module_id));
            })
            .catch((error) => {
                dispatch(removeModuleMemberFailure(error));
            });
    };
};

export const removeModuleMemberRequest = () => ({
    type: REMOVE_MODULE_MEMBER_REQUEST
});

export const removeModuleMemberSuccess = () => ({
    type: REMOVE_MODULE_MEMBER_SUCCESS,
});

export const removeModuleMemberFailure = (error) => ({
    type: REMOVE_MODULE_MEMBER_FAILURE,
    error
});
