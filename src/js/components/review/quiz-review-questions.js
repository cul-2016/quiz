import React, { PropTypes } from 'react';
import classnames from 'classnames';

const QuizReviewQuestions = ({ questions }) => {


    let mappedQuestions = questions.map((question, i) => {

        let aClasses = classnames("column is-1 has-text-centered box answer", {
            "correct_answer": 'a' === question.correct_answer.toLowerCase()
        });
        let bClasses = classnames("column is-1 has-text-centered box answer", {
            "correct_answer": 'b' === question.correct_answer.toLowerCase()
        });
        let cClasses = classnames("column is-1 has-text-centered box answer", {
            "correct_answer": 'c' === question.correct_answer.toLowerCase()
        });
        let dClasses = classnames("column is-1 has-text-centered box answer", {
            "correct_answer": 'd' === question.correct_answer.toLowerCase()
        });
        return (
            <div key={i} className="columns">
                <div className="column is-3 is-offset-2 has-text-centered">
                    <h2>{ question.question}</h2>
                </div>
                <div className={ aClasses }>
                    <p>A</p>
                    <p>{ question.a }</p>
                    <p>{ question.a_responses }</p>
                </div>
                <div className={ bClasses }>
                    <p>B</p>
                    <p>{ question.b }</p>
                    <p>{ question.b_responses }</p>
                </div>
                <div className={ cClasses }>
                    <p>C</p>
                    <p>{ question.c }</p>
                    <p>{ question.c_responses }</p>
                </div>
                <div className={ dClasses }>
                    <p>D</p>
                    <p>{ question.d }</p>
                    <p>{ question.d_responses }</p>
                </div>
            </div>

        );
    });


    return (
        <div>

            { mappedQuestions }

        </div>
    );
};

QuizReviewQuestions.propTypes = {
    questions: PropTypes.array
};

export default QuizReviewQuestions;
