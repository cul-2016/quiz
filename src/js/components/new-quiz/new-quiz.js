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
    handleIsLastQuiz,
    handleIsSurvey,
    location,
    params,
    handleQuestionOrder
}) => {

    const questionsValidation = questions.map((questionObj) => {
        const { question, a, b, correct_answer } = questionObj;
        return Boolean(question && a && b && (correct_answer || isSurvey));
    }).every((elem) => elem);
    const submitClasses = classnames("button button__tertiary", {
        "button__disabled": !name || questionsValidation === false,
    });
    const lastQuizIconClasses = classnames("fa", {
        "fa-square": !is_last_quiz,
        "fa-check-square": is_last_quiz
    });
    const lastQuizClasses = classnames("button", {
        "button__secondary": is_last_quiz
    });
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
                      <li className="navbar__item">
                          <Link to={ `${params.module_id}/lecturer` } className="f-body navbar__link navbar__link--left navbar__link--quit">
                            Back
                          </Link>
                      </li>
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
                        <div className="line line__tertiary"></div>

                    </div>
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
                      <button className={ submitClasses }
                        onClick={ () => handleSaveQuiz(
                          location.pathname.split('/')[1],
                          name,
                          questions,
                          is_last_quiz,
                          isSurvey
                        ) }>
                        Save and Exit
                      </button>
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
    handleIsLastQuiz: PropTypes.func.isRequired,
    handleIsSurvey: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    handleQuestionOrder: PropTypes.func.isRequired
};


export default NewQuiz;
