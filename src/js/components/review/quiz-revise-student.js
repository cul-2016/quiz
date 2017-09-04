import React, { PropTypes } from 'react';
import ReviseQuestion from './quiz-revise-question-student.js';
import { Link } from 'react-router';

const QuizReviseStudent = ({ review, showAnswer, params }) =>
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

          <p className="f-headline f-headline--light"> My Answers </p>
          {
            review.questions.map((question, idx) =>
                <ReviseQuestion {...{
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

QuizReviseStudent.propTypes = {
    review: PropTypes.object,
    showAnswer: PropTypes.func.isRequired,
    params: PropTypes.object
};

export default QuizReviseStudent;
