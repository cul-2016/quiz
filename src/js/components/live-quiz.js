import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars

const LiveQuiz = ({ questions, currentQuestion, nextQuestion }) => {

    return (
        <div>
            This is the live quiz
            {
                questions[currentQuestion].question
            }

            <button className="button" onClick={ () =>  nextQuestion }>
                Next
            </button>
        </div>
    );
};

LiveQuiz.propTypes = {
    questions: PropTypes.array.isRequired,
    currentQuestion: PropTypes.number.isRequired,
    nextQuestion: PropTypes.func.isRequired
};

export default LiveQuiz;
