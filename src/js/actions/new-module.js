import request from '../lib/request.js';

export const VALIDATE_MODULE_ID_REQUEST = 'VALIDATE_MODULE_ID_REQUEST';
export const VALIDATE_MODULE_ID_SUCCESS = 'VALIDATE_MODULE_ID_SUCCESS';
export const VALIDATE_MODULE_ID_FAILURE = 'VALIDATE_MODULE_ID_FAILURE';
export const UPDATE_TEXT_VALUES = 'UPDATE_TEXT_VALUES';
export const UPDATE_MEDAL_VALUES = 'UPDATE_MEDAL_VALUES';
export const UPDATE_TROPHY_VALUES = 'UPDATE_TROPHY_VALUES';
export const ADD_NEW_MODULE_REQUEST = 'ADD_NEW_MODULE_REQUEST';
export const ADD_NEW_MODULE_SUCCESS = 'ADD_NEW_MODULE_SUCCESS';
export const ADD_NEW_MODULE_FAILURE = 'ADD_NEW_MODULE_FAILURE';


export const validateModuleID = (id) => (dispatch) => {

    dispatch(validateModuleIDRequest());

    request.get(dispatch)(`/validate-module?module_id=${id}`)
    .then((response) => {
        dispatch(validateModuleIDSuccess(response.data));
    })
    .catch((error) => {
        dispatch(validateModuleIDFailure(error));
    });
};

export const validateModuleIDRequest = () => ({
    type: VALIDATE_MODULE_ID_REQUEST
});

export const validateModuleIDSuccess = (moduleIDExists) => ({
    type: VALIDATE_MODULE_ID_SUCCESS,
    moduleIDExists
});

export const validateModuleIDFailure = (error) => ({
    type: VALIDATE_MODULE_ID_FAILURE,
    error
});

/***
 * Update text, medals and trophies
 ***/

export const updateTextValues = (inputKey, value) => ({
    type: UPDATE_TEXT_VALUES,
    inputKey, value
});

export const updateMedalValues = (medal, value) => ({
    type: UPDATE_MEDAL_VALUES,
    medal, value
});

export const updateTrophyValues = (trophy, value) => ({
    type: UPDATE_TROPHY_VALUES,
    trophy, value
});

/***
 * Add new module
 ***/

export const addNewModule = (data) => {

    return (dispatch) => {

        dispatch(addNewModuleRequest());
        request.post(dispatch)(`/add-new-module`, data)
            .then((response) => {
                dispatch(addNewModuleSuccess(response.data));
            })
            .catch((error) => {
                dispatch(addNewModuleFailure(error));
            });
    };
};

export const addNewModuleRequest = () => ({
    type: ADD_NEW_MODULE_REQUEST
});

export const addNewModuleSuccess = () => ({
    type: ADD_NEW_MODULE_SUCCESS
});

export const addNewModuleFailure = (error) => ({
    type: ADD_NEW_MODULE_FAILURE,
    error
});
