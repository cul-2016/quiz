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

socketClient.on('invite_student_to_quiz', (quiz_id) => {
    // handle in redux

    store.dispatch(activateQuiz());
    store.dispatch(setQuizID(quiz_id));
});

socketClient.on('disconnected', (id) => {
    console.log("We're disconnected", id);
});
