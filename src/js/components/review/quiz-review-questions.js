import React, { PropTypes } from 'react';
import classnames from 'classnames';

const QuizReviewQuestions = ({ questions }) => {
    let mappedQuestions = questions.map((question, i) => {

        let aClasses = classnames("column answer box", {
            "correct_answer": 'a' === question.correct_answer.toLowerCase()
        });
        let bClasses = classnames("column answer box", {
            "correct_answer": 'b' === question.correct_answer.toLowerCase()
        });
        let cClasses = classnames("column answer box", {
            "display-none": questions.c === undefined,
            "correct_answer": 'c' === question.correct_answer.toLowerCase()
        });
        let dClasses = classnames("column answer box", {
            "display-none": questions.d === undefined,
            "correct_answer": 'd' === question.correct_answer.toLowerCase()
        });
        return (

            <div key={i} className="question">
                <h4 className="title is-5 has-text-centered">{ `${i + 1}. ${question.question}` }</h4>

                <div className="columns">
                    <div className={ aClasses }>
                        <p> <span className="choice"> { question.a } </span> <span><strong>{ `(${+question.a_responses})` } </strong></span></p>
                    </div>
                    <div className={ bClasses }>
                        <p> <span className="choice"> { question.b } </span> <span><strong>{ `(${+question.b_responses})` } </strong></span></p>
                    </div>
                </div>

                <div className="columns">

                    <div className={ cClasses }>
                        <p> <span className="choice"> { question.c } </span> <span><strong>{ `(${+question.c_responses})` } </strong></span></p>
                    </div>
                    <div className={ dClasses }>
                        <p> <span className="choice"> { question.d } </span> <span><strong>{ `(${+question.d_responses})` } </strong></span></p>
                    </div>
                </div>
            </div>

        );
    });


    return (
        <div className="quiz-review-questions">
            <div className="notification is-info has-text-centered">

                <p>Number of students who selected each choice is marked in <strong>bold</strong>.</p>
            </div>
            { mappedQuestions }
        </div>
    );
};

QuizReviewQuestions.propTypes = {
    questions: PropTypes.array
};

export default QuizReviewQuestions;
