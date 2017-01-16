import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Questions from '../new-quiz/questions';
import classnames from 'classnames';
import { store } from '../../store';
import { clearNewQuizState } from '../../actions/new-quiz';


const EditQuiz = ({ questions, isUpdatingQuiz, name, is_last_quiz, deletedQuestions, handleAddQuestion, handleInputChange, handleQuizNameChange, handleEditQuiz, handleDeleteQuestion, handleIsLastQuiz, params }) => {

    const isSurvey = params.survey_id ? true : false;
    const questionsValidation = questions.map((questionObj) => {
        const { question, a, b, correct_answer } = questionObj;
        return Boolean(question && a && b && (correct_answer || isSurvey));
    }).every((elem) => elem);
    const submitClasses = classnames("button is-success save-question", {
        "is-disabled": !name || questionsValidation === false,
        "is-loading": isUpdatingQuiz
    });
    const quizNameClasses = classnames("help is-danger", {
        "display-none": name
    });
    return (
            <div className="edit-quiz">
                <div className="column is-offset-3">
                    <Link to={ `/${params.module_id}/lecturer` }>
                        <button onClick={ () => store.dispatch(clearNewQuizState()) }className="button is-3 is-light is-inverted">
                            <span className="icon">
                                <i className="fa fa-chevron-left"></i>
                            </span>
                            <span>Back to { params.module_id }</span>
                        </button>
                    </Link>
                </div>
                <div className="columns">
                    <div className="column is-5 is-offset-3 has-text-centered">
                            { isSurvey &&
                                <label className="label">
                                    Survey Name
                                </label>
                            }
                            { !isSurvey &&
                                <label className="label">
                                    Quiz Name
                                </label>
                            }
                        <input
                            className="input"
                            type="text"
                            value={ name || "" }
                            onChange={ (e) => handleQuizNameChange(e.target.value) }
                            placeholder={ isSurvey ? `Survey Name` : `Quiz Name`}></input>
                        <span className={ quizNameClasses }>Please enter a { isSurvey ? `Survey` : `Quiz`} Name</span>
                    </div>
                    <div className="column is-1 has-text-centered">
                        {
                            !isSurvey &&
                            <div>
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
                        }
                    </div>
                </div>
                <Questions
                    questions={ questions }
                    isSurvey={ isSurvey }
                    handleInputChange={ handleInputChange }
                    handleDeleteQuestion={ handleDeleteQuestion }
                    />
                <div className="column is-8 is-offset-2 has-text-centered">
                    <button className="button is-info add-question" onClick={ handleAddQuestion }>
                        Add Question
                    </button>
                    <button className={ submitClasses } onClick={ () => handleEditQuiz(params.module_id, params.quiz_id, params.survey_id, name, questions, deletedQuestions, is_last_quiz) }>
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
