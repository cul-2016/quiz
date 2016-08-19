import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const Questions = ({ questions, handleInputChange }) => {

    const transitionOptions = {
        transitionName: "fade",
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500
    };

    let mappedQuestions = questions.map((question, i) => {
        return (
            <div key={ i } className="column is-6 is-offset-3 question box">

                <label className="label"> Question { i + 1 }</label>
                <textarea className="textarea" type="text" defaultValue={ question.question } onChange={ (e) => handleInputChange('question', e.target.value, i) } placeholder='question'></textarea>


                <label className="label"> A </label>
                <input className="input column is-9" type="text" defaultValue={ question.a } onChange={ (e) => handleInputChange('A', e.target.value, i) } placeholder='A' ></input>
                <span><input className="radio column is-1 radio-button" type="radio" checked={ question.correct_answer === 'A' } name={ i } value="A" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } /></span>

                <label className="label"> B </label>
                <input className="input column is-9" type="text" defaultValue={ question.b } onChange={ (e) => handleInputChange('B', e.target.value, i) }  placeholder='B' ></input>
                <span><input className="radio column is-1 radio-button" type="radio" checked={ question.correct_answer === 'B' } name={ i } value="B" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } /></span>

                <label className="label"> C </label>
                <input className="input column is-9" type="text" defaultValue={ question.c } onChange={ (e) => handleInputChange('C', e.target.value, i) }  placeholder='C' ></input>
                <span><input className="radio column is-1 radio-button" type="radio" checked={ question.correct_answer === 'C' } name={ i } value="C" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } /></span>

                <label className="label"> D </label>
                <input className="input column is-9" type="text" defaultValue={ question.d } onChange={ (e) => handleInputChange('D', e.target.value, i) }  placeholder='D' ></input>
                <span><input className="radio column is-1 radio-button" type="radio" checked={ question.correct_answer === 'D' } name={ i } value="D" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } /></span>


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
    handleInputChange: PropTypes.func.isRequired
};


export default Questions;
