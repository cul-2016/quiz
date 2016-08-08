import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const Quizzes = ({ location, quizzes, startQuiz }) => {

    const mappedQuizzes = quizzes.map((quiz, index) => {

        let iconClasses = quiz.isPresented ? 'fa fa-check' : 'fa fa-times';

        let buttonClass = classnames("button", {
            "display-none": quiz.isPresented
        });

        return (

            <div key={ index } className="box column is-6 is-offset-3">
                <h5>{ quiz.name }</h5>
                <p>{`Number of questions: ${quiz.num_questions}`}</p>
                <p>{`Number of entries: ${quiz.num_entries}`}</p>
                <p>Presented? <i className={ iconClasses } /></p>

                <Link to={`${location.pathname}/live`}>
                    <button className={ buttonClass }
                        onClick={ () => startQuiz(quiz.quiz_id) }>
                        Start Quiz
                    </button>
                </Link>
            </div>
        );
    });

    return (
        <div>
            { mappedQuizzes }
        </div>
    );
};

Quizzes.propTypes = {
    location: PropTypes.object.isRequired,
    quizzes: PropTypes.array.isRequired,
    startQuiz: PropTypes.func.isRequired
};

export default Quizzes;
