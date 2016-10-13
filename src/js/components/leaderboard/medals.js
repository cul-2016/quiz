import React, { PropTypes } from 'react';
import classnames from 'classnames';


const Medals = ({ quiz_id_list, medalCondition, userScores }) => {

    const applyClasses = (scoreArray) => {

        let appendedClasses = "";

        if (scoreArray.length > 0) {

            let scoreForCurrentQuiz = scoreArray[0].percentage_score;

            appendedClasses = classnames("fa fa-circle", {
                "bronze": scoreForCurrentQuiz > 0 && scoreForCurrentQuiz <= medalCondition[0],
                "silver": scoreForCurrentQuiz > medalCondition[0] && scoreForCurrentQuiz <= medalCondition[1],
                "gold": scoreForCurrentQuiz > medalCondition[1]
            });
        }

        return `fa fa-circle ${appendedClasses}`;
    };

    let circles = quiz_id_list.map((idObj, i) => {

        let currentQuiz = userScores.filter((scoreObj) => {

            return scoreObj.quiz_id === idObj.quiz_id;
        });
        return (
            <i key={ i } className={ applyClasses(currentQuiz) } />
        );
    });

    return (
        <div className="medals">
            { circles }
        </div>
    );
};

Medals.propTypes = {
    quiz_id_list: PropTypes.array.isRequired,
    medalCondition: PropTypes.array.isRequired,
    userScores: PropTypes.array.isRequired
};

export default Medals;
