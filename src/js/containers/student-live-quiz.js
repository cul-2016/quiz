import { connect } from 'react-redux';
import LiveQuiz from '../components/live-quiz/live-quiz';


const mapStateToProps = (state) => ({
    question: state.liveQuiz.questions && state.liveQuiz.questions[0],
    is_lecturer: state.user.is_lecturer,
    isQuizStarted: state.liveQuiz.isQuizStarted
});

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

    submitResponse: () => {
        // increment the current question
        // emit the next question event.
    },
    handleSelection: (letter) => {
        console.log(letter);
        //dispatch(updateSelected(letter));
    }
});

const StudentLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default StudentLiveQuizContainer;
