import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Question = ({ idx, question, is_lecturer }) => {

    const { isAnswerShowing, response, correct_answer } = question;
    const showAnswers = is_lecturer || isAnswerShowing;
    const answerIsWrong = showAnswers && correct_answer !== response;
    const showWrongAnswer = value => !is_lecturer && response && answerIsWrong
        && value === response.toLowerCase();

        console.log(question.c, question.d, 'cd');
    let aClasses = classnames("answer", {
        "same_answer": 'a' === correct_answer.toLowerCase() && 'a' === response,
        "user_answer": 'a' === response && correct_answer.toLowerCase() !== 'a',
        "wrong_answer": showWrongAnswer('a')
    });
    let bClasses = classnames("answer", {
        "same_answer": 'b' === correct_answer.toLowerCase() && 'b' === response,
        "user_answer": 'b' === response && correct_answer.toLowerCase() !== 'b',
        "wrong_answer": showWrongAnswer('b')
    });
    let cClasses = classnames("answer", {
        "display-none": question.c === undefined || question.c === null,
        "same_answer": 'c' === correct_answer.toLowerCase()  && 'c' === response,
        "user_answer": 'c' === response && correct_answer.toLowerCase() !== 'c',
        "wrong_answer": showWrongAnswer('c')
    });
    let dClasses = classnames("answer", {
        "display-none": question.d === undefined  || question.c === null,
        "same_answer": 'd' === correct_answer.toLowerCase()  && 'd' === response,
        "user_answer": 'd' === response && correct_answer.toLowerCase() !== 'd',
        "wrong_answer": showWrongAnswer('d')
    });

    const chosenAnswer = (value) => {
        if (value === response && correct_answer.toLowerCase() === value && response === correct_answer.toLowerCase()) {
            return (
                <span className="f-small-body f-small-body--dark chosen-answer">Correct Answer</span>
            );
        } else if (value === response && correct_answer.toLowerCase() !== value && response !== correct_answer.toLowerCase()) {
            return (
                <span className="f-small-body f-small-body--dark chosen-answer">You chose</span>
            );
        } else if (correct_answer.toLowerCase() === value && response !== correct_answer.toLowerCase()) {
            return (
                <span className="f-small-body f-small-body--dark chosen-answer">Correct Answer</span>
            );
        }
    };

    return (
        <div key={ idx }>
            <div className="card">
                <div className="question">
                    <p className="f-body">Q{idx + 1}.</p>
                    <p className="small-body">{question.question}</p>
                </div>
                <div className={ aClasses }>
                  <span className="f-label"> A </span>
                  <span className="f-small-body"> { question.a } </span>
                  { chosenAnswer('a') }
                </div>
                <div className={ bClasses }>
                  <span className="f-label"> B </span>
                  <span className="f-small-body"> { question.b } </span>
                  { chosenAnswer('b') }
                </div>
                <div className={ cClasses }>
                  <span className="f-label"> C </span>
                  <span className="f-small-body"> { question.c } </span>
                  { chosenAnswer('c') }
                </div>
                <div className={ dClasses }>
                  <span className="f-label"> D </span>
                  <span className="f-small-body"> { question.d } </span>
                  { chosenAnswer('d') }
                </div>
            </div>
        </div>
    );
};

Question.propTypes = {
    idx: PropTypes.number.isRequired,
    is_lecturer: PropTypes.bool.isRequired,
    question: PropTypes.object.isRequired,
};

export default Question;
