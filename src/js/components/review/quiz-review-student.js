import React, { PropTypes } from 'react';
import Question from './quiz-question-student.js';
import { Link } from 'react-router';

const QuizReviewStudent = ({ review, showAnswer, params }) =>
    <div className="review-quiz-student">

          <ul className="navbar navbar--invisible">
            <div className="navbar__inner">
               <li className="navbar__item navbar__item--onlyone">
                 <Link to={ `${params.module_id}/student` } className="f-body navbar__link">
                     Back
                   </Link>
               </li>
              </div>
           </ul>

          <p className="f-title f-title--primary"> My Answers </p>
          <div className="review-quiz-student-container">
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
    </div>
;

QuizReviewStudent.propTypes = {
    review: PropTypes.object,
    showAnswer: PropTypes.func.isRequired,
    params: PropTypes.object
};

export default QuizReviewStudent;
