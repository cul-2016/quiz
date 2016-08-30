import axios from 'axios';

export const OPEN_QUIZ = 'OPEN_QUIZ';
export const CLOSE_QUIZ = 'CLOSE_QUIZ';

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
    type: OPEN_QUIZ,
});

export const closeQuiz = () => ({
    type: CLOSE_QUIZ,
});


//
// GET MODULE actions
//

export const getModule = (module_id, is_lecturer, user_id) => {
    return (dispatch) => {

        dispatch(getModuleRequest());

        axios.get(`get-module?module_id=${module_id}&is_lecturer=${is_lecturer}&user_id=${user_id}`)
            .then((response) => {
                dispatch(getModuleSuccess(is_lecturer, response.data));
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

        axios.get(`get-module-members?module_id=${module_id}`)
            .then((response) => {

                dispatch(getModuleMembersSuccess(response.data));
            }, (error) => {
                console.error(error, 'error from server');
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

export const removeModuleMember = (module_id, user_id) => {
    return (dispatch) => {

        dispatch(removeModuleMemberRequest());

        axios.get(`remove-module-member?module_id=${module_id}&user_id=${user_id}`)
            .then(() => {

                dispatch(removeModuleMemberSuccess());
                dispatch(getModuleMembers(module_id));
            }, (error) => {
                console.error(error, 'error from server');
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
