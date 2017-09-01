import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CurrentQuestion = ({ data, response, handleSelection, isLecturer }) => {


    let answersArray = Object.keys(data);

    answersArray.splice(answersArray.indexOf('question'), 1);
    answersArray.splice(answersArray.indexOf('question_id'), 1);
    answersArray.splice(answersArray.indexOf('order_id'), 1)
                .sort();

    let answers = answersArray.map((letter, i) => {
        let device = isLecturer ? "live-quiz__answer" : "live-quiz__answer-mobile";
        let classes = classnames(`card ${device}`, {
            "live-quiz__answer--response": letter === response
        });
        return (
            <div key={ i } className={ classes } onClick={ () => handleSelection && handleSelection(letter) }>
                <div className="live-quiz__answer-inner">
                    <span className="live-quiz__letter">{ `${letter}` }</span>
                    <span className="live-quiz__answer-text f-body">{ `${data[letter]}` }</span>
                </div>
            </div>
        );

    });

    return (
        <div className="live-quiz__answers-wrapper">
            <div className="live-quiz__answers">
                { answers }
            </div>
        </div>
    );
};

CurrentQuestion.propTypes = {
    data: PropTypes.object,
    handleSelection: PropTypes.func,
    response: PropTypes.string
};

export default CurrentQuestion;
