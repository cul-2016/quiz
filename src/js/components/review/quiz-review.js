import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import ShowAnswer from './show-answer';
import ReviewButtons from './review-buttons';
import Spinner from '../general/spinner';

const QuizReview = ({ isFetchingReviewQuiz, question, numQuestions, currentQuizIndex, isAnswerShowing, handleIsAnswerShowing, handleIncrementCurrentQuizIndex }) => {

    return (
        <div>
            {
                isFetchingReviewQuiz && <Spinner />
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
                handleIncrementCurrentQuizIndex={ handleIncrementCurrentQuizIndex } />
        </div>
    );
};

QuizReview.propTypes = {
    isFetchingReviewQuiz: PropTypes.bool.isRequired,
    question: PropTypes.object,
    numQuestions: PropTypes.number,
    currentQuizIndex: PropTypes.number,
    isAnswerShowing: PropTypes.bool.isRequired,
    handleIsAnswerShowing: PropTypes.func.isRequired,
    handleIncrementCurrentQuizIndex: PropTypes.func.isRequired
};

export default QuizReview;
