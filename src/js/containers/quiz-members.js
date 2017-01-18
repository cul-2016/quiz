import { connect } from 'react-redux';
import QuizMembers from '../components/quiz-members';
import { updateScore, editScore } from '../actions/quiz-members';


const mapStateToProps = (state) => ({
    members: state.quizMembers.members,
    isFetchingQuizMembers: state.quizMembers.isFetchingQuizMembers,
    questions: state.review.questions,
    isSurvey: state.liveQuiz.isSurvey
});

const mapDispatchToProps = (dispatch) => ({

    handleUpdateScore: (value, member_key) => {
        let parsedValue = parseInt(value);
        dispatch(updateScore(parsedValue, member_key));
    },
    handleEditScore: (module_id, quiz_id, user_id, score) => {
        dispatch(editScore(module_id, quiz_id, user_id, score));
    }
});

const QuizMembersContainer = connect(mapStateToProps, mapDispatchToProps)(QuizMembers);

export default QuizMembersContainer;
