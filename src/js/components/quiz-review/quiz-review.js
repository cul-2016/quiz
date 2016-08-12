import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars

const QuizReview = ({ isFetchingReviewQuiz, questions, currentQuizIndex, isAnswerShowing }) => { // eslint-disable-line
    console.log(questions);
    //
    // show question with the responses
    //
    // when lectuer clicks show answer
    //     turn isAnswerShowing to true
    //     and show the answer as highlighted
    //
    // when lecturer clicks next questions
    //     turn isAnswerShowing to false
    //     increment current Quiz indexRoute


    return (
        <div>
            This is the quiz review
        </div>
    );
};

QuizReview.propTypes = {
    isFetchingReviewQuiz: PropTypes.bool.isRequired,
    questions: PropTypes.array.isRequired,
    currentQuizIndex: PropTypes.number.isRequired,
    isAnswerShowing: PropTypes.bool.isRequired,
};

export default QuizReview;
