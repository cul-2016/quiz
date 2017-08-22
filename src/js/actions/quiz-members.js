import request from '../lib/request.js';

export const GET_QUIZ_MEMBERS_REQUEST = 'GET_QUIZ_MEMBERS_REQUEST';
export const GET_QUIZ_MEMBERS_SUCCESS = 'GET_QUIZ_MEMBERS_SUCCESS';
export const GET_QUIZ_MEMBERS_FAILURE = 'GET_QUIZ_MEMBERS_FAILURE';


export const EDIT_SCORE_REQUEST = 'EDIT_SCORE_REQUEST';
export const EDIT_SCORE_SUCCESS = 'EDIT_SCORE_SUCCESS';
export const EDIT_SCORE_FAILURE = 'EDIT_SCORE_FAILURE';

export const UPDATE_SCORE = 'UPDATE_SCORE';

export const getQuizMembers = (id, isSurvey) => {
    return (dispatch) => {

        dispatch(getQuizMembersRequest());

        request.get(dispatch)(`get-quiz-members?id=${id}&isSurvey=${isSurvey}`)
            .then((response) => {
                dispatch(getQuizMembersSuccess(response.data));
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

export const editScore = (module_id, quiz_id, user_id, score) => {
    return (dispatch) => {

        dispatch(editScoreRequest());
        request.get(dispatch)(`edit-score?quiz_id=${quiz_id}&score=${score}&user_id=${user_id}`)
            .then(() => {

                dispatch(editScoreSuccess());
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

export const updateScore = (score, member_key) => ({
    type: UPDATE_SCORE,
    score,
    member_key
});
