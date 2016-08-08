import React, { PropTypes } from 'react';
import classnames from 'classnames';

const LiveQuizButtons = ({ is_lecturer, numQuestions, currentQuestion, nextQuestion, submitResponse }) => {

    let startButtonClasses = classnames("button", {
        "display-none": !is_lecturer || currentQuestion !== 0
    });

    let nextButtonClasses = classnames("button", {
        "display-none": !is_lecturer || currentQuestion === 0 || currentQuestion === numQuestions - 1
    });

    let endButtonClasses = classnames("button", {
        "display-none": !is_lecturer || currentQuestion !== numQuestions - 1
    });

    let submitButtonClasses = classnames("button", {
        "display-none": is_lecturer || numQuestions === 0
    });


    return (
        <div>

            <button className={ startButtonClasses } onClick={ () =>  console.log("Starting quiz") }>
                Start quiz!
            </button>

            <button className={ nextButtonClasses } onClick={ () =>  nextQuestion }>
                Next
            </button>

            <button className={ endButtonClasses } onClick={ () => console.log("Ending quiz") }>
                End quiz
            </button>

            <button className={ submitButtonClasses } onClick={ () =>  submitResponse }>
                Submit answer
            </button>

        </div>
    );
};

LiveQuizButtons.propTypes = {
    is_lecturer: PropTypes.bool.isRequired,
    numQuestions: PropTypes.number,
    currentQuestion: PropTypes.number,
    nextQuestion: PropTypes.func,
    submitResponse: PropTypes.func
};

export default LiveQuizButtons;
