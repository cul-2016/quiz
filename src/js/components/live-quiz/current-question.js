import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CurrentQuestion = ({ data, response, handleSelection }) => {



    let answersArray = Object.keys(data);

    answersArray.splice(answersArray.indexOf('question'), 1);
    answersArray.splice(answersArray.indexOf('question_id'), 1)
                .sort();

    let answers = answersArray.map((letter, i) => {

        let classes = classnames("box answer", {
            "response": letter === response
        });
        return (
            <div key={ i } className={ classes } onClick={ () => handleSelection && handleSelection(letter) }>
                <span>{ `${letter.toUpperCase()}: ` }</span>
                <span>{ `${data[letter]}` }</span>
            </div>
        );

    });

    return (
        <div className="current-question">
            <h1>{ data.question }</h1>
            { answers }
        </div>
    );
};

CurrentQuestion.propTypes = {
    data: PropTypes.object,
    handleSelection: PropTypes.func,
    response: PropTypes.string
};

export default CurrentQuestion;
