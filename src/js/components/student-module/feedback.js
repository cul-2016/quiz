import React, { PropTypes } from 'react';
import rankingText from '../../lib/rankingText.json';
import { displayRankingText,
         displayStrengthsWeaknessesText } from '../../lib/feedback-methods';


const Feedback = ({ ranking, quizzes, participation }) => {

    return (
        <div>
            <div className="box">
                <h3>How well are you doing?</h3>
                { displayRankingText(rankingText, ranking) }
            </div>
            <div className="box">
                <h3>Your strengths and weaknesses</h3>
                { displayStrengthsWeaknessesText(quizzes) }
            </div>
            <div className="box">
                Participation: { participation }
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
