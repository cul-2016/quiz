import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import text from '../../lib/feedback-text.json';
import { displayRankingText,
         displayStrengthsWeaknessesText,
         displayParticipationText } from '../../lib/feedback-methods';


const Feedback = ({ ranking, quizzes, participation, module }) => {

    return (
        <div className="performance">
            <ul className="navbar navbar--invisible">
              <div className="navbar__inner">
                 <li className="navbar__item navbar__item--onlyone">
                     <Link to={ `${module.module_id}/student` } className="f-body navbar__link">
                       Back
                     </Link>
                 </li>
               </div>
             </ul>

            <div className="f-title f-title--primary"> My Performance in:</div>
            <div className="f-label">{ module.name }</div>

            <div className="performance-container">
                <div className="card">
                    <p className="f-body f-body--dark">How well are you doing?</p>
                    <p className="f-body f-body--light">{ displayRankingText(text, ranking) }</p>
                </div>
                <div className="card">
                    <p className="f-body f-body--dark">How do you compare to other people?</p>
                    <p className="f-body f-body--light">{ displayStrengthsWeaknessesText(text, quizzes) }</p>
                </div>
                <div className="card">
                    <p className="f-body f-body--dark">Your participation rate</p>
                    <p className="f-body f-body--light">{ displayParticipationText(text, participation) }</p>
                </div>
            </div>

        </div>
    );
};

Feedback.propTypes = {
    ranking: PropTypes.number,
    quizzes: PropTypes.array,
    participation: PropTypes.number,
    module: PropTypes.object
};



export default Feedback;
