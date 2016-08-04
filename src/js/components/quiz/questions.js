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
            <div key={ i }>
                Question
                <input type="text" defaultValue={ question.question } onChange={ (e) => handleInputChange('question', e.target.value, i) } placeholder='question'></input>
                <br></br>
                A
                <input type="text" defaultValue={ question.A } onChange={ (e) => handleInputChange('A', e.target.value, i) } placeholder='A' ></input>
                <input type="radio" name={ i } value="A" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                <br></br>

                B
                <input type="text" defaultValue={ question.B } onChange={ (e) => handleInputChange('B', e.target.value, i) }  placeholder='B' ></input>
                <input type="radio" name={ i } value="B" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                <br></br>

                C
                <input type="text" defaultValue={ question.C } onChange={ (e) => handleInputChange('C', e.target.value, i) }  placeholder='C' ></input>
                <input type="radio" name={ i } value="C" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                <br></br>

                D
                <input type="text" defaultValue={ question.D } onChange={ (e) => handleInputChange('D', e.target.value, i) }  placeholder='D' ></input>
                <input type="radio" name={ i } value="D" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                <br></br>


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
