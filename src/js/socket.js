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

socketClient.on('receive_quiz_invite', (quiz_id) => {

    console.log("have received quiz invite");
    if (!store.getState().module.isQuizOpen) {

        store.dispatch(openQuiz());
        store.dispatch(setQuizID(quiz_id));
    }
});

socketClient.on('receive_next_question', (nextQuestion) => {

    console.log("received next question");

    if (store.getState().liveQuiz.isQuizStarted === false) {

        store.dispatch(startQuiz());
    }
    store.dispatch(setNextQuestion(nextQuestion));
});

socketClient.on('disconnected', (id) => {
    console.log("We're disconnected", id);
});
