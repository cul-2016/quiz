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

            <div className="subheader subheader--light"> My Performance in:</div>
            <div className="title">{ module.name }</div>


            <div className="card">
                <p className="body body--light">How well are you doing?</p>
                <p className="small-body small-body__secondary--dark">{ displayRankingText(text, ranking) }</p>
            </div>
            <div className="card">
                <p className="body body--light">How do you compare to other people?</p>
                <p className="small-body small-body__secondary--dark">{ displayStrengthsWeaknessesText(text, quizzes) }</p>
            </div>
            <div className="card">
                <p className="body body--light">Your participation rate</p>
                <p className="small-body small-body__secondary--dark">{ displayParticipationText(text, participation) }</p>
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
