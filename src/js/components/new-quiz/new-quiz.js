import React, { PropTypes } from 'react';
import Questions from './questions';
import Nav from '../general/nav';

const NewQuiz = ({ newQuiz, handleAddQuestion, handleInputChange, handleQuizNameChange, handleSaveQuiz, location, username }) => {
    return (
            <div>
                <Nav username={ username } />

                <div className="column is-6 is-offset-3 has-text-centered">
                    <label className="label">
                    New Quiz name
                    </label>
                    <input
                        className="input"
                        type="text"
                        defaultValue={ newQuiz.name }
                        onChange={ (e) => handleQuizNameChange(e.target.value) }
                        placeholder='Quiz Name'></input>
                </div>

                <Questions
                    questions={ newQuiz.questions }
                    handleInputChange={ handleInputChange } />

                <div className="column is-8 is-offset-2 has-text-centered">
                    <button className="button is-info add-question" onClick={ handleAddQuestion }>
                        Add Question
                    </button>
                    <button className="button is-success save-question" onClick={ () => handleSaveQuiz(location.pathname.split('/')[1], newQuiz.name, newQuiz.questions) }>
                        Save and Exit
                    </button>
                </div>

            </div>

    );
};

NewQuiz.propTypes = {
    newQuiz: PropTypes.object.isRequired,
    handleAddQuestion: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleQuizNameChange: PropTypes.func.isRequired,
    handleSaveQuiz: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    username: PropTypes.string
};


export default NewQuiz;
