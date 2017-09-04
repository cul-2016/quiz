import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars
import ShowAnswer from './show-answer';
import ReviewButtons from './review-buttons';
import Spinner from '../general/spinner';
import { Link } from 'react-router';

const Review = ({ isFetchingReview, question, numQuestions, currentQuizIndex, isAnswerShowing, handleIsAnswerShowing, handleIncrementCurrentQuizIndex, endReview, params, isSurvey }) => {

    return (
        <div className="review container">
            {
                isFetchingReview && <Spinner />
            }
            <div>
                <ul className="navbar navbar--invisible">
                  <div className="navbar__inner">
                    <li className="navbar__item navbar__item--onlyone">
                        <Link to={ `${params.module_id}/lecturer` } className="f-body navbar__link">
                          Quit
                        </Link>
                    </li>
                  </div>
                </ul>
            </div>
            {
                question &&
                <div className="content content__body" >
                    <div className="live-quiz__question-wrapper">
                        <p className="live-quiz__question-number f-display"> Q{ currentQuizIndex + 1 }</p>
                        <p className="live-quiz__question f-title">{ question.question }</p>
                    </div>
                    <ShowAnswer
                        isAnswerShowing={ isAnswerShowing }
                        data={ question }
                        isSurvey={ isSurvey } />
                    <ReviewButtons
                        isAnswerShowing={ isAnswerShowing }
                        numQuestions={ numQuestions }
                        currentQuizIndex={ currentQuizIndex }
                        handleIsAnswerShowing={ handleIsAnswerShowing }
                        handleIncrementCurrentQuizIndex={ handleIncrementCurrentQuizIndex }
                        endReview={ endReview }
                        params={ params }
                        isSurvey={ isSurvey } />
                </div>
            }
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
    handleGoBack: PropTypes.func,
    isSurvey: PropTypes.bool.isRequired
};

export default Review;
