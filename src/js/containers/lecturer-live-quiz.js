import { connect } from 'react-redux';
import LiveQuiz from '../components/live-quiz/live-quiz';
import { store } from '../store';
import { startQuiz, goToNextQuestion } from '../actions/live-quiz';
import { socketClient } from '../socket';
import { getNextQuestion } from '../lib/getNextQuestion';
import { sendNextQuestion } from '../lib/sendNextQuestion';


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

const mapStateToProps = (state) => {
    return {
        question: theQUESTIONS[state.liveQuiz.nextQuestionIndex - 1],
        numQuestions: theQUESTIONS.length,
        nextQuestionIndex: state.liveQuiz.nextQuestionIndex,
        is_lecturer: state.user.is_lecturer,
        isQuizStarted: state.liveQuiz.isQuizStarted
    };
};

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

    startQuiz: () => {
        // dispatch isQuizStarted
        let nextQuestion = getNextQuestion(store);

        sendNextQuestion(socketClient, nextQuestion, () => {
            console.log("store.dispatch(nextQuestion)");
            dispatch(goToNextQuestion());
            dispatch(startQuiz());
        });
    },
    nextQuestion: () => {
        let nextQuestion = getNextQuestion(store);

        sendNextQuestion(socketClient, nextQuestion, () => {
            console.log("store.dispatch(nextQuestion)");
            dispatch(goToNextQuestion());
        });
    }
});

const LecturerLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default LecturerLiveQuizContainer;
