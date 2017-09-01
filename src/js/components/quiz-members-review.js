import React, { PropTypes } from 'react';
import Question from './review/quiz-question.js';
import { Link } from 'react-router';
import Spinner from './general/spinner';


const QuizMemberReview = ({ questions, params, isFetchingQuizMembers }) => {


    let mappedQuestions = questions.map((question, i) => {

        return ( <Question
            key={ `lecturer-question-${i}` }
            idx={ i }
            question={ { ...question, correct_answer: question.correct_answer || '' } }
            is_lecturer={ true }
        /> );
    });

    return (
        <div>
            {
                isFetchingQuizMembers && <Spinner />
            }
            {
                !isFetchingQuizMembers &&
                <div className="quiz-members container average">

                  <ul className="navbar navbar--invisible">
                    <div className="navbar__inner">
                      <li className="navbar__item navbar__item--onlyone">
                          <Link to={ `${params.module_id}/${params.quiz_id}/members` } className="f-body navbar__link">
                            Back
                          </Link>
                      </li>
                    </div>
                  </ul>
                  <div className="content__body">
                    <p className="f-headline">Quiz Review</p>
                    <p className="f-body quiz-review--header">{ questions.length } Questions</p>
                    <p className="f-body">This quiz has been run and can no longer be edited.</p>
                    <div className="quiz-members-review">
                        { mappedQuestions }
                    </div>
                  </div>
                </div>
            }
        </div>
    );
};

export default QuizMemberReview;

QuizMemberReview.propTypes = {
    questions: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    isFetchingQuizMembers: PropTypes.bool
};
