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
    toggleIsSurvey,
    questionOrder,
    displayError
} from '../actions/new-quiz';
import { hashHistory } from 'react-router';


const mapStateToProps = (state) => ({

    newQuiz: state.newQuiz,
    username: state.user.username,
    error: state.newQuiz.error
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

    handleError: (error) => {
        dispatch(displayError(error));
    },

    handleSaveQuiz: (module_id, quizName, questions, is_last_quiz) => {
        const orderedQuestions = questions.map((question, i) => {
            const obj = Object.assign({}, question);
            obj.order_id = i + 1;
            return obj;
        });

        dispatch(saveQuiz(module_id, quizName, orderedQuestions, is_last_quiz));
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
    },

    handleQuestionOrder: (questions, oldIndex, newIndex) => {
        dispatch(questionOrder(questions, oldIndex, newIndex));
    }
});


const NewQuizContainer = connect(mapStateToProps, mapDispatchToProps)(NewQuiz);

export default NewQuizContainer;
