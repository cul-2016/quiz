import { connect } from 'react-redux';
import LiveQuiz from '../components/live-quiz/live-quiz';


const mapStateToProps = (state) => ({ // eslint-disable-line
    questions: [
        {
            question: 'capital of England',
            A: 'London',
            B: 'Tokyo',
            C: 'New York',
            D: 'Paris'
        }
    ],
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
