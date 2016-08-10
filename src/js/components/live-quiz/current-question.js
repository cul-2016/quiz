import React, { PropTypes } from 'react';


const CurrentQuestion = ({ data, handleSelection }) => {

    let answersArray = Object.keys(data);

    answersArray.splice(answersArray.indexOf('question'), 1);
    answersArray.splice(answersArray.indexOf('question_id'), 1)
                .sort();

    let answers = answersArray.map((letter, i) => {
        return (

            <div key={ i } className="box" onClick={ () => handleSelection && handleSelection(letter) }>
                <span>{ `${letter}: ` }</span>
                { `${data[letter]}` }
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
    handleSelection: PropTypes.func
};

export default CurrentQuestion;
