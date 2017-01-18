import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';

const Quizzes = ({ location, quizzes, sendQuizInvite, module_id, isSurvey, handleSetIsSurvey }) => {

    const surveyOrQuiz = isSurvey ? 'survey' : 'quiz';
    const surveyIdOrQuizId = isSurvey ? 'survey_id' : 'quiz_id';
    const surveyOrQuizCapitalized = isSurvey ? 'Survey' : 'Quiz';
    const surveyOrQuizPluralCapitalized = isSurvey ? 'Surveys' : 'Quizzes';

    const desktopView = quizzes.map((quiz, index) => {

        let iconClasses = classnames("fa", {
            "fa-check": quiz.is_presented === true,
            "fa-times": quiz.is_presented === false
        });

        let is_last_quizClasses = classnames("fa", {
            "fa-check": quiz.is_last_quiz
        });

        let buttonClass = classnames("tag is-success is-medium invite-students-tag", {
            "display-none": quiz.is_presented
        });

        let quizHistoryClass = classnames("tag is-warning is-medium settings-tag", {
            "display-none": !quiz.is_presented
        });

        let editQuizClass = classnames("tag is-warning is-medium settings-tag", {
            "display-none": quiz.is_presented
        });

        return (
            <tr key={ index }>
                <td>{ quiz.name }</td>
                <td>{+quiz.num_questions}</td>
                <td>{+quiz.num_entries}</td>
                <td><i className={ iconClasses } /></td>
                <td><i className={ is_last_quizClasses } /></td>
                <td>
                    <Link to={`${module_id}/${quiz[surveyIdOrQuizId]}/edit-${surveyOrQuiz}`}>
                        <span title={`Edit ${surveyOrQuiz}`} className={ editQuizClass }>
                            <i className="fa fa-edit"></i>
                        </span>
                    </Link>

                    <Link onClick={ () => handleSetIsSurvey(quiz.quiz_id, quiz.survey_id) } to={ `${module_id}/${quiz[surveyIdOrQuizId]}/members` }>
                        <span title="Quiz History" className={ quizHistoryClass }>
                            <i className="fa fa-history"></i>
                        </span>
                    </Link>
                </td>
                <td>
                    <Link to={`${location.pathname}/live`}>
                        <span className={ buttonClass }
                            onClick={ () => sendQuizInvite(quiz.quiz_id, quiz.survey_id, quiz.name) }>
                            Invite students to { surveyOrQuiz }
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

        let buttonClass = classnames("tag is-success is-medium settings-link-element", {
            "display-none": quiz.is_presented
        });

        let quizHistoryClass = classnames("settings-link-element", {
            "display-none": !quiz.is_presented
        });

        let editQuizClass = classnames("settings-link-element", {
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
                </div>
                <div className="columns is-mobile has-text-centered">
                    <div className="column">Presented: <i className={ iconClasses } /></div>
                    { !isSurvey &&
                        <div className="column">
                            Last { surveyOrQuizCapitalized }: <i className={ is_last_quizClasses } />
                        </div>
                    }
                </div>
                <div className="columns is-mobile has-text-centered">
                    <Link className={ editQuizClass } to={`${module_id}/${quiz[surveyIdOrQuizId]}/edit-quiz`}>
                        <span title="Edit Quiz" className="column tag is-warning is-medium settings-tag">
                            <i className="fa fa-edit"></i>
                        </span>
                    </Link>

                    <Link onClick={ () => handleSetIsSurvey(quiz.quiz_id, quiz.survey_id) } className={ quizHistoryClass } to={ `${module_id}/${quiz[surveyIdOrQuizId]}/members` }>
                        <span title="Quiz History" className="column tag is-warning is-medium settings-tag">
                            <i className="fa fa-history"></i>
                        </span>
                    </Link>
                </div>

                <div className="columns is-mobile has-text-centered">
                    <Link className={ buttonClass } to={`${location.pathname}/live`}>
                        <span
                        onClick={ () => sendQuizInvite(quiz[surveyIdOrQuizId], quiz.name) }>
                        Invite students to { surveyOrQuiz }
                        </span>
                    </Link>
                </div>

            </div>
        );
    });

    return (
        <div className="section quizzes">
            <div className="level">
                <div className="level-left">
                    <h3 className="level-item">
                        { surveyOrQuizPluralCapitalized }
                    </h3>
                </div>
                <div className="level-right">

                    <Link className="level-item" to={ `${module_id}/new-quiz` } >

                        <button className="add-quiz-button button is-info">
                            <span className="icon">
                                <i className="fa fa-plus" />
                            </span>
                            <span>Add a new { surveyOrQuiz }</span>
                        </button>
                    </Link>
                </div>
            </div>

            <table className="table is-hidden-mobile">
                <thead>
                    <tr>
                        <th>name</th>
                        <th># questions</th>
                        <th># entries</th>
                        <th>Presented?</th>
                        { !isSurvey &&
                            <th>Last { surveyOrQuizCapitalized }?</th>
                        }
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
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
    module_id: PropTypes.string.isRequired,
    isSurvey: PropTypes.bool,
    handleSetIsSurvey: PropTypes.func.isRequired
};

export default Quizzes;
