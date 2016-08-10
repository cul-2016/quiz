import { connect } from 'react-redux';
import LiveQuiz from '../components/live-quiz/live-quiz';
import { setResponse, saveResponse } from '../actions/live-quiz';
import { store } from '../store';

const mapStateToProps = (state) => ({
    question: state.liveQuiz.questions && state.liveQuiz.questions[0],
    is_lecturer: state.user.is_lecturer,
    isQuizStarted: state.liveQuiz.isQuizStarted,
    response: state.liveQuiz.response
});

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

    submitResponse: () => {
        let data = {
            user_id: store.getState().user.user_id,
            quiz_id: store.getState().liveQuiz.quiz_id,
            question_id: store.getState().liveQuiz.questions[0].question_id,
            response: store.getState().liveQuiz.response
        };
        // increment the current question
        // emit the next question event.
        dispatch(saveResponse(data));
    },
    handleSelection: (data) => {
        dispatch(setResponse(data));
    }
});

const StudentLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default StudentLiveQuizContainer;
