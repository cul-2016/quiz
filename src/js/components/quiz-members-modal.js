import React, { PropTypes } from 'react';
import classnames from 'classnames';
import QuizReviewQuestions from './review/quiz-review-questions';


const QuizMembersModal = ({ questions, hide, isVisible }) => {

    let modalClasses = classnames("modal", {
        "is-active": isVisible
    });

    return (
        <div className={ modalClasses }>
            <div className="modal-background" />

            <div className="modal-content section">
                <QuizReviewQuestions questions={ questions } />
            </div>
            <button className="modal-close" onClick={ () => hide() } />
        </div>
    );
};

export default QuizMembersModal;

QuizMembersModal.propTypes = {
    questions: PropTypes.array.isRequired,
    hide: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};
