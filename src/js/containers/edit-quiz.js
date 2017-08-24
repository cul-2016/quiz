import { connect } from 'react-redux';
import EditQuiz from '../components/edit-quiz/edit-quiz';
import { addQuestion, deleteQuestion, updateValue, updateQuizName, updateQuiz, clearNewQuizState, toggleIsLastQuiz, questionOrder } from '../actions/new-quiz';
import { hashHistory } from 'react-router';


const mapStateToProps = (state) => ({
    questions: state.newQuiz.questions,
    isUpdatingQuiz: state.newQuiz.isUpdatingQuiz,
    name: state.newQuiz.name,
    is_last_quiz: state.newQuiz.is_last_quiz,
    deletedQuestions: state.newQuiz.deletedQuestions
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

    handleEditQuiz: (module_id, quiz_id, survey_id, quizName, questions, deletedQuestions, is_last_quiz) => {
        const orderedQuestions = questions.map((question, i) => {
            const obj = Object.assign({}, question);
            obj.order_id = i + 1;
            return obj;
        });
        dispatch(updateQuiz(module_id, quiz_id, survey_id, quizName, orderedQuestions, deletedQuestions, is_last_quiz));
        setTimeout(() => {
            hashHistory.goBack();
            dispatch(clearNewQuizState());
        }, 950);
    },

    handleIsLastQuiz: () => {
        dispatch(toggleIsLastQuiz());
    },

    handleQuestionOrder: (questions, oldIndex, newIndex) => {
        dispatch(questionOrder(questions, oldIndex, newIndex));
    }
});

const EditQuizContainer = connect(mapStateToProps, mapDispatchToProps)(EditQuiz);

export default EditQuizContainer;
