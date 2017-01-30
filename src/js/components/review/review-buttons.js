import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

const ReviewButtons = ({ isAnswerShowing, handleIsAnswerShowing, handleIncrementCurrentQuizIndex, numQuestions, currentQuizIndex, endReview, params, isSurvey }) => {
    let answerButtonClasses = classnames("button button__primary", {
        "display-none": isSurvey || isAnswerShowing
    });

    let surveyNextButtonClasses = classnames("button button__secondary", {
        "display-none": !isSurvey || numQuestions === currentQuizIndex + 1
    });

    let nextButtonClasses = classnames("button button__secondary", {
        "display-none": !isAnswerShowing || numQuestions === currentQuizIndex + 1
    });

    let finishButtonClasses = classnames("finish-button", {
        "display-none": !isAnswerShowing || numQuestions !== currentQuizIndex + 1
    });

    let leaderboardButtonClasses = classnames("leaderboard-button", {
        "display-none": !isAnswerShowing || numQuestions !== currentQuizIndex + 1
    });


    function clickNext () {
        handleIsAnswerShowing();
        handleIncrementCurrentQuizIndex();
    }



    return (
        <div className="button__wrapper button__wrapper--centered">

            <button className={ answerButtonClasses } onClick={ handleIsAnswerShowing }>
                Reveal correct answer
            </button>

            <button className={ nextButtonClasses } onClick={ clickNext }>
                Next
            </button>

            <button className={ surveyNextButtonClasses } onClick={ clickNext }>
                Next
            </button>

            <Link to={`${params.module_id}/lecturer`} className={ finishButtonClasses } onClick={ endReview }>
                <button className="button button__tertiary">
                    Finish
                </button>
            </Link>

            <Link to={`${params.module_id}/leaderboard`} className={ leaderboardButtonClasses } onClick={ endReview }>
                <button className="button button__secondary">
                    View Leaderboard
                </button>
            </Link>

        </div>
    );
};

ReviewButtons.propTypes = {
    isAnswerShowing: PropTypes.bool.isRequired,
    handleIsAnswerShowing: PropTypes.func,
    handleIncrementCurrentQuizIndex: PropTypes.func,
    numQuestions: PropTypes.number,
    currentQuizIndex: PropTypes.number,
    endReview: PropTypes.func,
    params: PropTypes.object,
    isSurvey: PropTypes.bool.isRequired
};

export default ReviewButtons;
