export function getNextQuestion (store) {
    let nextQuestionIndex = store.getState().liveQuiz.nextQuestionIndex;
    let questions = store.getState().liveQuiz.questions;
    let room = store.getState().module.module.module_id;

    return {
        nextQuestion: questions[nextQuestionIndex],
        room
    };
    // get the currentQuestion => uncrement for use inside the function then
       //dispatch action to increment currentQuestion;
}
