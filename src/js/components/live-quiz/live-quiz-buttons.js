import React, { PropTypes } from 'react';
import classnames from 'classnames';

const LiveQuizButtons = ({ is_lecturer, numQuestions, nextQuestionIndex, nextQuestion, submitResponse, isQuizStarted, startQuiz, endQuiz, quiz_id, response }) => {

    let startButtonClasses = classnames("button is-large is-success start-quiz-button", {
        "display-none": !is_lecturer || isQuizStarted
    });

    let nextButtonClasses = classnames("button is-large is-info", {
        "display-none": !is_lecturer || nextQuestionIndex === 0 || nextQuestionIndex === numQuestions
    });

    let endButtonClasses = classnames("button is-large is-danger", {
        "display-none": !is_lecturer || nextQuestionIndex !== numQuestions
    });

    let submitButtonClasses = classnames("button is-large is-success", {
        "display-none": is_lecturer || isQuizStarted === false,
        "is-disabled": !response
    });


    return (
        <div className="column is-8 is-offset-2 has-text-centered">

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
    quiz_id: PropTypes.number,
    response: PropTypes.string
};

export default LiveQuizButtons;
