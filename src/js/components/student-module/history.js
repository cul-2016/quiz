import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Medal from '../general/medal';


const StudentHistory = ({ params, history, medalConditions }) => {
    const { module_id } = params;
    let mappedHistory = history.map((quiz, i) => {

        let percentageScore = Math.round(quiz.score / quiz.num_questions * 100);

        return (
            <tr key={ i }>
                <td className="subtitle is-5">
                    { quiz.name }
                </td>
                <td>
                    <span className="subtitle is-4">
                        { `${quiz.score} ` }
                    </span>
                    <span>
                        { `out of ${quiz.num_questions}` }
                    </span>
                </td>
                <td>
                    <Medal percentageScore={ percentageScore } medalConditions={ medalConditions } />
                </td>
                <td className="subtitle is-5">
                    <Link to={`/${module_id}/student/history/${quiz.quiz_id}`}>
                        Show
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <table className="student-history table">
            <tbody>

                { mappedHistory }
            </tbody>
        </table>
    );
};

StudentHistory.propTypes = {
    params: PropTypes.object,
    history: PropTypes.array,
    medalConditions: PropTypes.array
};

export default StudentHistory;
