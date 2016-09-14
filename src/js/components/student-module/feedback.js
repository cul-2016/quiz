import React, { PropTypes } from 'react';
import text from '../../lib/feedback-text.json';
import { displayRankingText,
         displayStrengthsWeaknessesText,
         displayParticipationText } from '../../lib/feedback-methods';


const Feedback = ({ ranking, quizzes, participation }) => {

    return (
        <div>
            <div className="box">
                <h3>How well are you doing?</h3>
                { displayRankingText(text, ranking) }
            </div>
            <div className="box">
                <h3>Your strengths and weaknesses</h3>
                { displayStrengthsWeaknessesText(text, quizzes) }
            </div>
            <div className="box">
                <h3>Your participation rate</h3>
                { displayParticipationText(text, participation) }
            </div>
        </div>
    );
};

Feedback.propTypes = {
    ranking: PropTypes.number,
    quizzes: PropTypes.array,
    participation: PropTypes.number
};



export default Feedback;
