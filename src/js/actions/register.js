// import axios from 'axios';

export const UPDATE_INPUT_FIELD = 'UPDATE_INPUT_FIELD';

export const REGISTERING_USER_REQUEST = 'REGISTERING_USER_REQUEST';
export const REGISTERING_USER_SUCCESS = 'REGISTERING_USER_SUCCESS';
export const REGISTERING_USER_FAILURE = 'REGISTERING_USER_FAILURE';

export const updateInputField = (inputKey, value) => ({
    type: UPDATE_INPUT_FIELD,
    value,
    inputKey
});

// export function registeringUser (email, name, password, is_lecturer) {
//
//     return (dispatch) => {
//
//         dispatch(registerUserRequest());
//
//         const payload = {
//             email,
//             name,
//             password,
//             is_lecturer
//         };
//
//         axios.post('/save-user', payload)
//             .then((response) => {
//                 dispatch(registerUserSuccess(response.data));
//                 //set user state as well
//             }, (error) => {
//                 console.log(error);
//             })
//             .catch((error) => {
//                 dispatch(registerUserFailure(error));
//             });
//     };
// }
