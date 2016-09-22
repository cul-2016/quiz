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
            "correct_answer": 'c' === question.correct_answer.toLowerCase()
        });
        let dClasses = classnames("column answer box", {
            "correct_answer": 'd' === question.correct_answer.toLowerCase()
        });
        return (

            <div key={i} className="question">
                <h4 className="title is-5 has-text-centered">{ question.question }</h4>

                <div className="columns">
                    <div className={ aClasses }>
                        <p> <span> { question.a } </span> <span><strong>{ question.a_responses } </strong></span></p>
                    </div>
                    <div className={ bClasses }>
                        <p> <span> { question.b } </span> <span><strong>{ question.b_responses } </strong></span></p>
                    </div>
                </div>

                <div className="columns">

                    <div className={ cClasses }>
                        <p> <span> { question.c } </span> <span><strong>{ question.c_responses } </strong></span></p>
                    </div>
                    <div className={ dClasses }>
                        <p> <span> { question.d } </span> <span><strong>{ question.d_responses } </strong></span></p>
                    </div>
                </div>
            </div>

        );
    });


    return (
        <div className="quiz-review-questions">
            { mappedQuestions }
        </div>
    );
};

QuizReviewQuestions.propTypes = {
    questions: PropTypes.array
};

export default QuizReviewQuestions;
