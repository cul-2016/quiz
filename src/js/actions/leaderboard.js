import axios from 'axios';

export const GET_LEADERBOARD_REQUEST = 'GET_LEADERBOARD_REQUEST';
export const GET_LEADERBOARD_SUCCESS = 'GET_LEADERBOARD_SUCCESS';
export const GET_LEADERBOARD_FAILURE = 'GET_LEADERBOARD_FAILURE';

/***
 * GET LEADERBOARD
 ***/

export function getLeaderboard (module_id) {

    return (dispatch) => {

        dispatch(getLeaderboardRequest());

        axios.get(`/get-leaderboard?module_id=${module_id}`)
            .then((response) => {
                dispatch(getLeaderboardSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getLeaderboardFailure(error));
            });
    };
}


export const getLeaderboardRequest = () => ({
    type: GET_LEADERBOARD_REQUEST
});

export const getLeaderboardSuccess = (data) => ({
    type: GET_LEADERBOARD_SUCCESS,
    mainData: data.mainData,
    medalScores: data.medalScores,
    quiz_id_list: data.quiz_id_list
});

export const getLeaderboardFailure = (error) => ({
    type: GET_LEADERBOARD_FAILURE,
    error
});
