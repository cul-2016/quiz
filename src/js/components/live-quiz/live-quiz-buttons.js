import React, { PropTypes } from 'react';
import classnames from 'classnames';

const LiveQuizButtons = ({ is_lecturer, numQuestions, nextQuestionIndex, nextQuestion, submitResponse, isQuizStarted, isSavingResponse, isResponseSubmitted, startQuiz, endQuiz, quiz_id, response, review, handleAbortQuiz }) => {

    let startButtonClasses = classnames("button is-large is-success start-quiz-button", {
        "display-none": !is_lecturer || isQuizStarted
    });

    let nextButtonClasses = classnames("button is-large is-warning", {
        "display-none": !is_lecturer || nextQuestionIndex === 0 || nextQuestionIndex === numQuestions
    });

    let endButtonClasses = classnames("button is-large is-success", {
        "display-none": !is_lecturer || nextQuestionIndex !== numQuestions
    });

    let submitButtonClasses = classnames("button is-large is-success", {
        "display-none": is_lecturer || isQuizStarted === false,
        "is-disabled": !response,
        "is-loading": isSavingResponse
    });


    return (
        <div className="column is-8 is-offset-2 has-text-centered">

            <button className={ startButtonClasses } onClick={ startQuiz }>
                Start quiz!
            </button>

            <button className={ nextButtonClasses } onClick={ nextQuestion }>
                Next question
            </button>

            <button className={ endButtonClasses } onClick={ () => review ? handleAbortQuiz(quiz_id) : endQuiz(quiz_id) }>
                { review ? 'End Review' : 'End quiz' }
            </button>

            <button className={ submitButtonClasses } onClick={ submitResponse }>
                { isResponseSubmitted ? "Resubmit answer" : "Submit answer" }
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
    isSavingResponse: PropTypes.bool,
    isResponseSubmitted: PropTypes.bool,
    startQuiz: PropTypes.func,
    endQuiz: PropTypes.func,
    quiz_id: PropTypes.number,
    response: PropTypes.string,
    review: PropTypes.bool,
    handleAbortQuiz: PropTypes.func
};

export default LiveQuizButtons;
