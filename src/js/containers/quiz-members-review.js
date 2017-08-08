import { connect } from 'react-redux';
import QuizMembersReview from '../components/quiz-members-review';


const mapStateToProps = (state) => ({
    isFetchingQuizMembers: state.quizMembers.isFetchingQuizMembers,
    questions: state.review.questions
});

const QuizMembersReviewContainer = connect(mapStateToProps)(QuizMembersReview);

export default QuizMembersReviewContainer;
