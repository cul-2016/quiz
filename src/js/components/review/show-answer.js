import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ShowAnswer = ({ isAnswerShowing, data }) => {

// TODO: refactor so can be used here and also in live-quiz current question. ideally a function that takes question and array of things we need to return from the question object.
    let answersArray = Object.keys(data);
    let responsesArray = Object.keys(data);
    answersArray.splice(answersArray.indexOf('quiz_id'), 1);
    answersArray.splice(answersArray.indexOf('question_id'), 1);
    answersArray.splice(answersArray.indexOf('question'), 1);
    answersArray.splice(answersArray.indexOf('correct_answer'), 1);
    answersArray.splice(answersArray.indexOf('a_response'), 1);
    answersArray.splice(answersArray.indexOf('b_response'), 1);
    answersArray.splice(answersArray.indexOf('c_response'), 1);
    answersArray.splice(answersArray.indexOf('d_response'), 1)
                .sort();

    responsesArray.splice(responsesArray.indexOf('quiz_id'), 1);
    responsesArray.splice(responsesArray.indexOf('question_id'), 1);
    responsesArray.splice(responsesArray.indexOf('question'), 1);
    responsesArray.splice(responsesArray.indexOf('correct_answer'), 1);
    responsesArray.splice(responsesArray.indexOf('a'), 1);
    responsesArray.splice(responsesArray.indexOf('b'), 1);
    responsesArray.splice(responsesArray.indexOf('c'), 1);
    responsesArray.splice(responsesArray.indexOf('d'), 1)
                .sort();


    let answersWithResponse = answersArray.map((letter, i) => {

        let classes = classnames("box  answer", {
            "correct_answer": isAnswerShowing && letter === data.correct_answer.toLowerCase()
        });
        return (
            <div key={ i } className={ classes }>
                <span>{ `${letter.toUpperCase()}: ` }</span>
                <span>{ `${data[letter]}` }</span>
                <span>{ `${+data[responsesArray[i]]}`}</span>
            </div>
        );

    });
    return (
        <div className="current-question">
            <h1>{ data.question }</h1>
            { answersWithResponse }
        </div>
    );
};

ShowAnswer.propTypes = {
    isAnswerShowing: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
};

export default ShowAnswer;
