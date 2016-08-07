import { connect } from 'react-redux';
import NewQuiz from '../components/new-quiz/new-quiz';
import { addQuestion, updateValue, updateQuizName, saveQuiz } from '../actions/new-quiz';

const mapStateToProps = (state) => ({

    newQuiz: state.newQuiz
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

    handleSaveQuiz: (module_id, quizName, questions) => {
        dispatch(saveQuiz(module_id, quizName, questions));
    }
});


const NewQuizContainer = connect(mapStateToProps, mapDispatchToProps)(NewQuiz);

export default NewQuizContainer;
