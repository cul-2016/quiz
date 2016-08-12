import { connect } from 'react-redux';
import QuizReview from '../components/quiz-review/quiz-review';

const mapStateToProps = (state) => ({
    isFetchingReviewQuiz: state.reviewQuiz.isFetchingReviewQuiz,
    questions: state.reviewQuiz.questions,
    currentQuizIndex: state.reviewQuiz.currentQuizIndex,
    isAnswerShowing: state.reviewQuiz.isAnswerShowing,
});


const QuizReviewContainer = connect(mapStateToProps)(QuizReview);

export default QuizReviewContainer;
