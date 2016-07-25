import React, { PropTypes } from 'react';

const NewQuiz = ({ newQuiz, handleAddQuestion, handleInputChange }) => {

    let mappedQuestions = newQuiz.questions.map((question, i) => {
        return (
            <div key={ i }>
                Question
                <input type="text" value={ question.question } onChange={ (e) => handleInputChange('question', e.target.value, i) } placeholder='question'></input>
                <br></br>
                A
                <input type="text" value={ question.A } onChange={ (e) => handleInputChange('A', e.target.value, i) } placeholder='A' ></input>
                <input type="radio" name="option" value="A" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                <br></br>

                B
                <input type="text" value={ question.B } onChange={ (e) => handleInputChange('B', e.target.value, i) }  placeholder='B' ></input>
                <input type="radio" name="option" value="B" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                <br></br>

                C
                <input type="text" value={ question.C } onChange={ (e) => handleInputChange('C', e.target.value, i) }  placeholder='C' ></input>
                <input type="radio" name="option" value="C" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                <br></br>

                D
                <input type="text" value={ question.D } onChange={ (e) => handleInputChange('D', e.target.value, i) }  placeholder='D' ></input>
                <input type="radio" name="option" value="D" onClick={ (e) => handleInputChange('correct_answer', e.target.value, i) } />
                <br></br>


            </div>
        );
    });

    return (
            <div>
                New Quiz
                <button onClick={ handleAddQuestion }>
                    Add Question
                </button>
                { mappedQuestions }
            </div>

    );
};

NewQuiz.propTypes = {
    newQuiz: PropTypes.object.isRequired,
    handleAddQuestion: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired
};


export default NewQuiz;
