import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Questions from './questions';
import classnames from 'classnames';


const NewQuiz = ({ newQuiz, handleAddQuestion, handleDeleteQuestion, handleInputChange, handleQuizNameChange, handleSaveQuiz, handleIsLastQuiz, location, params }) => {

    const questionsValidation = newQuiz.questions.map((question) => {
        if (!question.question || !question.a || !question.b || !question.correct_answer){
            return false;
        } else {
            return true;
        }
    }).every((elem) => {
        return elem;
    });

    const submitClasses = classnames("button is-success save-question", {
        "is-disabled": !newQuiz.name || questionsValidation === false,
        "is-loading": newQuiz.isSavingQuiz
    });
    const quizNameClasses = classnames("help is-danger", {
        "display-none": newQuiz.name
    });

    return (
            <div className="new-quiz">
                <div className="column is-offset-3">
                    <Link to={ `/${params.module_id}/lecturer` }>
                        <button className="button is-3 is-light is-inverted">
                            <span className="icon">
                                <i className="fa fa-chevron-left"></i>
                            </span>
                            <span>Back to { params.module_id }</span>
                        </button>
                    </Link>
                </div>
                <div className="columns">
                    <div className="column is-5 is-offset-3 has-text-centered">
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
                    <div className="column is-1 has-text-centered">
                        <label className="label">
                        Last Quiz?
                        </label>
                        <input
                            className="column is-1"
                            type="checkbox"
                            checked={ newQuiz.is_last_quiz === true }
                            name="is_last_quiz"
                            onClick={ handleIsLastQuiz } />
                    </div>
                </div>


                <Questions
                    questions={ newQuiz.questions }
                    handleInputChange={ handleInputChange }
                    handleDeleteQuestion={ handleDeleteQuestion } />

                <div className="column is-6 is-offset-3 has-text-centered">
                    <button className="button is-info add-question" onClick={ handleAddQuestion }>
                        Add Question
                    </button>
                    <button className={ submitClasses } onClick={ () => handleSaveQuiz(location.pathname.split('/')[1], newQuiz.name, newQuiz.questions, newQuiz.is_last_quiz) }>
                        Save and Exit
                    </button>
                </div>

            </div>

    );
};

NewQuiz.propTypes = {
    newQuiz: PropTypes.object.isRequired,
    handleAddQuestion: PropTypes.func.isRequired,
    handleDeleteQuestion: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleQuizNameChange: PropTypes.func.isRequired,
    handleSaveQuiz: PropTypes.func.isRequired,
    handleIsLastQuiz: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};


export default NewQuiz;
