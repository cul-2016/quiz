import { connect } from 'react-redux';
import LiveQuiz from '../components/live-quiz/live-quiz';
import { setResponse } from '../actions/live-quiz';

const mapStateToProps = (state) => ({
    question: state.liveQuiz.questions && state.liveQuiz.questions[0],
    is_lecturer: state.user.is_lecturer,
    isQuizStarted: state.liveQuiz.isQuizStarted,
    response: state.liveQuiz.response
});

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

    submitResponse: () => {
        // increment the current question
        // emit the next question event.
    },
    handleSelection: (data) => {
        console.log(data);
        dispatch(setResponse(data));
    }
});

const StudentLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default StudentLiveQuizContainer;
