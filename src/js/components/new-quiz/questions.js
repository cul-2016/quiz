import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const RadioButton = ({ question, value, idx, handleInputChange }) => <input { ...{
    type: "radio",
    className: "radio column is-1 radio-button",
    checked: question.correct_answer === value,
    name: idx,
    value: value,
    onClick: (e) => handleInputChange('correct_answer', e.target.value, idx)
} } />;

const InputChanger = ({ question, idx, handleInputChange }) => <input { ...{
    type: "text",
    className: "input column is-9",
    value: question.a || "",
    onChange: (e) => handleInputChange('a', e.target.value, idx),
    placeholder: 'a'
} } />;

const Option = ({ question, value, idx, isSurvey, handleInputChange }) =>
    <div className="control is-horizontal">
        <div className="control-label answer-label">
            <label className="label">{ value.toUpperCase() }</label>
        </div>
        <div className="control">
            <InputChanger {...{ question, value, idx, handleInputChange }}/>
            { isSurvey &&
                <RadioButton {...{ question, value, idx, handleInputChange }}/>
            }
        </div>
    </div>;

const Questions = ({ questions, handleInputChange, handleDeleteQuestion, isSurvey }) => {

    const transitionOptions = {
        transitionName: "fade",
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500
    };

    let mappedQuestions = questions.map((question, i) => {
        return (
            <div key={ `question-${i}` } className="column is-6 is-offset-3 question box">

                <label className="label"> Question { i + 1 }</label>
                <textarea className="textarea" type="text" value={ question.question } onChange={ (e) => handleInputChange('question', e.target.value, i) } placeholder='question'></textarea>

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
