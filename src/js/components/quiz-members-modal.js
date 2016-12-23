import React, { PropTypes } from 'react';
import classnames from 'classnames';
import QuizReviewLecturer from './review/quiz-review-lecturer';


const QuizMembersModal = ({ questions, hide, isVisible }) => {

    let modalClasses = classnames("modal", {
        "is-active": isVisible
    });


    return (
        <div className={ modalClasses }>
            <div className="modal-background modal-content-outer">
                <div className="modal-content-middle">
                    <div className="modal-content-inner section container">
                        <QuizReviewLecturer questions={ questions } />
                    </div>
                </div>
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
