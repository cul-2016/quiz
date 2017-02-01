import React, { PropTypes } from 'react';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const RadioButton = ({ question, value, idx, handleInputChange }) => {

    const sliderClass = classnames({
        "form__radio--off": question.correct_answer !== value,
        "form__radio--on": question.correct_answer === value
    });
    const sliderCircleClass = classnames({
        "form__radio--off--circle": question.correct_answer !== value,
        "form__radio--on--circle": question.correct_answer === value
    });
    const sliderCylinderClass = classnames({
        "form__radio--off--cylinder": question.correct_answer !== value,
        "form__radio--on--cylinder": question.correct_answer === value
    });

    return (
            <div className={ sliderClass }>
              <p className="f-small-body f-small-body--grey">correct</p>
            <div onClick={ () => handleInputChange('correct_answer', value, idx) }>
              <div className={ sliderCylinderClass }></div>
              <div className= { sliderCircleClass }></div>
            </div>
          </div>
    );
};

const InputChanger = ({ question, value, idx, handleInputChange }) => <textarea { ...{
    type: "text",
    className: "form__input form__input--new-quiz-answer",
    value: question[value] || "",
    onChange: (e) => handleInputChange(value, e.target.value, idx),
    placeholder: value
} } />;

const Option = ({ question, value, idx, isSurvey, handleInputChange }) =>
    <div className="form__radio">
        <label className="f-title form__label form__label--new-quiz">{ value.toUpperCase() }</label>
            <InputChanger {...{ question, value, idx, handleInputChange }}/>
            { !isSurvey &&
                <RadioButton {...{ question, value, idx, handleInputChange }}/>
            }
    </div>;

const Questions = ({ questions, handleInputChange, handleDeleteQuestion, isSurvey }) => {

    const transitionOptions = {
        transitionName: "fade",
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500
    };

    let mappedQuestions = questions.map((question, i) => {
        return (
            <div key={ `question-${i}` } className="card">

                <label className="form__label--new-quiz f-subheader">{ i + 1 }.</label>
                <textarea className="form__input form__input--new-quiz-question" type="text" value={ question.question } onChange={ (e) => handleInputChange('question', e.target.value, i) } placeholder='Question'></textarea>
                <div className="line--new-quiz"></div>

                { ['a', 'b', 'c', 'd'].map((value, idx) =>
                    <Option { ...{ key: `option-${idx}`,
                        question, value, idx: i, isSurvey, handleInputChange
                    }} />
                ) }

                <button className="button is-danger" onClick={ () => { handleDeleteQuestion(i); } }> Delete Question </button>

            </div>
        );
    });

    return (
            <div>
                <ReactCSSTransitionGroup { ...transitionOptions }>
                    { mappedQuestions }
                </ReactCSSTransitionGroup>
            </div>

    );
};

Questions.propTypes = {
    questions: PropTypes.array.isRequired,
    isSurvey: PropTypes.bool,
    handleInputChange: PropTypes.func.isRequired,
    handleDeleteQuestion: PropTypes.func.isRequired
};

RadioButton.propTypes = {
    question: PropTypes.object,
    value: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

InputChanger.propTypes = {
    question: PropTypes.object,
    value: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

Option.propTypes = {
    question: PropTypes.object,
    value: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    isSurvey: PropTypes.bool,
    handleInputChange: PropTypes.func.isRequired
};

export default Questions;
