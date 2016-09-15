import React, { PropTypes } from 'react';
import classnames from 'classnames';

const QuizReviewQuestions = ({ questions }) => {


    let mappedQuestions = questions.map((question, i) => {

        let aClasses = classnames("column is-1 answer", {
            "correct_answer": 'a' === question.correct_answer.toLowerCase()
        });
        let bClasses = classnames("column is-1 answer", {
            "correct_answer": 'b' === question.correct_answer.toLowerCase()
        });
        let cClasses = classnames("column is-1 answer", {
            "correct_answer": 'c' === question.correct_answer.toLowerCase()
        });
        let dClasses = classnames("column is-1 answer", {
            "correct_answer": 'd' === question.correct_answer.toLowerCase()
        });
        return (

            <div key={i} className="column is-8 is-offset-2 quiz-review-questions">
                <div className="columns">
                    <div className="column is-6">
                    <p>{ question.question}</p>
                    </div>
                    <div className={ aClasses }>
                        <p> <span> { question.a } </span> <span>{ question.a_responses } </span></p>

                    </div>
                    <div className={ bClasses }>
                        <p> <span> { question.b } </span> <span>{ question.b_responses } </span></p>

                    </div>
                    <div className={ cClasses }>
                        <p> <span> { question.c } </span> <span>{ question.c_responses } </span></p>

                    </div>
                    <div className={ dClasses }>
                        <p className={ dClasses }> <span> { question.d } </span> <span>{ question.d_responses } </span></p>

                    </div>
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
