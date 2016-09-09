import React, { PropTypes } from 'react';
import feedbackQuotes from '../lib/feedback.json';


const Ranking = ({ quizzesCompleted, overallScore }) => {

    return (
        <div>
            {
                quizzesCompleted === 0 &&
                <p>
                    When you take part in quizzes, you’ll get feedback on how you’re doing, and guidance on which areas you might want to focus on for revision.
                </p>
            }
            {
                overallScore > 90 &&
                <p>
                    { feedbackQuotes.top10 }
                </p>
            }
            {
                overallScore > 75 && overallScore <= 90 &&
                <p>
                    { feedbackQuotes.top11to25 }
                </p>
            }
            {
                overallScore > 50 && overallScore <= 75 &&
                <p>
                { feedbackQuotes.top25to50 }
                </p>
            }
            {
                overallScore > 10 && overallScore <= 50 &&
                <p>
                { feedbackQuotes.top51to90 }
                </p>
            }
            {
                overallScore > 0 && overallScore <= 10 &&
                <p>
                { feedbackQuotes.top91to100 }
                </p>
            }
        </div>
    );
};

Ranking.propTypes = {
    quizzesCompleted: PropTypes.number.isRequired,
    overallScore: PropTypes.number.isRequired
};
export default Ranking;
