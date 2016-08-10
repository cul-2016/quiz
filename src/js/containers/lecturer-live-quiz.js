import { connect } from 'react-redux';
import LiveQuiz from '../components/live-quiz/live-quiz';
import { store } from '../store';
import { startQuiz, goToNextQuestion } from '../actions/live-quiz';
import { socketClient } from '../socket';
import { getNextQuestion } from '../lib/getNextQuestion';
import { sendNextQuestion } from '../lib/sendNextQuestion';


const mapStateToProps = (state) => {
    return {
        question: state.liveQuiz.questions && state.liveQuiz.questions[state.liveQuiz.nextQuestionIndex - 1],
        numQuestions: state.liveQuiz.questions && state.liveQuiz.questions.length,
        nextQuestionIndex: state.liveQuiz.nextQuestionIndex,
        is_lecturer: state.user.is_lecturer,
        isQuizStarted: state.liveQuiz.isQuizStarted
    };
};

const mapDispatchToProps = (dispatch) => ({

    startQuiz: () => {

        let nextQuestion = getNextQuestion(store);

        sendNextQuestion(socketClient, nextQuestion, () => {

            dispatch(goToNextQuestion());
            dispatch(startQuiz());
        });
    },
    nextQuestion: () => {

        let nextQuestion = getNextQuestion(store);

        sendNextQuestion(socketClient, nextQuestion, () => {

            dispatch(goToNextQuestion());
        });
    }
});

const LecturerLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default LecturerLiveQuizContainer;
