import axios from 'axios';

export const GET_QUIZ_QUESTIONS_REQUEST = 'GET_QUIZ_QUESTIONS_REQUEST';
export const GET_QUIZ_QUESTIONS_SUCCESS = 'GET_QUIZ_QUESTIONS_SUCCESS';
export const GET_QUIZ_QUESTIONS_FAILURE = 'GET_QUIZ_QUESTIONS_FAILURE';

export const SAVE_RESPONSE_REQUEST = 'SAVE_RESPONSE_REQUEST';
export const SAVE_RESPONSE_SUCCESS = 'SAVE_RESPONSE_SUCCESS';
export const SAVE_RESPONSE_FAILURE = 'SAVE_RESPONSE_FAILURE';

export const SET_QUIZ_ID = 'SET_QUIZ_ID';

export const START_QUIZ = 'START_QUIZ';
export const END_QUIZ = 'END_QUIZ';

export const SET_INTERVAL_ID = 'SET_INTERVAL_ID';
export const SET_NEXT_QUESTION = 'SET_NEXT_QUESTION';

export const GO_TO_NEXT_QUESTION = 'GO_TO_NEXT_QUESTION';
export const GO_TO_PREVIOUS_QUESTION = 'GO_TO_PREVIOUS_QUESTION';

export const SET_RESPONSE = 'SET_RESPONSE';


export function getQuizQuestions (quiz_id) {

    return (dispatch) => {

        dispatch(getQuizQuestionsRequest);

        axios.get(`/get-quiz-questions?quiz_id=${quiz_id}`)
            .then((response) => {
                dispatch(getQuizQuestionsSuccess(response.data));
            })
            .catch((error) => {
                dispatch(getQuizQuestionsFailure(error));
            });
    };
}


export const getQuizQuestionsRequest = () => ({
    type: GET_QUIZ_QUESTIONS_REQUEST
});

export const getQuizQuestionsSuccess = (questions) => ({
    type: GET_QUIZ_QUESTIONS_SUCCESS,
    questions
});

export const getQuizQuestionsFailure = (error) => ({
    type: GET_QUIZ_QUESTIONS_FAILURE,
    error
});

export function saveResponse (data) {

    return (dispatch) => {

        dispatch(saveResponseRequest());

        axios.post(`/save-student-response`, data)
            .then(() => {
                dispatch(saveResponseSuccess());
            })
            .catch((error) => {
                dispatch(saveResponseFailure(error));
            });
    };
}

export const saveResponseRequest = () => ({
    type: SAVE_RESPONSE_REQUEST
});

export const saveResponseSuccess = () => ({
    type: SAVE_RESPONSE_SUCCESS
});

export const saveResponseFailure = (error) => ({
    type: SAVE_RESPONSE_FAILURE,
    error
});


export const setQuizID = (quiz_id) => ({
    type: SET_QUIZ_ID,
    quiz_id
});

export const startQuiz = () => ({
    type: START_QUIZ
});

export const endQuiz = () => ({
    type: END_QUIZ
});


export const setIntervalID = (interval_id) => ({
    type: SET_INTERVAL_ID,
    interval_id
});

export const setNextQuestion = (nextQuestion) => ({
    type: SET_NEXT_QUESTION,
    nextQuestion
});

export const goToNextQuestion = () => ({
    type: GO_TO_NEXT_QUESTION
});

export const goToPreviousQuestion = () => ({
    type: GO_TO_PREVIOUS_QUESTION
});

export const setResponse = (data) => ({
    type: SET_RESPONSE,
    data
});
