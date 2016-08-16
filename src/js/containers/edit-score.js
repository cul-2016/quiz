import { connect } from 'react-redux';
import EditScore from '../components/edit-score';
import { scoreChange, editScore } from '../actions/quiz-members';

const mapStateToProps = (state) => ({
    members: state.quizMembers.members,
});

const mapDispatchToProps = (dispatch) => ({

    handleScoreChange: (value, member_key) => {
        let parsedValue = parseInt(value);
        dispatch(scoreChange(parsedValue, member_key));
    },
    handleEditScore: (module_id, quiz_id, user_id, score) => {
        dispatch(editScore(module_id, quiz_id, user_id, score));
    }
});

const EditScoreContainer = connect(mapStateToProps, mapDispatchToProps)(EditScore);

export default EditScoreContainer;
