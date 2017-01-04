import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Question = ({ idx, question, is_lecturer, showAnswer }) => {

    const { isAnswerShowing, response, correct_answer } = question;
    const showButton = !isAnswerShowing && !is_lecturer;
    const showAnswers = is_lecturer || isAnswerShowing;
    const answerIsWrong = showAnswers && correct_answer !== response;
    const showWrongAnswer = value => !is_lecturer && response && answerIsWrong
        && value === response.toLowerCase();

    let aClasses = classnames("column answer box", {
        "correct_answer": showAnswers && 'a' === correct_answer.toLowerCase(),
        "wrong_answer": showWrongAnswer('a')
    });
    let bClasses = classnames("column answer box", {
        "correct_answer": showAnswers && 'b' === correct_answer.toLowerCase(),
        "wrong_answer": showWrongAnswer('b')
    });
    let cClasses = classnames("column answer box", {
        "display-none": question.c === undefined,
        "correct_answer": showAnswers && 'c' === correct_answer.toLowerCase(),
        "wrong_answer": showWrongAnswer('c')
    });
    let dClasses = classnames("column answer box", {
        "display-none": question.d === undefined,
        "correct_answer": showAnswers && 'd' === correct_answer.toLowerCase(),
        "wrong_answer": showWrongAnswer('d')
    });

    return (
        <div key={idx} className="question">
            <h4 className="title is-5 has-text-centered">
                { `${idx + 1}. ${question.question}` }
                { showButton && <button onClick={ () => showAnswer(idx) }>
                    Show Answer
                </button>}
            </h4>


            <div className="columns">
                <div className={ aClasses }>
                    <p>
                        <span className="choice"> { question.a } </span>
                        { is_lecturer && <span><strong>{ `(${+question.a_responses})` } </strong></span> }
                    </p>
                </div>
                <div className={ bClasses }>
                    <p>
                        <span className="choice"> { question.b } </span>
                        { is_lecturer && <span><strong>{ `(${+question.b_responses})` } </strong></span> }
                    </p>
                </div>
            </div>

            <div className="columns">

                <div className={ cClasses }>
                    <p>
                        <span className="choice"> { question.c } </span>
                        { is_lecturer && <span><strong>{ `(${+question.c_responses})` } </strong></span> }
                    </p>
                </div>
                <div className={ dClasses }>
                    <p>
                        <span className="choice"> { question.d } </span>
                        { is_lecturer && <span><strong>{ `(${+question.d_responses})` } </strong></span> }
                    </p>
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
