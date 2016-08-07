import React, { PropTypes } from 'react';
import Questions from './questions';

const NewQuiz = ({ newQuiz, handleAddQuestion, handleInputChange, handleQuizNameChange, handleSaveQuiz, location }) => {
    return (
            <div>
                <div>
                    New Quiz name
                    <input type="text" defaultValue={ newQuiz.name } onChange={ (e) => handleQuizNameChange(e.target.value) } placeholder='Quiz Name'></input>
                </div>
                <Questions
                    questions={ newQuiz.questions }
                    handleInputChange={ handleInputChange } />
                <button onClick={ handleAddQuestion }>
                    Add Question
                </button>
                <button onClick={ () => handleSaveQuiz(location.pathname.split('/')[1], newQuiz.name, newQuiz.questions) }>
                    Save and Exit
                </button>
            </div>

    );
};

NewQuiz.propTypes = {
    newQuiz: PropTypes.object.isRequired,
    handleAddQuestion: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleQuizNameChange: PropTypes.func.isRequired,
    handleSaveQuiz: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
};


export default NewQuiz;
