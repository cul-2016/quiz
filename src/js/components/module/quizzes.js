import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const Quizzes = ({ location, quizzes, sendQuizInvite }) => {

    const mappedQuizzes = quizzes.map((quiz, index) => {

        let iconClasses = classnames("fa", {
            "fa-check": quiz.is_presented === true,
            "fa-times": quiz.is_presented === false
        });

        let buttonClass = classnames("button", {
            "display-none": quiz.is_presented
        });

        return (
            <tr key={ index }>
                <td>{ quiz.name }</td>
                <td>{+quiz.num_questions}</td>
                <td>{+quiz.num_entries}</td>
                <td><i className={ iconClasses } /></td>
                <td>
                    <Link to={`${location.pathname}/live`}>
                        <span className={ buttonClass }
                            onClick={ () => sendQuizInvite(quiz.quiz_id, quiz.name) }>
                            Invite students to quiz
                        </span>
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <div className="section">

            <table className="table">
                <thead>
                    <tr>
                        <th>Quiz name</th>
                        <th># questions</th>
                        <th># entries</th>
                        <th>Presented?</th>
                        <th></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Quiz name</th>
                        <th># questions</th>
                        <th># entries</th>
                        <th>Presented?</th>
                        <th></th>
                    </tr>
                </tfoot>
                <tbody>
                    { mappedQuizzes }
                </tbody>
            </table>
        </div>
    );
};

Quizzes.propTypes = {
    location: PropTypes.object.isRequired,
    quizzes: PropTypes.array.isRequired,
    sendQuizInvite: PropTypes.func.isRequired
};

export default Quizzes;
