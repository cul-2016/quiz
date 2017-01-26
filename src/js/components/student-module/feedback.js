import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import text from '../../lib/feedback-text.json';
import { displayRankingText,
         displayStrengthsWeaknessesText,
         displayParticipationText } from '../../lib/feedback-methods';


const Feedback = ({ ranking, quizzes, participation, module }) => {

    return (
        <div className="performance">

            <nav className="navbar navbar__secondary">
                <li className="navbar__item">
                    <Link to={ `${module.module_id}/student` } className="navbar__link navbar__link--left navbar__link--back">
                        Back
                    </Link>
                </li>
            </nav>

            <div className="f-subheader f-subheader--light"> My Performance in:</div>
            <div className="f-title">{ module.name }</div>


            <div className="card">
                <p className="f-body f-body--light">How well are you doing?</p>
                <p className="f-small-body f-small-body--dark">{ displayRankingText(text, ranking) }</p>
            </div>
            <div className="card">
                <p className="f-body f-body--light">How do you compare to other people?</p>
                <p className="f-small-body f-small-body--dark">{ displayStrengthsWeaknessesText(text, quizzes) }</p>
            </div>
            <div className="card">
                <p className="f-body f-body--light">Your participation rate</p>
                <p className="f-small-body f-small-body--dark">{ displayParticipationText(text, participation) }</p>
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
