import { connect } from 'react-redux';
import QuizMembers from '../components/quiz-members';

const mapStateToProps = (state) => ({
    members: state.quizMembers.members,
    isFetchingQuizMembers: state.quizMembers.isFetchingQuizMembers,
    username: state.user.username,
    questions: state.review.questions
});

const QuizMembersContainer = connect(mapStateToProps)(QuizMembers);

export default QuizMembersContainer;
