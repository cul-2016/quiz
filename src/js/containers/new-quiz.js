import { connect } from 'react-redux';
import NewQuiz from '../components/new-quiz/new-quiz';
import {
    addQuestion,
    deleteQuestion,
    updateValue,
    updateQuizName,
    saveQuiz,
    clearNewQuizState,
    toggleIsLastQuiz,
    toggleIsSurvey
} from '../actions/new-quiz';
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
      console.log(inputType, value, index);
        dispatch(updateValue(inputType, value, index));
    },

    handleQuizNameChange: (value) => {
        dispatch(updateQuizName(value));
    },

    handleSaveQuiz: (module_id, quizName, questions, is_last_quiz) => {
        dispatch(saveQuiz(module_id, quizName, questions, is_last_quiz));
        setTimeout(() => {
            hashHistory.goBack();
            dispatch(clearNewQuizState());
        }, 950);
    },

    handleIsLastQuiz: () => {
        dispatch(toggleIsLastQuiz());
    },

    handleIsSurvey: () => {
        dispatch(toggleIsSurvey());
    }
});


const NewQuizContainer = connect(mapStateToProps, mapDispatchToProps)(NewQuiz);

export default NewQuizContainer;
