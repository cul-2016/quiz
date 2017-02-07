import React, { PropTypes } from 'react';
import Question from './review/quiz-question.js';


const QuizMembersModal = ({ questions }) => {

    let mappedQuestions = questions.map((question, i) => {

        return ( <Question
            key={ `lecturer-question-${i}` }
            idx={ i }
            question={ { ...question, correct_answer: question.correct_answer || '' } }
            is_lecturer={ true }
        /> );
    });

    return (
        <div className="quiz-members-review">
            { mappedQuestions }
        </div>
    );
};

export default QuizMembersModal;

QuizMembersModal.propTypes = {
    questions: PropTypes.array.isRequired,
    hide: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};
