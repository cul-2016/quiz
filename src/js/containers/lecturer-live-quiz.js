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
    ],
    currentQuestion: 0,
    is_lecturer: state.user.is_lecturer
});

const mapDispatchToProps = (dispatch) => ({ // eslint-disable-line

    nextQuestion: () => {
        // increment the current question
        // emit the next question event.
    }
});

const LecturerLiveQuizContainer = connect(mapStateToProps, mapDispatchToProps)(LiveQuiz);

export default LecturerLiveQuizContainer;
