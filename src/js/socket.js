import io from 'socket.io-client';
import { store } from './store';
import { activateQuiz } from './actions/module';
import { setQuizID } from './actions/live-quiz';


let uri = process.env.DEVELOPMENT ? `${location.protocol}//${location.hostname}:9000` : '';

export const socketClient = io(uri);

socketClient.on('we have connected', (id) => {
    // handle in redux
    console.log("We're connected!", id);
});

socketClient.on('receive_quiz_invite', (quiz_id) => {
    // handle in redux
    console.log("have received quiz invite");
    if (!store.getState().module.isQuizOpen) {
        store.dispatch(activateQuiz());
        store.dispatch(setQuizID(quiz_id));
    }
});

socketClient.on('receive_next_question', (nextQuestion) => {
    console.log('you have received the next question', nextQuestion);

    // store.dispatch(setNextQuestion(question));
});

socketClient.on('disconnected', (id) => {
    console.log("We're disconnected", id);
});
