import React, { PropTypes } from 'react';
import classnames from 'classnames';

const ShowAnswer = ({ isAnswerShowing, data, isSurvey }) => {

    const surveyOrQuiz = isSurvey ? 'survey_id' : 'quiz_id';
    let answersArray = Object.keys(data);
    let responsesArray = Object.keys(data);
    answersArray.splice(answersArray.indexOf(surveyOrQuiz), 1);
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
    responsesArray.splice(responsesArray.indexOf('question'), 1);
    responsesArray.splice(responsesArray.indexOf('correct_answer'), 1);
    responsesArray.splice(responsesArray.indexOf('a'), 1);
    responsesArray.splice(responsesArray.indexOf('b'), 1);
    responsesArray.splice(responsesArray.indexOf('c'), 1);
    responsesArray.splice(responsesArray.indexOf('d'), 1)
                .sort();

    let answersWithResponse = answersArray.map((letter, i) => {

        let classes = classnames("box answer", {
            "correct_answer": !isSurvey && isAnswerShowing && letter === data.correct_answer.toLowerCase()
        });
        return (
            <div key={ i } className={ classes }>
                <span>{ `${data[letter]}` }</span>
                <div className="num-responses">{ `${+data[responsesArray[i]]}`}</div>
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
    isSurvey: PropTypes.bool.isRequired
};

export default ShowAnswer;
