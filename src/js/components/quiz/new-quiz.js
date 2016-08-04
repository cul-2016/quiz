import React, { PropTypes } from 'react';
import Questions from './questions';

const NewQuiz = ({ newQuiz, handleAddQuestion, handleInputChange, handleQuizNameChange }) => {

    return (
            <div>
                <div>
                    New Quiz name
                    <input type="text" value={ newQuiz.name } onChange={ (e) => handleQuizNameChange(e.target.value) } placeholder='Quiz Name'></input>
                </div>
                <Questions
                    questions={ newQuiz.questions }
                    handleInputChange={ handleInputChange } />
                <button onClick={ handleAddQuestion }>
                    Add Question
                </button>
            </div>

    );
};

NewQuiz.propTypes = {
    newQuiz: PropTypes.object.isRequired,
    handleAddQuestion: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleQuizNameChange: PropTypes.func.isRequired
};


export default NewQuiz;
