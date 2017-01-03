import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Question = ({ idx, question, is_lecturer, showAnswer }) => {
    const { isAnswerShowing } = question;
    let aClasses = classnames("column answer box", {
        "correct_answer": isAnswerShowing &&
            'a' === question.correct_answer.toLowerCase()
    });
    let bClasses = classnames("column answer box", {
        "correct_answer": isAnswerShowing &&
            'b' === question.correct_answer.toLowerCase()
    });
    let cClasses = classnames("column answer box", {
        "display-none": question.c === undefined,
        "correct_answer": isAnswerShowing &&
            'c' === question.correct_answer.toLowerCase()
    });
    let dClasses = classnames("column answer box", {
        "display-none": question.d === undefined,
        "correct_answer": isAnswerShowing &&
            'd' === question.correct_answer.toLowerCase()
    });

    return (
        <div key={idx} className="question">
            <h4 className="title is-5 has-text-centered">
                { `${idx + 1}. ${question.question}` }
                { !isAnswerShowing &&
                    <button onClick={ () => showAnswer(idx) }>Show Answer</button>
                }
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
