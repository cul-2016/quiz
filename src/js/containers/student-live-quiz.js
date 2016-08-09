import { connect } from 'react-redux';
import LiveQuiz from '../components/live-quiz/live-quiz';


const mapStateToProps = (state) => ({ // eslint-disable-line
    question: state.liveQuiz.questions[0],
    is_lecturer: state.user.is_lecturer
});

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

    submitResponse: () => {
        // increment the current question
        // emit the next question event.
    }
});

const StudentLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default StudentLiveQuizContainer;
