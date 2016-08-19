import React, { PropTypes } from 'react';
import Questions from './questions';
import Nav from '../general/nav';

const EditQuiz = ({ questions, name, username, handleAddQuestion, handleInputChange, handleQuizNameChange, handleSaveQuiz, params }) => {

    return (
            <div>
                <Nav username={ username } />

                <div className="column is-6 is-offset-3 has-text-centered">
                    <label className="label">
                    Quiz name
                    </label>
                    <input
                        className="input"
                        type="text"
                        defaultValue={ name }
                        onChange={ (e) => handleQuizNameChange(e.target.value) }
                        placeholder='Quiz Name'></input>
                </div>

                <Questions
                    questions={ questions }
                    handleInputChange={ handleInputChange } />

                <div className="column is-8 is-offset-2 has-text-centered">
                    <button className="button is-info add-question" onClick={ handleAddQuestion }>
                        Add Question
                    </button>
                    <button className="button is-success save-question" onClick={ () => handleSaveQuiz(params.module_id, name, questions) }>
                        Save and Exit
                    </button>
                </div>
            </div>

    );
};

EditQuiz.propTypes = {
    questions: PropTypes.array,
    name: PropTypes.string,
    username: PropTypes.string,
    handleAddQuestion: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleQuizNameChange: PropTypes.func.isRequired,
    handleSaveQuiz: PropTypes.func.isRequired,
    params: PropTypes.object
};


export default EditQuiz;
