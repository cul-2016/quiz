/**
 * Function to get the next question in the quiz
 * Returns an object containing the next question (object) and the socket room name (string).
 * @param {object} - store - the redux store
 */

export function getNextQuestion (store) {

    let nextQuestionIndex = store.getState().liveQuiz.nextQuestionIndex;
    let questions = store.getState().liveQuiz.questions;
    let quiz_id = store.getState().liveQuiz.quiz_id;
    let name = store.getState().liveQuiz.name;

    let room = store.getState().module.module.module_id;

    return {
        questionObj: {
            nextQuestion: questions[nextQuestionIndex],
            quiz_id,
            name
        },
        room
    };
}
