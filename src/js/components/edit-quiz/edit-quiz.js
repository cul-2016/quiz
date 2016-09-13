import React, { PropTypes } from 'react';
import Questions from './questions';
import Nav from '../general/nav';
import classnames from 'classnames';


const EditQuiz = ({ questions, isUpdatingQuiz, name, is_last_quiz, deletedQuestions, username, handleAddQuestion, handleInputChange, handleQuizNameChange, handleEditQuiz, handleDeleteQuestion, handleIsLastQuiz, params }) => {

    const questionsValidation = questions.map((question) => {
        if (!question.question || !question.a || !question.b || !question.correct_answer){
            return false;
        } else {
            return true;
        }
    }).every((elem) => {
        return elem;
    });

    const submitClasses = classnames("button is-success save-question", {
        "is-disabled": !name || questionsValidation === false,
        "is-loading": isUpdatingQuiz
    });
    const quizNameClasses = classnames("help is-danger", {
        "display-none": name
    });

    return (
            <div>
                <Nav username={ username } />

                <div className="columns">
                    <div className="column is-5 is-offset-3 has-text-centered">
                        <label className="label">
                        Quiz name
                        </label>
                        <input
                            className="input"
                            type="text"
                            value={ name || "" }
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
                            checked={ is_last_quiz === true }
                            name="is_last_quiz"
                            onClick={ handleIsLastQuiz } />
                    </div>
                </div>

                <Questions
                    questions={ questions }
                    handleInputChange={ handleInputChange }
                    deletedQuestions={ deletedQuestions }
                    handleDeleteQuestion={ handleDeleteQuestion } />

                <div className="column is-8 is-offset-2 has-text-centered">
                    <button className="button is-info add-question" onClick={ handleAddQuestion }>
                        Add Question
                    </button>
                    <button className={ submitClasses } onClick={ () => handleEditQuiz(params.module_id, params.quiz_id, name, questions, deletedQuestions, is_last_quiz) }>
                        Save and Exit
                    </button>
                </div>
            </div>

    );
};

EditQuiz.propTypes = {
    questions: PropTypes.array,
    isUpdatingQuiz: PropTypes.bool,
    name: PropTypes.string,
    is_last_quiz: PropTypes.bool,
    username: PropTypes.string,
    deletedQuestions: PropTypes.array,
    handleAddQuestion: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleQuizNameChange: PropTypes.func.isRequired,
    handleEditQuiz: PropTypes.func.isRequired,
    handleDeleteQuestion: PropTypes.func.isRequired,
    handleIsLastQuiz: PropTypes.func.isRequired,
    params: PropTypes.object
};


export default EditQuiz;
