import React, { PropTypes } from 'react';
import Question from './quiz-question.js';

const QuizReviewStudent = ({ review, showAnswer }) =>
    <div>
        {
            review.questions.map((question, idx) =>
                <Question {...{
                    key: `student-question-${idx}`,
                    question,
                    idx,
                    is_lecturer: false,
                    showAnswer
                }}/>
            )
        }
    </div>
;

QuizReviewStudent.propTypes = {
    review: PropTypes.object,
    showAnswer: PropTypes.func.isRequired
};

export default QuizReviewStudent;
