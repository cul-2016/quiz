import axios from 'axios';

export const GET_QUIZ_MEMBERS_REQUEST = 'GET_QUIZ_MEMBERS_REQUEST';
export const GET_QUIZ_MEMBERS_SUCCESS = 'GET_QUIZ_MEMBERS_SUCCESS';
export const GET_QUIZ_MEMBERS_FAILURE = 'GET_QUIZ_MEMBERS_FAILURE';

//
// GET QUIZ MEMBERS actions
//

export const getQuizMembers = (quiz_id) => {
    return (dispatch) => {

        dispatch(getQuizMembersRequest());

        axios.get(`get-quiz-members?quiz_id=${quiz_id}`)
            .then((response) => {

                dispatch(getQuizMembersSuccess(response.data));
            }, (error) => {
                console.error(error, 'error from server');
            })
            .catch((error) => {
                dispatch(getQuizMembersFailure(error));
            });
    };
};

export const getQuizMembersRequest = () => ({
    type: GET_QUIZ_MEMBERS_REQUEST
});

export const getQuizMembersSuccess = (data) => ({
    type: GET_QUIZ_MEMBERS_SUCCESS,
    data
});

export const getQuizMembersFailure = (error) => ({
    type: GET_QUIZ_MEMBERS_FAILURE,
    error
});
