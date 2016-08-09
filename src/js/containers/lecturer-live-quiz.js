import { connect } from 'react-redux';
import LiveQuiz from '../components/live-quiz/live-quiz';
import { store } from '../store';
import { startQuiz, nextQuestion as nextQuestionAction } from '../actions/live-quiz';
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
        let nextQuestion = getNextQuestion(store);

        sendNextQuestion(socketClient, nextQuestion, () => {
            console.log("store.dispatch(nextQuestion)");
            dispatch(nextQuestionAction());
            dispatch(startQuiz());
        });
    },
    nextQuestion: () => {
        let nextQuestion = getNextQuestion(store);

        sendNextQuestion(socketClient, nextQuestion, () => {
            console.log("store.dispatch(nextQuestion)");
            dispatch(nextQuestionAction());
        });
    }
});

const LecturerLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default LecturerLiveQuizContainer;
