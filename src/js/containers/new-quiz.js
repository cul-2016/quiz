import { connect } from 'react-redux';
import NewQuiz from '../components/new-quiz/new-quiz';
import { addQuestion, deleteQuestion, updateValue, updateQuizName, saveQuiz } from '../actions/new-quiz';
import { hashHistory } from 'react-router';


const mapStateToProps = (state) => ({

    newQuiz: state.newQuiz,
    username: state.user.username
});

const mapDispatchToProps = (dispatch) => ({

    handleAddQuestion: () => {
        dispatch(addQuestion());
    },

    handleDeleteQuestion: (index) => {
        dispatch(deleteQuestion(index));
    },

    handleInputChange: (inputType, value, index) => {
        dispatch(updateValue(inputType, value, index));
    },

    handleQuizNameChange: (value) => {
        dispatch(updateQuizName(value));
    },

    handleSaveQuiz: (module_id, quizName, questions) => {
        dispatch(saveQuiz(module_id, quizName, questions));
        setTimeout(() => {
            hashHistory.goBack();
        }, 750);
    }
});


const NewQuizContainer = connect(mapStateToProps, mapDispatchToProps)(NewQuiz);

export default NewQuizContainer;
