import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Spinner from '../general/spinner';


const QuizHistoryModal = ({ isVisible, history, hide, username, member }) => {
    let modalClasses = classnames("modal", {
        "display-none": !isVisible || username !== member.username
    });

    let memberResults = history.map((quiz, i) => {

        let percentageScore = Math.round(quiz.score / quiz.num_questions * 100);
        return (
          <div className="quiz__details" key={ i }>
            <p className="f-small-body f-small-body--grey"> { i + 1 }</p>
            <p className="f-small-body"> { quiz.score }</p>
            <p className="f-small-body"> { percentageScore }</p>
          </div>
        );
    });

    return (
        <div className={ modalClasses }>
            { !history && <Spinner /> }
            {
                history &&
                <div className="member__quiz__details">
                    <div className="member__quiz__header">
                      <p className="f-small-body f-small-body--grey">  Quiz </p>
                      <p className="f-small-body f-small-body--grey"> Score </p>
                      <p className="f-small-body f-small-body--grey"> % </p>
                    </div>
                    { memberResults }
                    <span onClick= { () => hide() } className="icon close-button">
                      <i className="fa fa-window-close" />
                    </span>
                </div>
            }
        </div>
    );
};

QuizHistoryModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    history: PropTypes.array,
    hide: PropTypes.func.isRequired,
    username: PropTypes.string,
    member: PropTypes.object
};

export default QuizHistoryModal;
