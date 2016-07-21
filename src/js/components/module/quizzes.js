import React, { PropTypes } from 'react';


const Quizzes = ({ quizzes }) => {

    const mappedQuizzes = quizzes.map((quiz) => {

        let iconClasses = quiz.isPresented ? 'fa fa-check' : 'fa fa-times';

        return (

            <div>
                <h5>{ quiz.name }</h5>
                <p>{`Number of questions: ${quiz.numQuestions}`}</p>
                <p>{`Number of entries: ${quiz.numEntries}`}</p>
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
