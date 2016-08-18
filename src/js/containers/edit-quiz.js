import { connect } from 'react-redux';
import EditQuiz from '../components/edit-quiz/edit-quiz';



const mapStateToProps = (state) => ({
    newQuiz: state.newQuiz,
    username: state.user.username
});

// const mapDispatchToProps = (dispatch) => ({
//
// });


const EditQuizContainer = connect(mapStateToProps)(EditQuiz);

export default EditQuizContainer;
