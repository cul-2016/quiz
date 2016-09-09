import React, { PropTypes } from 'react'; //eslint-disable-line no-unused-vars

const StrengthWeaknesses = ({ totalNumQuizzes, highestDifferentScoreQuiz, lowestDifferenceScoreQuiz }) => {

    return (
        <div className="box">
            {
                totalNumQuizzes < 3 &&
                <p>
                    As you take more quizzes we will identify those that you are doing particularly well on relative to other people, and those that you are doing less well on.
                </p>
            }
            {
                totalNumQuizzes >= 3 &&
                <p>
                    Looking across all the quizzes you’ve taken, your top quiz was { highestDifferentScoreQuiz }. The quiz where you could improve most, relative to other people, is { lowestDifferenceScoreQuiz }. You can use this information to help guide your revision, and work out which areas you might want to spend more time getting to grips with.
                </p>
            }
        </div>
    );
};

StrengthWeaknesses.propTypes = {
    totalNumQuizzes: PropTypes.number,
    highestDifferentScoreQuiz: PropTypes.string,
    lowestDifferenceScoreQuiz: PropTypes.string
};

export default StrengthWeaknesses;
