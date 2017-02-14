import React, { PropTypes } from 'react';
import Question from './quiz-question.js';

const QuizReviewLecturer = ({ questions }) => {
    let mappedQuestions = questions.map((question, i) => {

        return ( <Question
            key={ `lecturer-question-${i}` }
            idx={ i }
            question={ { ...question, correct_answer: question.correct_answer || '' } }
            is_lecturer={ true }
        /> );
    });


    return (
        <div className="quiz-review-questions">
            { mappedQuestions }
        </div>
    );
};

QuizReviewLecturer.propTypes = {
    questions: PropTypes.array
};

export default QuizReviewLecturer;
