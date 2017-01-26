import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Question = ({ idx, question, is_lecturer, showAnswer }) => {

    const { isAnswerShowing, response, correct_answer } = question;
    const showAnswers = is_lecturer || isAnswerShowing;
    const answerIsWrong = showAnswers && correct_answer !== response;
    const showWrongAnswer = value => !is_lecturer && response && answerIsWrong
        && value === response.toLowerCase();

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
        "display-none": question.c === undefined,
        "same_answer": 'c' === correct_answer.toLowerCase()  && 'c' === response,
        "user_answer": 'c' === response && correct_answer.toLowerCase() !== 'c',
        "wrong_answer": showWrongAnswer('c')
    });
    let dClasses = classnames("answer", {
        "display-none": question.d === undefined,
        "same_answer": 'd' === correct_answer.toLowerCase()  && 'd' === response,
        "user_answer": 'd' === response && correct_answer.toLowerCase() !== 'd',
        "wrong_answer": showWrongAnswer('d')
    });

    const chosenAnswer = (value) => {
        if (value === response && correct_answer.toLowerCase() === value && response === correct_answer.toLowerCase()) {
            return (
                <span className="small-body small-body__secondary--dark chosen-answer">Correct Answer</span>
            );
        } else if (value === response && correct_answer.toLowerCase() !== value && response !== correct_answer.toLowerCase()) {
            return (
                <span className="small-body small-body__secondary--dark chosen-answer">You chose</span>
            );
        } else if (correct_answer.toLowerCase() === value && response !== correct_answer.toLowerCase()) {
            return (
                <span className="small-body small-body__secondary--dark chosen-answer">Correct Answer</span>
            );
        }
    };

    return (
        <div key={ idx }>
            <div className="card">
                <div className="question">
                    <p className="body">Q{idx + 1}.</p>
                    <p className="small-body">{question.question}</p>
                </div>
                <div className={ aClasses }>
                  <span className="label"> A </span>
                  <span className="small-body"> { question.a } </span>
                  { chosenAnswer('a') }
                </div>
                <div className={ bClasses }>
                  <span className="label"> B </span>
                  <span className="small-body"> { question.b } </span>
                  { chosenAnswer('b') }
                </div>
                <div className={ cClasses }>
                  <span className="label"> C </span>
                  <span className="small-body"> { question.c } </span>
                  { chosenAnswer('c') }
                </div>
                <div className={ dClasses }>
                  <span className="label"> D </span>
                  <span className="small-body"> { question.d } </span>
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
    showAnswer: PropTypes.func
};

export default Question;
