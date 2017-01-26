import React, { PropTypes } from 'react';
import Question from './quiz-question-student.js';
import { Link } from 'react-router';

const QuizReviewStudent = ({ review, showAnswer, params }) =>
    <div className="review-quiz-student">
          <nav className="navbar navbar__secondary">
              <li className="navbar__item">
                  <Link to={ `${params.module_id}/student` } className="navbar__link navbar__link--left navbar__link--back">
                      Back
                  </Link>
              </li>
          </nav>

          <p className="f-headline f-headline--light"> My Answers </p>
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
    showAnswer: PropTypes.func.isRequired,
    params: PropTypes.object
};

export default QuizReviewStudent;
