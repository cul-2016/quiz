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

        let buttonClass = classnames("", {
            "display-none": quiz.is_presented
        });

        let quizHistoryClass = classnames("", {
            "display-none": !quiz.is_presented
        });

        let editQuizClass = classnames("", {
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

    return (
        <div className="quizzes">
            <h3 className="headline module__headline">
                { surveyOrQuizPluralCapitalized }
            </h3>
            <Link className="module__button__link" to={ `${module_id}/new-quiz` } >

                <button className="button button__secondary">
                    <span className="icon">
                        <i className="fa fa-plus" />
                    </span>
                    <span>Add a new { surveyOrQuiz }</span>
                </button>
            </Link>

            <table className="table">
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
