import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SortableComponent from './questions';
import classnames from 'classnames';


const NewQuiz = ({
    newQuiz: { name, questions, is_last_quiz, isSurvey },
    handleAddQuestion,
    handleDeleteQuestion,
    handleInputChange,
    handleQuizNameChange,
    handleSaveQuiz,
    handleIsSurvey,
    location,
    params,
    handleQuestionOrder,
    handleError,
    error
}) => {

    const questionsValidation = questions.map((questionObj) => {
        const { question, a, b, correct_answer } = questionObj;
        return Boolean(question && a && b && (correct_answer || isSurvey));
    }).every((elem) => elem);
    const surveyIconClasses = classnames("fa", {
        "fa-square": !isSurvey,
        "fa-check-square": isSurvey
    });
    const surveyClasses = classnames("button", {
        "button__secondary": isSurvey
    });

    return (
            <div className="new-quiz">

              <div>
                  <ul className="navbar navbar--invisible">
                    <div className="navbar__inner">
                      <li className="navbar__item navbar__item--onlyone">
                          <Link to={ `${params.module_id}/lecturer` } className="f-body navbar__link">
                            Back
                          </Link>
                      </li>
                    </div>
                  </ul>
              </div>

              <div className="content__body">
                  <p className="f-headline"> New Quiz</p>
                  <p className="f-small-body--grey"> { params.module_id }</p>

                  <label className="f-body form__label">Name</label>
                  <input
                      className="form__input form__input--new-module"
                      type="text"
                      name="name"
                      defaultValue={ name }
                      onChange={ (e) => handleQuizNameChange(e.target.value) }
                      placeholder='Quiz Name'
                      />
                    <div>
                        <button onClick={ handleIsSurvey } className={ surveyClasses }>
                            <span className="icon">
                                <i className={ surveyIconClasses } />
                            </span>
                            <span className="f-body-light">
                                Survey
                            </span>
                        </button>
                        {/*
                          !isSurvey &&
                          <div>
                              <button onClick={ handleIsLastQuiz } className={ lastQuizClasses }>
                                <span className="icon">
                                  <i className={ lastQuizIconClasses } />
                                </span>
                                <span className="f-body-light">
                                  Last Quiz
                                </span>
                              </button>
                              <p className="f-small-body f-small-body--dark"> Check this box if this is the last quiz in a series </p>
                          </div>
                        */}
                        <div className="line"></div>

                    </div>
                    <SortableComponent
                      questions={ questions }
                      isSurvey={ isSurvey }
                      handleInputChange={ handleInputChange }
                      handleDeleteQuestion={ handleDeleteQuestion }
                      handleQuestionOrder={ handleQuestionOrder }
                      />

                    <div className="new-quiz--buttons">
                      <button className="button button__secondary button--add-question" onClick={ handleAddQuestion }>
                        Add Question
                      </button>
                      <button className="button"
                        onClick={ () => { questionsValidation && name ? handleSaveQuiz(
                          location.pathname.split('/')[1],
                          name,
                          questions,
                          is_last_quiz,
                          isSurvey
                      )
                        :
                        handleError({ message: 'Please ensure that all questions have at least two options, and you have you have indicated the correct answer for all questions.' });}
                     }>
                        Save and Exit
                      </button>
                    </div>
                    <div className="error-container f-body--warning">
                        { error && error.message }
                    </div>
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
    handleIsSurvey: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    handleQuestionOrder: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    error: PropTypes.object
};


export default NewQuiz;
