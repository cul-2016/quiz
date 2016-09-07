import React, { PropTypes } from 'react';


const Ranking = ({ quizzesCompleted, overallScore }) => {

    return (
        <div>
            RANKING COMPONENT
            {
                quizzesCompleted === 0 &&
                <p>
                    When you take part in quizzes, you’ll get feedback on how you’re doing, and guidance on which areas you might want to focus on for revision.
                </p>
            }
            {
                overallScore > 90 &&
                <p>
                You are a star performer. Your score is in the top 10% of people who are taking part in these quizzes. There is very little advice to give you – keep up the good work!
                </p>
            }
            {
                overallScore > 75 && overallScore <= 90 &&
                <p>
                    You are doing well – you are in the top 25% of people who are taking part in these quizzes. Good work!
                </p>
            }
            {
                overallScore > 50 && overallScore <= 75 &&
                <p>
                    You are making good progress – your score is in the top half of people who are taking part in these quizzes.
                </p>
            }
            {
                overallScore > 10 && overallScore <= 50 &&
                <p>
                    Solid performance – although you are not at the top of the leaderboard, you’re not at the bottom either. You clearly have potential – it might be worth going over the material to make sure you’re completely on top of it.
                </p>
            }
            {
                overallScore > 0 && overallScore <= 10 &&
                <p>
                    You’re not getting the best scores on these quizzes. It might help to take some more time to get on top of the material.
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
