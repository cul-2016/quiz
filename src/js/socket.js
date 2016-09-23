/* eslint-disable no-console */
import io from 'socket.io-client';
import { store } from './store';
import { hashHistory } from 'react-router';
import { openQuiz, closeQuiz } from './actions/module';
import { setQuizDetails, startQuiz, endQuiz, setNextQuestion, updateNumParticipants } from './actions/live-quiz';
import showNavbar from './lib/showNavbar';

let uri = process.env.DEVELOPMENT ? `${location.protocol}//${location.hostname}:9000` : '';
export const socketClient = io(uri);


socketClient.on('we have connected', (id) => {
    console.log("We're connected!", id);
    // handle in redux
});

socketClient.on('num_participants', (numParticipants) => {

    console.log("these number of users", numParticipants);
    store.dispatch(updateNumParticipants(numParticipants));
});

socketClient.on('receive_quiz_invite', () => {

    console.log("have received quiz invite");
    if (!store.getState().module.isQuizOpen) {

        store.dispatch(openQuiz());
    }
});

socketClient.on('receive_next_question', (questionObj) => {

    console.log("received next question", questionObj.nextQuestion);

    let isQuizStarted = store.getState().liveQuiz.isQuizStarted;

    if (!isQuizStarted) {

        store.dispatch(setQuizDetails(questionObj.quiz_id, questionObj.name));
        store.dispatch(startQuiz());
    }
    store.dispatch(setNextQuestion(questionObj.nextQuestion));
});

socketClient.on('receive_end_of_quiz', (quiz_id) => {
    const module_id = store.getState().module.module_id;
    console.log('received end of quiz notification', quiz_id);
    store.dispatch(endQuiz());
    store.dispatch(closeQuiz());
    showNavbar();
    hashHistory.push(`${module_id}/${quiz_id}/result`);
});

socketClient.on('receive_abort_quiz', (quiz_id) => {
    const module_id = store.getState().module.module_id;
    console.log('received abort quiz notification', quiz_id);
    store.dispatch(endQuiz());
    store.dispatch(closeQuiz());
    showNavbar();
    hashHistory.push(`${module_id}/student`);
});

socketClient.on('disconnected', (id) => {
    console.log("We're disconnected", id);
});
