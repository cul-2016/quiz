import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import ShowAnswer from './show-answer';
import ReviewButtons from './review-buttons';
import Spinner from '../general/spinner';

const Review = ({ isFetchingReview, question, numQuestions, currentQuizIndex, isAnswerShowing, handleIsAnswerShowing, handleIncrementCurrentQuizIndex, endReview, params }) => {

    return (
        <div>
            {
                isFetchingReview && <Spinner />
            }
            <div className="has-text-centered" >
                <h4>Question { currentQuizIndex + 1 }</h4>
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
    params: PropTypes.object.isRequired
};

export default Review;
