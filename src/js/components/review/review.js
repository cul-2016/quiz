import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import ShowAnswer from './show-answer';
import ReviewButtons from './review-buttons';
import Spinner from '../general/spinner';
import classnames from 'classnames';

const Review = ({ isFetchingReview, question, numQuestions, currentQuizIndex, isAnswerShowing, handleIsAnswerShowing, handleIncrementCurrentQuizIndex, endReview, params, handleGoBack }) => {

    const backButtonClasses = classnames("column", {
        "display-none": currentQuizIndex === 0
    });

    return (
        <div className="review container">
            {
                isFetchingReview && <Spinner />
            }
            <div>
                <div className={ backButtonClasses }>
                    <button onClick={ handleGoBack } className="button is-3">
                        Back
                    </button>
                </div>
                <div className="column has-text-centered" >
                    <h3>Question { currentQuizIndex + 1 }</h3>
                </div>
            </div>
            {
                question &&
                <ShowAnswer
                    isAnswerShowing={ isAnswerShowing }
                    data={ question } />
            }
            <ReviewButtons
                isAnswerShowing={ isAnswerShowing }
                numQuestions={ numQuestions }
                currentQuizIndex={ currentQuizIndex }
                handleIsAnswerShowing={ handleIsAnswerShowing }
                handleIncrementCurrentQuizIndex={ handleIncrementCurrentQuizIndex }
                endReview={ endReview }
                params={ params } />
        </div>
    );
};

Review.propTypes = {
    isFetchingReview: PropTypes.bool.isRequired,
    question: PropTypes.object,
    numQuestions: PropTypes.number,
    currentQuizIndex: PropTypes.number,
    isAnswerShowing: PropTypes.bool.isRequired,
    handleIsAnswerShowing: PropTypes.func.isRequired,
    handleIncrementCurrentQuizIndex: PropTypes.func.isRequired,
    endReview: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    handleGoBack: PropTypes.func
};

export default Review;
