/* eslint-disable no-console */
import io from 'socket.io-client';
import { store } from './store';
import { hashHistory } from 'react-router';
import { openQuiz, closeQuiz } from './actions/module';
import { setIsSurvey } from './actions/live-quiz';
import { setQuizDetails, startQuiz, endQuiz, setNextQuestion, updateNumParticipants, resetLiveQuizState } from './actions/live-quiz';
import showNavbar from './lib/showNavbar';
// import { fadeOutThenIn } from './lib/animate';

let uri = process.env.DEVELOPMENT ? `${location.protocol}//${location.hostname}:9000` : '';
export const socketClient = io(uri);


socketClient.on('we have connected', (id) => {
    console.log("We're connected!", id);
    const room = store.getState().module.module_id;
    if (room) {
        socketClient.emit("join_room", room, () => {
            console.log('you madddee it!');
        });
    }
});

socketClient.on('num_participants', (numParticipants) => {

    console.log("these number of users", numParticipants);
    store.dispatch(updateNumParticipants(numParticipants));
});

socketClient.on('receive_quiz_invite', (idObj) => {

    console.log("have received quiz invite");

    if (!store.getState().module.isQuizOpen) {
        store.dispatch(openQuiz());
        store.dispatch(setIsSurvey(idObj.quiz_id, idObj.survey_id));
    }
});

socketClient.on('receive_next_question', (questionObj) => {

    console.log("received next question", questionObj.nextQuestion);

    // fadeOutThenIn('.live-quiz'); commenting out for testing purpose during large live quiz.
    let isQuizStarted = store.getState().liveQuiz.isQuizStarted;

    setTimeout(() => {
        if (!isQuizStarted) {

            store.dispatch(setQuizDetails(questionObj.quiz_id, questionObj.name));
            store.dispatch(startQuiz());
        }
        store.dispatch(setNextQuestion(questionObj.nextQuestion));
    }, 300);

});

socketClient.on('receive_end_of_quiz', (idObj) => {
    const { quiz_id, isSurvey } = idObj;
    console.log('received end of quiz notification', quiz_id);

    // fadeOutThenIn('.live-quiz'); commenting out for testing purpose during large live quiz.

    const module_id = store.getState().module.module_id;

    setTimeout(() => {
        store.dispatch(resetLiveQuizState());
        store.dispatch(closeQuiz());
        showNavbar();
        if (!isSurvey) {
            hashHistory.push(`${module_id}/${quiz_id}/result`);
        } else {
            hashHistory.push(`${module_id}/student`);
        }
    }, 400);

});

socketClient.on('receive_abort_quiz', (idObj) => {
    const { quiz_id, isSurvey } = idObj;
    console.log('received abort quiz notification', quiz_id);

    const module_id = store.getState().module.module_id;
    store.dispatch(resetLiveQuizState());
    store.dispatch(closeQuiz());
    showNavbar();
    hashHistory.push(`${module_id}/student`);
});

socketClient.on('disconnected', (id) => {
    console.log("We're disconnected", id);
});
