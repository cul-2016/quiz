import axios from 'axios';
export const VALIDATE_MODULE_ID_REQUEST = 'VALIDATE_MODULE_ID_REQUEST';
export const VALIDATE_MODULE_ID_SUCCESS = 'VALIDATE_MODULE_ID_SUCCESS';
export const VALIDATE_MODULE_ID_FAILURE = 'VALIDATE_MODULE_ID_FAILURE';
export const UPDATE_MEDAL_VALUES = 'UPDATE_MEDAL_VALUES';
export const UPDATE_TROPHY_VALUES = 'UPDATE_TROPHY_VALUES';


export const validateModuleID = (id) => {

    return (dispatch) => {

        dispatch(validateModuleIDRequest());

        axios.get(`/validate-module?module_id=${id}`)
        .then((response) => {
            console.log("response", response.data);
            dispatch(validateModuleIDSuccess(response.data));
        })
        .catch((error) => {
            dispatch(validateModuleIDFailure(error));
        });
    };

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

export const updateMedalValues = (medal, value) => ({
    type: UPDATE_MEDAL_VALUES,
    medal,
    value
});

export const updateTrophyValues = (trophy, value) => ({
    type: UPDATE_TROPHY_VALUES,
    trophy,
    value
});
