/**
 * Function to get the next question in the quiz
 * Returns an object containing the next question (object) and the socket room name (string).
 * @param {object} - store - the redux store
 */

const theQUESTIONS = [
    {
        question: 'capital of England',
        A: 'London',
        B: 'Tokyo',
        C: 'New York',
        D: 'Paris'
    },
    {
        question: 'capital of Japan',
        A: 'London',
        B: 'Tokyo',
        C: 'New York',
        D: 'Paris'
    },
    {
        question: 'capital of France',
        A: 'London',
        B: 'Tokyo',
        C: 'New York',
        D: 'Paris'
    }
];

export function getNextQuestion (store) {

    let nextQuestionIndex = store.getState().liveQuiz.nextQuestionIndex;
    // let questions = store.getState().liveQuiz.questions;

    let room = store.getState().module.module.module_id;

    return {
        nextQuestion: theQUESTIONS[nextQuestionIndex],
        room
    };
}
