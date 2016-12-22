import React, { PropTypes } from 'react';
import Question from './quiz-question.js';

const QuizReviewLecturer = ({ questions }) => {
    let mappedQuestions = questions.map((question, i) => {

        return ( <Question
            key={ `lecturer-question-${i}` }
            idx={ i }
            question={ question }
            is_lecturer={ true }
        /> );
    });


    return (
        <div className="quiz-review-questions">
            <div className="notification is-info has-text-centered">

                <p>Number of students who selected each choice is marked in <strong>bold</strong>.</p>
            </div>
            { mappedQuestions }
        </div>
    );
};

QuizReviewLecturer.propTypes = {
    questions: PropTypes.array
};

export default QuizReviewLecturer;
