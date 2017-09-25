import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ShowAnswer = ({ isAnswerShowing, data, isSurvey }) => {

    const surveyOrQuiz = isSurvey ? 'survey_id' : 'quiz_id';
    let answersArray = Object.keys(data);
    let responsesArray = Object.keys(data);
    answersArray.splice(answersArray.indexOf(surveyOrQuiz), 1);
    answersArray.splice(answersArray.indexOf('order_id'), 1);
    answersArray.splice(answersArray.indexOf('question_id'), 1);
    answersArray.splice(answersArray.indexOf('question'), 1);
    answersArray.splice(answersArray.indexOf('correct_answer'), 1);
    answersArray.splice(answersArray.indexOf('a_response'), 1);
    answersArray.splice(answersArray.indexOf('b_response'), 1);
    answersArray.splice(answersArray.indexOf('c_response'), 1);
    answersArray.splice(answersArray.indexOf('d_response'), 1)
                .sort();

    responsesArray.splice(responsesArray.indexOf(surveyOrQuiz), 1);
    responsesArray.splice(responsesArray.indexOf('question_id'), 1);
    responsesArray.splice(responsesArray.indexOf('order_id'), 1);
    responsesArray.splice(responsesArray.indexOf('question'), 1);
    responsesArray.splice(responsesArray.indexOf('correct_answer'), 1);
    responsesArray.splice(responsesArray.indexOf('a'), 1);
    responsesArray.splice(responsesArray.indexOf('b'), 1);
    responsesArray.splice(responsesArray.indexOf('c'), 1);
    responsesArray.splice(responsesArray.indexOf('d'), 1)
                .sort();

    let answersWithResponse = answersArray.map((letter, i) => {

        let classes = classnames("card live-quiz__answer", {
            "live-quiz__answer--response": !isSurvey && isAnswerShowing && letter === data.correct_answer.toLowerCase(),
            "live-quiz__answer--wrong": !isSurvey && isAnswerShowing && letter !== data.correct_answer.toLowerCase()
        });
        if (data[letter] !== "") {            
            return (
                <div key={ i } className={ classes }>
                <div className="live-quiz__answer-inner">
                <span className="live-quiz__letter f-title f-title--light">{ `${letter}` }</span>
                <span className="live-quiz__answer-text f-body">{ `${data[letter]}` }</span>
                <span className="live-quiz__total-replies f-title">{ `${+data[responsesArray[i]]}`}</span>
                </div>
                </div>
            );
        }

    });
    return (
        <div className="live-quiz__answers-wrapper">
            <div className="live-quiz__answers">
                { answersWithResponse }
            </div>
        </div>
    );
};

ShowAnswer.propTypes = {
    isAnswerShowing: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    isSurvey: PropTypes.bool.isRequired
};

export default ShowAnswer;
