import { connect } from 'react-redux';
import LiveQuiz from '../components/live-quiz/live-quiz';
import { store } from '../store';
import { socketClient } from '../socket';
import { getNextQuestion } from '../lib/getNextQuestion';
import { sendNextQuestion } from '../lib/sendNextQuestion';


const mapStateToProps = (state) => ({
    questions: state.liveQuiz.questions,
    nextQuestionIndex: state.liveQuiz.nextQuestionIndex,
    is_lecturer: state.user.is_lecturer,
    isQuizStarted: state.liveQuiz.isQuizStarted
});

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

    startQuiz: () => {
        // dispatch isQuizStarted
        console.log('startQuiz action happens');
        let nextQuestion = getNextQuestion(store);

        sendNextQuestion(socketClient, nextQuestion, () => {
            console.log("store.dispatch(updateNextQuestion)");
        });

    },
    nextQuestion: () => {
        let nextQuestion = getNextQuestion(store);
        sendNextQuestion(socketClient, nextQuestion, () => {
            console.log("store.dispatch(updateNextQuestion)");
        });
        // increment the current question
        // emit the next question event.
        // lecturer will move to q1.
        // get currentQuestion from state.
        // lecturer emits q1 details with next_question event.
        // we need question object.
    }
});

const LecturerLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default LecturerLiveQuizContainer;
