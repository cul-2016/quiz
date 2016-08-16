import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ReviewButtons = ({ isAnswerShowing, handleIsAnswerShowing, handleIncrementCurrentQuizIndex, numQuestions, currentQuizIndex }) => {
    let answerButtonClasses = classnames("button is-large is-success", {
        "display-none": isAnswerShowing
    });

    let nextButtonClasses = classnames("button is-large is-info", {
        "display-none": !isAnswerShowing || numQuestions === currentQuizIndex + 1
    });

    let finishButtonClasses = classnames("button is-large is-info", {
        "display-none": !isAnswerShowing || numQuestions !== currentQuizIndex + 1
    });

    function clickNext () {
        handleIsAnswerShowing();
        handleIncrementCurrentQuizIndex();
    }



    return (
        <div className="column is-8 is-offset-2 has-text-centered">

            <button className={ answerButtonClasses } onClick={ handleIsAnswerShowing }>
                Answer
            </button>

            <button className={ nextButtonClasses } onClick={ clickNext }>
                Next
            </button>

            <button className={ finishButtonClasses }>
                Finish
            </button>

        </div>
    );
};

ReviewButtons.propTypes = {
    isAnswerShowing: PropTypes.bool.isRequired,
    handleIsAnswerShowing: PropTypes.func,
    handleIncrementCurrentQuizIndex: PropTypes.func,
    numQuestions: PropTypes.number,
    currentQuizIndex: PropTypes.number
};

export default ReviewButtons;
