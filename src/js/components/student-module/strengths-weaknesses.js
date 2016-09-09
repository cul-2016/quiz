import React, { PropTypes } from 'react';

const StrengthsWeaknesses = ({ totalNumQuizzes, strongestQuiz, weakestQuiz }) => {

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
                    Looking across all the quizzes you’ve taken, your top quiz was { strongestQuiz }. The quiz where you could improve most, relative to other people, is { weakestQuiz }. You can use this information to help guide your revision, and work out which areas you might want to spend more time getting to grips with.
                </p>
            }
        </div>
    );
};

StrengthsWeaknesses.propTypes = {
    totalNumQuizzes: PropTypes.number,
    strongestQuiz: PropTypes.string,
    weakestQuiz: PropTypes.string
};

export default StrengthsWeaknesses;
