import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SortableComponent from '../new-quiz/questions';
import classnames from 'classnames';
import { store } from '../../store';
import { clearNewQuizState } from '../../actions/new-quiz';


const EditQuiz = ({ questions, isUpdatingQuiz, name,
                    is_last_quiz, deletedQuestions, handleAddQuestion,
                    handleInputChange, handleQuizNameChange, handleEditQuiz,
                    handleDeleteQuestion, handleIsLastQuiz, params,
                    handleQuestionOrder
                }) => {

    const isSurvey = params.survey_id ? true : false;
    const questionsValidation = questions.map((questionObj) => {
        const { question, a, b, correct_answer } = questionObj;
        return Boolean(question && a && b && (correct_answer || isSurvey));
    }).every((elem) => elem);
    const submitClasses = classnames("button button__tertiary", {
        "button__disabled": !name || questionsValidation === false
    });
    const quizNameClasses = classnames("f-label", {
        "display-none": name
    });
    return (
            <div className="edit-quiz">
                <div>
                    <ul className="navbar navbar--invisible">
                        <li className="navbar__item">
                            <Link onClick={ () => store.dispatch(clearNewQuizState()) } to={ `${params.module_id}/lecturer` } className="f-body navbar__link navbar__link--left navbar__link--quit button">
                              Back
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="content__body">
                  <p className="f-headline"> Edit { isSurvey ? 'Survey' : 'Quiz'}</p>
                  <p className="f-small-body--grey"> { params.module_id }</p>

                  <label className="f-body form__label">Name</label>
                  <input
                    className="form__input form__input--new-module"
                    type="text"
                    value={ name || "" }
                    onChange={ (e) => handleQuizNameChange(e.target.value) }
                    placeholder={ isSurvey ? `Survey Name` : `Quiz Name`}></input>
                  <span className={ quizNameClasses }>Please enter a { isSurvey ? `Survey` : `Quiz`} Name</span>
                  {/*
                    !isSurvey &&
                    <div>
                      <label className="f-label">
                        Last Quiz?
                      </label>
                      <input
                        className="column is-1"
                        type="checkbox"
                        checked={ is_last_quiz === true }
                        name="is_last_quiz"
                        onClick={ handleIsLastQuiz } />
                    </div>
                  */}
                  <div className="line line__tertiary"></div>
                  <SortableComponent
                    questions={ questions }
                    isSurvey={ isSurvey }
                    handleInputChange={ handleInputChange }
                    handleDeleteQuestion={ handleDeleteQuestion }
                    handleQuestionOrder={ handleQuestionOrder }
                    />
                  <div className="new-quiz--buttons">
                    <button className="button button--add-question" onClick={ handleAddQuestion }>
                      Add Question
                    </button>
                    <button className={ submitClasses } onClick={ () => handleEditQuiz(params.module_id, params.quiz_id, params.survey_id, name, questions, deletedQuestions, is_last_quiz) }>
                      Save and Exit
                    </button>
                  </div>
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
    handleQuestionOrder: PropTypes.func.isRequired,
    params: PropTypes.object
};


export default EditQuiz;
