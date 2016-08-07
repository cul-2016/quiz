import React, { PropTypes } from 'react';


const Quizzes = ({ quizzes }) => {

    const mappedQuizzes = quizzes.map((quiz, index) => {

        let iconClasses = quiz.isPresented ? 'fa fa-check' : 'fa fa-times';

        return (

            <div key={ index } className="box column is-6 is-offset-3">
                <h5>{ quiz.name }</h5>
                <p>{`Number of questions: ${quiz.num_questions}`}</p>
                <p>{`Number of entries: ${quiz.num_entries}`}</p>
                <p>Presented? <i className={ iconClasses } /></p>
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
    quizzes: PropTypes.array.isRequired
};

export default Quizzes;
