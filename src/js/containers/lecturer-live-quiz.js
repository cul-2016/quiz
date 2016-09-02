import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import LiveQuiz from '../components/live-quiz/live-quiz';
import { store } from '../store';
import { startQuiz, endQuiz, goToNextQuestion } from '../actions/live-quiz';
import { socketClient } from '../socket';
import { getNextQuestion } from '../lib/getNextQuestion';
import { emitSendNextQuestion } from '../lib/emitSendNextQuestion';


const mapStateToProps = (state) => {
    return {
        question: state.liveQuiz.questions && state.liveQuiz.questions[state.liveQuiz.nextQuestionIndex - 1],
        numQuestions: state.liveQuiz.questions && state.liveQuiz.questions.length,
        nextQuestionIndex: state.liveQuiz.nextQuestionIndex,
        is_lecturer: state.user.is_lecturer,
        isQuizStarted: state.liveQuiz.isQuizStarted,
        quiz_id: state.liveQuiz.quiz_id,
        name: state.liveQuiz.name
    };
};

const mapDispatchToProps = (dispatch) => ({

    startQuiz: () => {

        let nextQuestion = getNextQuestion(store);

        emitSendNextQuestion(socketClient, nextQuestion, () => {

            dispatch(startQuiz());
            dispatch(goToNextQuestion());
        });
    },
    nextQuestion: () => {

        let nextQuestion = getNextQuestion(store);

        emitSendNextQuestion(socketClient, nextQuestion, () => {

            dispatch(goToNextQuestion());
        });
    },
    endQuiz: (quiz_id) => {

        const intervalID = store.getState().liveQuiz.interval_id;
        const module_id = store.getState().module.module_id;
        const data = {
            room: module_id,
            quiz_id
        };
        socketClient.emit('end_of_quiz', data, () => {

            clearInterval(intervalID);
            dispatch(endQuiz(quiz_id));
            hashHistory.push(`${module_id}/${quiz_id}/holding-page`);
        });
    }
});

const LecturerLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default LecturerLiveQuizContainer;
