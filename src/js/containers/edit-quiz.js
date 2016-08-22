import { connect } from 'react-redux';
import EditQuiz from '../components/edit-quiz/edit-quiz';
import { addQuestion, updateValue, updateQuizName, updateQuiz } from '../actions/new-quiz';
import { hashHistory } from 'react-router';




const mapStateToProps = (state) => ({
    questions: state.newQuiz.questions,
    name: state.newQuiz.name,
    username: state.user.username
});


const mapDispatchToProps = (dispatch) => ({

    handleAddQuestion: () => {
        dispatch(addQuestion());
    },

    handleInputChange: (inputType, value, index) => {
        dispatch(updateValue(inputType, value, index));
    },

    handleQuizNameChange: (value) => {
        dispatch(updateQuizName(value));
    },

    handleEditQuiz: (module_id, quiz_id, quizName, questions) => {
        dispatch(updateQuiz(module_id, quiz_id, quizName, questions));
        hashHistory.goBack();
    }
});

const EditQuizContainer = connect(mapStateToProps, mapDispatchToProps)(EditQuiz);

export default EditQuizContainer;
