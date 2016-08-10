import React, { PropTypes } from 'react';


const CurrentQuestion = ({ data }) => {
    
    let answersArray = Object.keys(data);
    answersArray.splice(answersArray.indexOf('question'), 1)
                              .sort();

    let answers = answersArray.map((letter, i) => {
        return (
            <div key={ i }>
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
    data: PropTypes.object
};

export default CurrentQuestion;
