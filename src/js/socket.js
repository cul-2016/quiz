import io from 'socket.io-client';
import { store } from './store';
import { openQuiz } from './actions/module';
import { setQuizID, startQuiz, setNextQuestion } from './actions/live-quiz';

let uri = process.env.DEVELOPMENT ? `${location.protocol}//${location.hostname}:9000` : '';
export const socketClient = io(uri);


socketClient.on('we have connected', (id) => {
    console.log("We're connected!", id);
    // handle in redux
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

        store.dispatch(setQuizID(questionObj.quiz_id));
        store.dispatch(startQuiz());
    }
    store.dispatch(setNextQuestion(questionObj.nextQuestion));
});

socketClient.on('receive_end_of_quiz', (quiz_id) => {

    console.log('received end of quiz notification', quiz_id);
    // dispatch endQuiz()
    //push to endpoint.
});

socketClient.on('disconnected', (id) => {
    console.log("We're disconnected", id);
});
