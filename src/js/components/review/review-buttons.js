import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

const ReviewButtons = ({ isAnswerShowing, handleIsAnswerShowing, handleIncrementCurrentQuizIndex, numQuestions, currentQuizIndex, endReview, params }) => {
    let answerButtonClasses = classnames("button is-large is-success", {
        "display-none": isAnswerShowing
    });

    let nextButtonClasses = classnames("button is-large is-info", {
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
        <div className="column is-8 is-offset-2 has-text-centered review-buttons">

            <button className={ answerButtonClasses } onClick={ handleIsAnswerShowing }>
                Answer
            </button>

            <button className={ nextButtonClasses } onClick={ clickNext }>
                Next
            </button>

            <Link to={`${params.module_id}/lecturer`} className={ finishButtonClasses } onClick={ endReview }>
                <button className="button is-large is-info">
                    Finish
                </button>
            </Link>

            <Link to={`${params.module_id}/leaderboard`} className={ leaderboardButtonClasses } onClick={ endReview }>
                <button className="button is-large is-success">
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
    params: PropTypes.object
};

export default ReviewButtons;
