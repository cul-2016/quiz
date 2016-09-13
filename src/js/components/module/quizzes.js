import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const Quizzes = ({ location, quizzes, sendQuizInvite, module_id }) => {

    const desktopView = quizzes.map((quiz, index) => {

        let iconClasses = classnames("fa", {
            "fa-check": quiz.is_presented === true,
            "fa-times": quiz.is_presented === false
        });

        let is_last_quizClasses = classnames("fa", {
            "fa-check": quiz.is_last_quiz
        });

        let buttonClass = classnames("button is-success", {
            "display-none": quiz.is_presented
        });

        return (
            <tr key={ index }>
                <td>{ quiz.name }</td>
                <td>{+quiz.num_questions}</td>
                <td>
                    <Link to={`${module_id}/${quiz.quiz_id}/members`}>
                        {+quiz.num_entries}
                    </Link>
                </td>
                <td><i className={ iconClasses } /></td>
                <td><i className={ is_last_quizClasses } /></td>
                <td>
                    <Link to={`${location.pathname}/live`}>
                        <span className={ buttonClass }
                            onClick={ () => sendQuizInvite(quiz.quiz_id, quiz.name) }>
                            Invite students to quiz
                        </span>
                    </Link>
                </td>
                <td>
                <Link to={`${module_id}/${quiz.quiz_id}/edit-quiz`}>
                    <span className={ buttonClass }>
                        Edit Quiz
                    </span>
                </Link>
                </td>
            </tr>
        );
    });

    const mobileView = quizzes.map((quiz, index) => {

        let iconClasses = classnames("fa", {
            "fa-check": quiz.is_presented === true,
            "fa-times": quiz.is_presented === false
        });

        let buttonClass = classnames("button is-success", {
            "display-none": quiz.is_presented
        });

        let is_last_quizClasses = classnames("fa", {
            "fa-check": quiz.is_last_quiz
        });


        return (
            <div key={ index } className="box">
                <h5>{ quiz.name }</h5>
                <div className="columns is-mobile has-text-centered">
                    <div className="column">{`Questions: \n${+quiz.num_questions}`}</div>
                    <div className="column">{`Entries: \n${+quiz.num_entries}`}</div>
                    <div className="column">Presented: <i className={ iconClasses } /></div>
                    <div className="column">Last Quiz: <i className={ is_last_quizClasses } /></div>
                </div>

                <Link to={`${location.pathname}/live`}>
                    <button className={ buttonClass }
                        onClick={ () => sendQuizInvite(quiz.quiz_id, quiz.name) }>
                        Invite students to quiz
                    </button>
                </Link>
                <Link to={`${module_id}/${quiz.quiz_id}/edit-quiz`}>
                    <span className={ buttonClass }>
                        Edit Quiz
                    </span>
                </Link>
            </div>
        );
    });

    return (
        <div className="section quizzes">
            <h4>Quizzes</h4>
            <table className="table is-hidden-mobile">
                <thead>
                    <tr>
                        <th>Quiz name</th>
                        <th># questions</th>
                        <th># entries</th>
                        <th>Presented?</th>
                        <th>Last Quiz</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Quiz name</th>
                        <th># questions</th>
                        <th># entries</th>
                        <th>Presented?</th>
                        <th>Last Quiz</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
                <tbody>
                    { desktopView }
                </tbody>
            </table>

            <div className="is-hidden-tablet">
                { mobileView }
            </div>
        </div>
    );
};

Quizzes.propTypes = {
    location: PropTypes.object.isRequired,
    quizzes: PropTypes.array.isRequired,
    sendQuizInvite: PropTypes.func.isRequired,
    module_id: PropTypes.string.isRequired
};

export default Quizzes;
