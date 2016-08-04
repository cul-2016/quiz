import { connect } from 'react-redux';
import NewQuiz from '../components/quiz/new-quiz';
import { addQuestion, updateValue, updateQuizName } from '../actions/new-quiz';

const mapStateToProps = (state) => ({

    newQuiz: state.newQuiz
});

const mapDispatchToProps = (dispatch) => ({

    handleAddQuestion: () => {
        dispatch(addQuestion());
    },

    handleInputChange: (inputType, value, index) => {
        // console.log(inputType, value, index);
        dispatch(updateValue(inputType, value, index));
    },

    handleQuizNameChange: (value) => {
        dispatch(updateQuizName(value));
    }
});


const NewQuizContainer = connect(mapStateToProps, mapDispatchToProps)(NewQuiz);

export default NewQuizContainer;
