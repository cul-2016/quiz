import React, { PropTypes } from 'react';
import Questions from './questions';
import Nav from '../general/nav';
import classnames from 'classnames';

const NewQuiz = ({ newQuiz, handleAddQuestion, handleInputChange, handleQuizNameChange, handleSaveQuiz, location, username }) => {

    const questionsValidation = newQuiz.questions.map((question) => {
        if (!question.question || !question.a || !question.b || !question.c || !question.d || !question.correct_answer){
            return false;
        } else {
            return true;
        }
    }).every((elem) => {
        return elem;
    });

    const submitClasses = classnames("button is-success save-question", {
        "is-disabled": !newQuiz.name || questionsValidation === false
    });
    const quizNameClasses = classnames("help is-danger", {
        "display-none": newQuiz.name
    });

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
                        <span className={ quizNameClasses }>Please enter a Quiz Name</span>

                </div>

                <Questions
                    questions={ newQuiz.questions }
                    handleInputChange={ handleInputChange } />

                <div className="column is-8 is-offset-2 has-text-centered">
                    <button className="button is-info add-question" onClick={ handleAddQuestion }>
                        Add Question
                    </button>
                    <button className={ submitClasses } onClick={ () => handleSaveQuiz(location.pathname.split('/')[1], newQuiz.name, newQuiz.questions) }>
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
