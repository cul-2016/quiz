import React, { PropTypes } from 'react';
import Question from './quiz-question.js';

const QuizReviewStudent = ({ review }) =>
    <div>
        {
            review.questions.map((question, idx) =>
                <Question {...{
                    key: `student-question-${idx}`,
                    question,
                    idx,
                    is_lecturer: false
                }}/>
            )
        }
    </div>
;

QuizReviewStudent.propTypes = {
    review: PropTypes.object
};

export default QuizReviewStudent;
