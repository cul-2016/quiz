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

export const GENERATE_SHARE_ID_REQUEST = 'GENERATE_SHARE_ID_REQUEST';
export const GENERATE_SHARE_ID_SUCCESS = 'GENERATE_SHARE_ID_SUCCESS';
export const GENERATE_SHARE_ID_FAILURE = 'GENERATE_SHARE_ID_FAILURE';

export const openQuiz = () => ( {
    type: OPEN_QUIZ
});

export const closeQuiz = () => ({
    type: CLOSE_QUIZ
});

export const clearModuleState = () => ({
    type: CLEAR_MODULE_STATE
});

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

export const removeModuleMember = (user_id, module_id) => {
    return (dispatch) => {

        dispatch(removeModuleMemberRequest());

        request.get(dispatch)(`remove-module-member?user_id=${user_id}&module_id=${module_id}`)
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

export const generateShareId = (quiz_id, survey_id) => {
    // let isQuiz = typeof quiz_id !== 'undefined';
    return (dispatch) => {
        console.log('quiz id', quiz_id);
        console.log('survey id', survey_id);
        dispatch(generateShareIdRequest());

        request.get(dispatch)(`generate-share-id?quiz_id=${quiz_id}&survey_id=${survey_id}`)
            .then(() => {
                dispatch(generateShareIdSuccess());
            })
            .catch((error) => {
                dispatch(generateShareIdFailure(error));
            });
    };
};

export const generateShareIdRequest = () => ({
    type: GENERATE_SHARE_ID_REQUEST
});

export const generateShareIdSuccess = () => ({
    type: GENERATE_SHARE_ID_SUCCESS
});

export const generateShareIdFailure = (error) => ({
    type: GENERATE_SHARE_ID_FAILURE,
    error
});
