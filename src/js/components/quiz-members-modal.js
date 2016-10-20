import React, { PropTypes } from 'react';
import classnames from 'classnames';
import QuizReviewQuestions from './review/quiz-review-questions';
import detectIEVersion from '../lib/detectIEVersion';


const QuizMembersModal = ({ questions, hide, isVisible }) => {

    let modalClasses = classnames("modal", {
        "is-active": isVisible
    });

    let modalOuterClass = classnames({
        "modal-content-outer": detectIEVersion() === false
    });

    return (
        <div className={ modalClasses }>
            <div className="modal-background" />
            <div className={ modalOuterClass }>
                <div className="modal-content-middle">
                    <div className="modal-content-inner section container">
                        <QuizReviewQuestions questions={ questions } />
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
