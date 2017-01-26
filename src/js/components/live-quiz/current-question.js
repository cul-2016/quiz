import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CurrentQuestion = ({ data, response, handleSelection }) => {



    let answersArray = Object.keys(data);

    answersArray.splice(answersArray.indexOf('question'), 1);
    answersArray.splice(answersArray.indexOf('question_id'), 1)
                .sort();

    let answers = answersArray.map((letter, i) => {

        let classes = classnames("card answer", {
            "card__response": letter === response
        });
        return (
            <div key={ i } className={ classes } onClick={ () => handleSelection && handleSelection(letter) }>
                <span className="title title__light">{ `${letter}` }</span>
                <span className="body">{ `${data[letter]}` }</span>
            </div>
        );

    });

    return (
        <div className="current-question">
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
