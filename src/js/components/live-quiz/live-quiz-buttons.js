import React, { PropTypes } from 'react';
import classnames from 'classnames';

const LiveQuizButtons = ({ is_lecturer, numQuestions, nextQuestionIndex, nextQuestion, submitResponse, isQuizStarted, startQuiz, endQuiz, quiz_id }) => {

    let startButtonClasses = classnames("button", {
        "display-none": !is_lecturer || isQuizStarted
    });

    let nextButtonClasses = classnames("button", {
        "display-none": !is_lecturer || nextQuestionIndex === 0 || nextQuestionIndex === numQuestions
    });

    let endButtonClasses = classnames("button", {
        "display-none": !is_lecturer || nextQuestionIndex !== numQuestions
    });

    let submitButtonClasses = classnames("button", {
        "display-none": is_lecturer || isQuizStarted === false
    });


    return (
        <div>
            <button className={ startButtonClasses } onClick={ startQuiz }>
                Start quiz!
            </button>

            <button className={ nextButtonClasses } onClick={ nextQuestion }>
                Next question
            </button>

            <button className={ endButtonClasses } onClick={ () => endQuiz(quiz_id)  }>
                End quiz
            </button>

            <button className={ submitButtonClasses } onClick={ submitResponse }>
                Submit answer
            </button>

        </div>
    );
};

LiveQuizButtons.propTypes = {
    is_lecturer: PropTypes.bool.isRequired,
    numQuestions: PropTypes.number,
    nextQuestionIndex: PropTypes.number,
    nextQuestion: PropTypes.func,
    submitResponse: PropTypes.func,
    isQuizStarted: PropTypes.bool,
    startQuiz: PropTypes.func,
    endQuiz: PropTypes.func,
    quiz_id: PropTypes.number
};

export default LiveQuizButtons;
