import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Question = ({ idx, question, is_lecturer, showAnswer }) => {

    const { isAnswerShowing, response, correct_answer } = question;
    const showButton = !isAnswerShowing && !is_lecturer;
    const showAnswers = is_lecturer || isAnswerShowing;
    const answerIsWrong = showAnswers && correct_answer !== response;
    const showWrongAnswer = value => !is_lecturer && response && answerIsWrong
        && value === response.toLowerCase();

    let aClasses = classnames("response box", {
        "correct_answer": showAnswers && 'a' === correct_answer.toLowerCase(),
        "wrong_answer": showWrongAnswer('a')
    });
    let bClasses = classnames("response box", {
        "correct_answer": showAnswers && 'b' === correct_answer.toLowerCase(),
        "wrong_answer": showWrongAnswer('b')
    });
    let cClasses = classnames("response box", {
        "display-none": question.c === undefined || question.c === null || question.c === "",
        "correct_answer": showAnswers && 'c' === correct_answer.toLowerCase(),
        "wrong_answer": showWrongAnswer('c')
    });
    let dClasses = classnames("response box", {
        "display-none": question.d === undefined || question.d === null || question.d === "",
        "correct_answer": showAnswers && 'd' === correct_answer.toLowerCase(),
        "wrong_answer": showWrongAnswer('d')
    });

    return (
        <div key={idx} className="card">
            <div className="question">
                <p className="f-subheader">Q{idx + 1}.</p>
                <p className="f-body">{question.question}</p>
            </div>

            <div className={ aClasses }>
                <p className="letter f-title"> A </p>
                <p className="answer f-body"> { question.a } </p>
                <p className="num_responses f-subheader">{ `( ${+question.a_responses} )` }</p>
            </div>
            <div className={ bClasses }>
                <p className="letter f-title"> B </p>
                <p className="answer f-body"> { question.b } </p>
                <p className="num_responses f-subheader">{ `( ${+question.b_responses} )` }</p>
            </div>
            <div className={ cClasses }>
                <p className="letter f-title"> C </p>
                <p className="answer f-body"> { question.c } </p>
                <p className="num_responses f-subheader">{ `( ${+question.c_responses} )` }</p>
            </div>
            <div className={ dClasses }>
                <p className="letter f-title"> D </p>
                <p className="answer f-body"> { question.d } </p>
                <p className="num_responses f-subheader">{ `( ${+question.d_responses} )` }</p>
            </div>
        </div>
    );
};

Question.propTypes = {
    idx: PropTypes.number.isRequired,
    is_lecturer: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
    showAnswer: PropTypes.func
};

export default Question;
