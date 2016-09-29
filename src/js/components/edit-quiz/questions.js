import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const Questions = ({ questions, handleInputChange, handleDeleteQuestion }) => {

    const transitionOptions = {
        transitionName: "fade",
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500
    };

    let mappedQuestions = questions.map((question, i) => {
        return (
            <div key={ i } className="column is-6 is-offset-3 question box">

                <label className="label"> Question { i + 1 }</label>
                <textarea className="textarea" type="text" value={ question.question || ""} onChange={ (e) => handleInputChange('question', e.target.value, i) } placeholder='question'></textarea>

                <div className="control is-horizontal">
                    <div className="control-label answer-label">
                        <label className="label">A</label>
                    </div>
                    <div className="control">
                        <input className="input column is-9" type="text" value={ question.a || "" } onChange={ (e) => handleInputChange('a', e.target.value, i) } placeholder='a' ></input>
                        <input className="radio column is-1 radio-button" type="radio" checked={ question.correct_answer === 'a' } name={ i } value="a" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } onChange={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                    </div>
                </div>

                <div className="control is-horizontal">
                    <div className="control-label answer-label">
                        <label className="label"> B </label>
                    </div>
                    <div className="control">
                        <input className="input column is-9" type="text" value={ question.b || "" } onChange={ (e) => handleInputChange('b', e.target.value, i) }  placeholder='b' ></input>
                        <input className="radio column is-1 radio-button" type="radio" checked={ question.correct_answer === 'b' } name={ i } value="b" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } onChange={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                    </div>
                </div>

                <div className="control is-horizontal">
                    <div className="control-label answer-label">
                        <label className="label"> C </label>
                    </div>
                    <div className="control">
                        <input className="input column is-9" type="text" value={ question.c || "" } onChange={ (e) => handleInputChange('c', e.target.value, i) }  placeholder='c' ></input>
                        <input className="radio column is-1 radio-button" type="radio" checked={ question.correct_answer === 'c' } name={ i } value="c" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } onChange={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                    </div>
                </div>

                <div className="control is-horizontal">
                    <div className="control-label answer-label">
                        <label className="label"> D </label>
                    </div>
                    <div className="control">
                        <input className="input column is-9" type="text" value={ question.d || "" } onChange={ (e) => handleInputChange('d', e.target.value, i) }  placeholder='d' ></input>
                        <input className="radio column is-1 radio-button" type="radio" checked={ question.correct_answer === 'd' } name={ i } value="d" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } onChange={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                    </div>
                </div>

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


export default Questions;
