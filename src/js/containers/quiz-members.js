import { connect } from 'react-redux';
import QuizMembers from '../components/quiz-members';

const mapStateToProps = (state) => ({
    members: state.quizMembers.members,
    isFetchingQuizMembers: state.quizMembers.isFetchingQuizMembers,
    username: state.user.username
});

const QuizMembersContainer = connect(mapStateToProps)(QuizMembers);

export default QuizMembersContainer;
