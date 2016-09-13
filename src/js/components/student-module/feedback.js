import React, { PropTypes } from 'react';
import text from '../../lib/rankingText.json';
import { displayRankingText } from '../../lib/feedback-methods';


const Feedback = ({ ranking, quizzes, participation }) => {

    return (
        <div>
            <div className="box">
                <h3>How well are you doing?</h3>
                { displayRankingText(text, ranking) }
            </div>
            <div className="box">
                Quizzes: { quizzes }
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
