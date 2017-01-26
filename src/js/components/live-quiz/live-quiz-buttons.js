import React, { PropTypes } from 'react';
import classnames from 'classnames';

const LiveQuizButtons = ({ is_lecturer, numQuestions, nextQuestionIndex,
                           nextQuestion, isQuizStarted, isSavingResponse, //eslint-disable-line no-unused-vars
                           isResponseSubmitted, startQuiz, endQuiz, //eslint-disable-line no-unused-vars
                           quiz_id, response, review, handleAbortQuiz }) => { //eslint-disable-line no-unused-vars

    let startButtonClasses = classnames("button button--large button__primary start-quiz-button", {
        "display-none": !is_lecturer || isQuizStarted
    });

    let nextButtonClasses = classnames("button button--large is-warning", {
        "display-none": !is_lecturer || nextQuestionIndex === 0 || nextQuestionIndex === numQuestions
    });

    let endButtonClasses = classnames("button button--large is-success", {
        "display-none": !is_lecturer || nextQuestionIndex !== numQuestions
    });



    return (
        <div className="button__wrapper button__wrapper--centered">

            <button className={ startButtonClasses } onClick={ startQuiz }>
                Start quiz
            </button>
            <button className={ nextButtonClasses } onClick={ nextQuestion }>
                Next question
            </button>

            <button className={ endButtonClasses } onClick={ () => review ? handleAbortQuiz(quiz_id) : endQuiz(quiz_id) }>
                { review ? 'End Review' : 'End quiz' }
            </button>
        </div>
    );
};

LiveQuizButtons.propTypes = {
    is_lecturer: PropTypes.bool.isRequired,
    numQuestions: PropTypes.number,
    nextQuestionIndex: PropTypes.number,
    nextQuestion: PropTypes.func,
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
