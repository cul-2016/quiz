import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Questions from './questions';
import classnames from 'classnames';


const NewQuiz = ({
    newQuiz: { name, questions, is_last_quiz, isSavingQuiz, isSurvey },
    handleAddQuestion,
    handleDeleteQuestion,
    handleInputChange,
    handleQuizNameChange,
    handleSaveQuiz,
    handleIsLastQuiz,
    handleIsSurvey,
    location,
    params
}) => {

    const questionsValidation = questions.map((questionObj) => {
        const { question, a, b, correct_answer } = questionObj;
        return Boolean(question && a && b && correct_answer);
    }).every((elem) => elem);

    const submitClasses = classnames("button is-success save-question", {
        "is-disabled": !name || questionsValidation === false,
        "is-loading": isSavingQuiz
    });
    const quizNameClasses = classnames("help is-danger", {
        "display-none": name
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
                        <label className="label">New Quiz name</label>
                        <input
                            className="input"
                            type="text"
                            defaultValue={ name }
                            onChange={ (e) => handleQuizNameChange(e.target.value) }
                            placeholder='Quiz Name'
                            />
                            <span className={ quizNameClasses }>
                                Please enter a Quiz Name
                            </span>
                    </div>
                    <div className="column is-1 has-text-centered">
                        <label className="label">Last Quiz?</label>
                        <input
                            className="column is-half"
                            type="checkbox"
                            checked={ is_last_quiz }
                            name="is_last_quiz"
                            onClick={ handleIsLastQuiz }
                            />
                        <label className="label">Survey?</label>
                        <input
                            className="column is-half"
                            type="checkbox"
                            checked={ isSurvey }
                            name="is_survey"
                            onClick={ handleIsSurvey }
                            />
                    </div>
                </div>

                <Questions
                    questions={ questions }
                    handleInputChange={ handleInputChange }
                    handleDeleteQuestion={ handleDeleteQuestion }
                    />

                <div className="column is-6 is-offset-3 has-text-centered">
                    <button className="button is-info add-question" onClick={ handleAddQuestion }>
                        Add Question
                    </button>
                    <button className={ submitClasses }
                        onClick={ () => handleSaveQuiz(
                            location.pathname.split('/')[1],
                            name,
                            questions,
                            is_last_quiz
                        ) }>
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
    handleIsSurvey: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
};


export default NewQuiz;
