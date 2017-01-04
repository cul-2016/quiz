import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const Questions = ({ questions, handleInputChange, handleDeleteQuestion }) => {
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

const Option = ({ question, value, idx, isSurvey }) =>
    <div className="control is-horizontal">
        <div className="control-label answer-label">
            <label className="label">{ value.toUpperCase() }</label>
        </div>
        <div className="control">
            <InputChanger {...{ question, value, idx }}/>
            { isSurvey && <RadioButton {...{ question, value, idx }}/> }
        </div>
    </div>;

    const transitionOptions = {
        transitionName: "fade",
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500
    };

    let mappedQuestions = questions.map((question, i) => {
        return (
            <div key={ i } className="column is-6 is-offset-3 question box">

                <label className="label"> Question { i + 1 }</label>
                <textarea className="textarea" type="text" value={ question.question } onChange={ (e) => handleInputChange('question', e.target.value, i) } placeholder='question'></textarea>

                { ['a', 'b', 'c', 'd'].map(value =>
                    <Option { ...{ question, value, idx: i, isSurvey, handleInputChange }} />
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
    handleInputChange: PropTypes.func.isRequired,
    handleDeleteQuestion: PropTypes.func.isRequired
};

RadioButton.propTypes = {
    question: PropTypes.string,
    value: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

InputChanger.propTypes = {
    question: PropTypes.string,
    idx: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired
};

Option.propTypes = {
    question: PropTypes.string,
    value: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
    isSurvey: PropTypes.bool,
    handleInputChange: PropTypes.func.isRequired
};

export default Questions;
