import axios from 'axios';
import { hashHistory } from 'react-router';

export const GET_QUIZ_MEMBERS_REQUEST = 'GET_QUIZ_MEMBERS_REQUEST';
export const GET_QUIZ_MEMBERS_SUCCESS = 'GET_QUIZ_MEMBERS_SUCCESS';
export const GET_QUIZ_MEMBERS_FAILURE = 'GET_QUIZ_MEMBERS_FAILURE';


export const EDIT_SCORE_REQUEST = 'EDIT_SCORE_REQUEST';
export const EDIT_SCORE_SUCCESS = 'EDIT_SCORE_SUCCESS';
export const EDIT_SCORE_FAILURE = 'EDIT_SCORE_FAILURE';

export const UPDATE_SCORE = 'UPDATE_SCORE';

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

//
// EDIT SCORE actions
//

export const editScore = (module_id, quiz_id, user_id, score) => {
    return (dispatch) => {

        dispatch(editScoreRequest());

        axios.get(`edit-score?quiz_id=${quiz_id}&score=${score}`)
            .then(() => {

                dispatch(editScoreSuccess());
                //forward back to members area
                hashHistory.push(`${module_id}/${quiz_id}/members`);
            }, (error) => {
                console.error(error, 'error from server');
            })
            .catch((error) => {
                dispatch(editScoreFailure(error));
            });
    };
};

export const editScoreRequest = () => ({
    type: EDIT_SCORE_REQUEST
});

export const editScoreSuccess = () => ({
    type: EDIT_SCORE_SUCCESS
});

export const editScoreFailure = (error) => ({
    type: EDIT_SCORE_FAILURE,
    error
});

//
//
//

export const updateScore = (score, member_key) => ({
    type: UPDATE_SCORE,
    score,
    member_key
});
